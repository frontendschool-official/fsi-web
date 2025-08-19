import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { doc, writeBatch } from 'firebase/firestore';
import { db } from '@fsi/config/firebase';
import { makeGeminiRequest } from '@fsi/config/gemini';

// -------------------- ZOD SCHEMAS --------------------

const LevelEnum = z.enum([
  // SDE track
  'SDE1',
  'SDE2',
  'SDE3',
  'SDE4',
  'SDE5',
  // L track (US big-tech style)
  'L3',
  'L4',
  'L5',
  'L5A',
  'L6',
  'L7',
  // IC track (some orgs)
  'IC3',
  'IC4',
  'IC5',
  'IC6',
  'IC7',
  // MTS variants (SV/India mix)
  'MTS-1',
  'MTS-2',
  'SMTS',
  'Staff',
  'Principal',
  'Senior',
]);

const TaxonomyEnum = z.enum(['SDE', 'L', 'IC', 'MTS', 'Mixed']);

const RoundZ = z.object({
  order: z.number().int().min(1).max(15),
  type: z.enum([
    'DSA',
    'MachineCoding',
    'SystemDesign',
    'FrontendCore',
    'Behavioral',
    'BarRaiser',
    'HiringManager',
    'CodingPair',
    'TakeHome',
  ]),
  name: z.string().max(120).nullable().optional(),
  durationMins: z.number().int().min(15).max(240),
  focusAreas: z.array(z.string()).max(15),
  topics: z.array(z.string()).optional().default([]),
  description: z.string().max(4000).nullable().optional(),

  // NEW: realism knobs
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
  askedFrequency: z.number().min(0).max(1).optional(), // 0=rare, 1=very common
  confidence: z.number().min(0).max(1).optional(),

  evaluationRubric: z
    .object({
      criteria: z
        .array(z.object({ key: z.string(), weight: z.number().min(0).max(1) }))
        .optional()
        .default([]),
      passThreshold: z.number().min(0).max(1).optional(),
    })
    .optional(),

  materials: z
    .object({
      examples: z.array(z.string()).optional().default([]),
      links: z.array(z.string().url()).optional().default([]),
    })
    .optional(),

  // Your existing field
  previouslyAskedProblems: z.array(z.string()).optional().default([]),

  // NEW: concrete examples + citations
  questionExamples: z.array(z.string()).optional().default([]),
  evidenceLinks: z.array(z.string().url()).optional().default([]),

  updatedAt: z.string(),
});

const DesignationZ = z.object({
  id: z.string(), // "sde3-frontend" | "l5-frontend"
  title: z.string(), // "SDE3 - Frontend" | "L5 - Frontend"
  level: LevelEnum, // raw label
  normalizedLevel: z.enum(['L3', 'L4', 'L5', 'L6', 'L7']).optional(), // internal bucket
  taxonomy: TaxonomyEnum.optional().default('Mixed'),
  levelAliases: z.array(z.string()).optional().default([]), // ['SDE3','L5','IC5']
  track: z.enum(['Frontend', 'Fullstack', 'Mobile', 'Backend', 'Web Platform']),
  locationType: z.enum(['Onsite', 'Hybrid', 'Remote']),
  locations: z.array(z.string()).max(20).optional().default([]),
  skills: z
    .object({
      mustHave: z.array(z.string()).optional().default([]),
      niceToHave: z.array(z.string()).optional().default([]),
    })
    .optional(),
  notes: z.string().nullable().optional(),
  interviewOverview: z.string().max(1200).optional(), // NEW: 1–2 paragraph overview
  previouslyAskedRoundsCount: z
    .number()
    .int()
    .min(0)
    .max(15)
    .optional()
    .default(0), // NEW
  interviewRounds: z.array(RoundZ), // you keep this
  updatedAt: z.string(),
});

const PayloadZ = z.object({
  company: z.object({
    name: z.string(),
    slug: z.string(),
    country: z.enum(['India', 'Global']),
    hqCity: z.string().nullable().optional(),
    industry: z.string(),
    website: z.string().url().nullable().optional(),
    careersUrl: z.string().url().nullable().optional(),
    foundedYear: z.number().int().min(1900).max(2100).nullable().optional(),
    employeeCountBand: z
      .enum(['1-50', '51-200', '201-1000', '1001-5000', '5001+'])
      .nullable()
      .optional(),
    isProductBased: z.boolean().nullable().optional(),
    isHiring: z.boolean().nullable().optional(),
    status: z.literal('active'),
    logo: z
      .object({
        light: z.string().url().nullable(),
        dark: z.string().url().nullable(),
      })
      .optional(),
    tags: z.array(z.string()).optional().default([]),
    salaryBands: z
      .record(
        z.object({
          min: z.number().nonnegative(),
          max: z.number().nonnegative(),
          currency: z.string().regex(/^[A-Z]{3}$/),
        })
      )
      .optional()
      .default({}),
    sourceOfTruth: z.enum(['manual', 'gemini', 'openai', 'scraped', 'mixed']),
    lastVerifiedAt: z.string(),
    version: z.number().int().min(1),
  }),
  // We keep both shape variants you want to support:
  designations: z.array(DesignationZ),
  roundsByDesignation: z.record(z.array(RoundZ)).optional().default({}),
  sources: z.array(
    z.object({
      kind: z.enum([
        'careers',
        'leetcode',
        'blog',
        'reddit',
        'glassdoor',
        'employee',
        'other',
      ]),
      title: z.string(),
      url: z.string().url().nullable().optional(),
      notes: z.string().nullable().optional(),
      addedAt: z.string(),
    })
  ),
});

// -------------------- HELPERS --------------------

const kebab = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const normalizeLevel = (
  lvl: string
): 'L3' | 'L4' | 'L5' | 'L6' | 'L7' | undefined => {
  const m = lvl.toUpperCase();
  if (['SDE1', 'L3', 'IC3', 'MTS-1'].includes(m)) return 'L3';
  if (['SDE2', 'L4', 'IC4', 'MTS-2', 'SENIOR'].includes(m)) return 'L4';
  if (['SDE3', 'L5', 'IC5', 'SMTS'].includes(m)) return 'L5';
  if (['SDE4', 'L6', 'IC6', 'STAFF'].includes(m)) return 'L6';
  if (['SDE5', 'L7', 'IC7', 'PRINCIPAL'].includes(m)) return 'L7';
  return undefined;
};

// Gemini prompt with requirements for internet-sourced realism & citations
const buildPrompt = (companyName: string) => `
You are an expert hiring-research agent for a Frontend Interview Simulation platform.

GOAL:
Return ONE JSON object that matches the SCHEMA exactly and reflects REALISTIC interview processes for ${companyName},
including both Indian and Global variants where applicable. Use publicly available information to infer
how many rounds are typical and what each round usually asks for this company/role level. CITE sources.

OUTPUT RULES:
- Only output JSON (no backticks, no prose).
- Use ISO8601 UTC timestamps.
- Keep arrays concise (<=8 items each).
- If unknown, use null, [], or {} (do not invent).
- Prefer FE roles; include multiple designations if the company uses SDE* vs L* tracks across geos.

SCHEMA:
{
  "company": {
    "name": "string",
    "slug": "kebab-case",
    "country": "India | Global",
    "hqCity": "string|null",
    "industry": "string",
    "website": "https://... | null",
    "careersUrl": "https://... | null",
    "foundedYear": 1900-2100 | null,
    "employeeCountBand": "1-50 | 51-200 | 201-1000 | 1001-5000 | 5001+ | null",
    "isProductBased": true|false|null,
    "isHiring": true|false|null,
    "status": "active",
    "logo": { "light": "https://...|null", "dark": "https://...|null" },
    "tags": ["string", ...],
    "salaryBands": {
      "SDE2-Frontend": { "min": number, "max": number, "currency": "INR|USD|..." },
      "SDE3-Frontend": { "min": number, "max": number, "currency": "INR|USD|..." },
      "L5-Frontend":   { "min": number, "max": number, "currency": "INR|USD|..." }
    },
    "sourceOfTruth": "manual|gemini|openai|scraped|mixed",
    "lastVerifiedAt": "ISO8601",
    "version": 1
  },
  "designations": [
    {
      "id": "kebab e.g., sde3-frontend or l5-frontend",
      "title": "e.g., SDE3 - Frontend or L5 - Frontend",
      "level": "SDE1|SDE2|SDE3|SDE4|SDE5|L3|L4|L5|L5A|L6|L7|IC3|IC4|IC5|IC6|IC7|MTS-1|MTS-2|SMTS|Senior|Staff|Principal",
      "normalizedLevel": "L3|L4|L5|L6|L7",
      "taxonomy": "SDE|L|IC|MTS|Mixed",
      "levelAliases": ["SDE3","L5","IC5"],
      "track": "Frontend|Fullstack|Mobile|Backend|Web Platform",
      "locationType": "Onsite|Hybrid|Remote",
      "locations": ["City", ...],
      "interviewOverview": "1-2 paragraphs summarizing the typical process and variants (India vs US, onsite vs virtual).",
      "previouslyAskedRoundsCount": 0-15,
      "interviewRounds": [
        {
          "order": 1,
          "type": "DSA|MachineCoding|SystemDesign|FrontendCore|Behavioral|BarRaiser|HiringManager|CodingPair|TakeHome",
          "name": "string|null",
          "durationMins": 15-240,
          "focusAreas": ["string", ...],
          "topics": ["string", ...],
          "description": "What interviewers usually ask in this round",
          "difficulty": "Easy|Medium|Hard",
          "askedFrequency": 0-1,      // how often this round appears in this company's FE process
          "confidence": 0-1,          // confidence in this round's description
          "evaluationRubric": {
            "criteria": [{ "key": "string", "weight": 0-1 }],
            "passThreshold": 0-1
          },
          "previouslyAskedProblems": ["brief problem titles"],
          "questionExamples": ["short, realistic example prompts"],
          "evidenceLinks": ["https://...", "https://..."],
          "materials": {
            "examples": ["string", ...],
            "links": ["https://...", ...]
          },
          "updatedAt": "ISO8601"
        }
      ],
      "skills": {
        "mustHave": ["React","TypeScript","Web Perf"],
        "niceToHave": ["Microfrontends","Cloud"]
      },
      "notes": "string|null",
      "updatedAt": "ISO8601"
    }
  ],
  "roundsByDesignation": {}, // OPTIONAL: prefer embedding rounds in each designation above
  "sources": [
    {
      "kind": "careers|leetcode|blog|reddit|glassdoor|employee|other",
      "title": "string",
      "url": "https://... | null",
      "notes": "what the source supports (e.g., '4 rounds incl. Bar Raiser, FE system design focus')",
      "addedAt": "ISO8601"
    }
  ]
}

CONSTRAINTS:
- Reflect BOTH Indian and Global variants if they differ (e.g., India uses SDE*; US uses L*). Use multiple designations accordingly.
- Rounds should mirror what people report online: count, types, and what is asked.
- Provide at least 3 credible sources (careers pages, reputable blogs, interview reports).
- If conflicting reports exist, choose the most common pattern and note uncertainty in "notes" or lower "confidence".
- For sources without URLs (e.g., employee interviews, offline sources), use null for the url field.
`;

// -------------------- ROUTE --------------------

export async function POST(req: NextRequest) {
  const parseJson = (text: string) => {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1)
      throw new Error('No JSON object found in model output');
    return JSON.parse(text.slice(start, end + 1));
  };

  try {
    const { companyName } = (await req.json()) as { companyName?: string };
    if (!companyName?.trim()) {
      return NextResponse.json(
        { error: 'companyName is required' },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(companyName.trim());

    // 1st attempt
    let raw = await makeGeminiRequest({ prompt });
    let text = typeof raw === 'string' ? raw : raw?.text ?? JSON.stringify(raw);
    let parsed: unknown;

    try {
      parsed = parseJson(text.trim());
    } catch (e) {
      // Retry with validator feedback request
      const errMsg = (e as Error)?.message ?? 'parse error';
      const repairPrompt =
        prompt +
        `

ERROR: Your previous output was not valid JSON (${errMsg}).
Re-output ONLY the JSON object according to the SCHEMA.`;
      raw = await makeGeminiRequest({ prompt: repairPrompt });
      text = typeof raw === 'string' ? raw : raw?.text ?? JSON.stringify(raw);
      parsed = parseJson(text.trim());
    }

    // Validate
    const payload = PayloadZ.parse(parsed);

    // Post-process: ensure normalizedLevel/taxonomy/aliases
    payload.designations = payload.designations.map(d => {
      const n = normalizeLevel(d.level) ?? d.normalizedLevel;
      const aliases = Array.from(new Set([d.level, ...(d.levelAliases ?? [])]));
      const taxonomy: z.infer<typeof TaxonomyEnum> = d.level.startsWith('SDE')
        ? 'SDE'
        : d.level.startsWith('L')
        ? 'L'
        : d.level.startsWith('IC')
        ? 'IC'
        : d.level.includes('MTS') || d.level === 'SMTS'
        ? 'MTS'
        : 'Mixed';
      return { ...d, normalizedLevel: n, taxonomy, levelAliases: aliases };
    });

    // Fill previouslyAskedRoundsCount if missing
    for (const d of payload.designations) {
      if (!d.previouslyAskedRoundsCount) {
        d.previouslyAskedRoundsCount = d.interviewRounds?.length ?? 0;
      }
    }

    // ---- Write Firestore ----
    const companyId = payload.company.slug || kebab(payload.company.name);
    const nowIso = new Date().toISOString();

    const companyDoc = {
      ...payload.company,
      slug: companyId,
      createdAt: nowIso,
      updatedAt: nowIso,
      createdBy: 'system@generator',
      updatedBy: 'system@generator',
    };

    const batch = writeBatch(db());
    const companyRef = doc(db(), 'companies', companyId);
    batch.set(companyRef, companyDoc, { merge: true });

    for (const d of payload.designations) {
      const designationId = d.id || kebab(`${d.level}-${d.track}`);
      const dRef = doc(
        db(),
        'companies',
        companyId,
        'designations',
        designationId
      );
      batch.set(dRef, d, { merge: true });

      // Persist rounds from designation.interviewRounds (preferred source)
      const rounds = d.interviewRounds ?? [];
      for (const r of rounds) {
        const roundId = String(r.order).padStart(2, '0');
        const rRef = doc(
          db(),
          'companies',
          companyId,
          'designations',
          designationId,
          'interview_rounds',
          roundId
        );
        batch.set(rRef, r, { merge: true });
      }

      // Flat view for fast reads
      const flatRef = doc(
        db(),
        'interview_process_flat',
        `${companyId}__${designationId}`
      );
      batch.set(
        flatRef,
        {
          companyId,
          companyName: payload.company.name,
          companySlug: companyId,
          designationId,
          designationTitle: d.title,
          level: d.level,
          normalizedLevel: d.normalizedLevel ?? null,
          taxonomy: d.taxonomy,
          track: d.track,
          country: payload.company.country,
          tags: payload.company.tags ?? [],
          rounds: rounds.map(r => ({
            order: r.order,
            type: r.type,
            name: r.name ?? null,
            durationMins: r.durationMins,
            focusAreas: r.focusAreas,
            updatedAt: r.updatedAt,
            difficulty: r.difficulty ?? null,
          })),
          previouslyAskedRoundsCount:
            d.previouslyAskedRoundsCount ?? rounds.length,
          updatedAt: nowIso,
        },
        { merge: true }
      );
    }

    // sources
    for (const s of payload.sources) {
      const srcRef = doc(
        db(),
        'companies',
        companyId,
        'sources',
        kebab(s.title).slice(0, 60)
      );
      batch.set(srcRef, s, { merge: true });
    }

    await batch.commit();

    return NextResponse.json(
      { ok: true, companyId, stored: payload },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
