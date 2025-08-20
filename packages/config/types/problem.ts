import { z } from 'zod';
import { RoundTypeZ } from './round';

export const ProblemZ = z.object({
  companyId: z.string(),
  companySlug: z.string(),
  companyName: z.string(),
  designationId: z.string(),
  designationTitle: z.string(),
  level: z.string().nullable().optional(),
  normalizedLevel: z.enum(['L3','L4','L5','L6','L7']).nullable().optional(),
  track: z.enum(['Frontend','Fullstack','Mobile','Backend','Web Platform']),
  roundType: RoundTypeZ,
  difficulty: z.enum(['Easy','Medium','Hard']).nullable().optional(),
  tags: z.array(z.string()).default([]),

  origin: z.enum(['simulation','admin_upload','import']).default('simulation'),
  enabled: z.boolean().default(true),
  visibility: z.enum(['public','private','unlisted']).default('public'),
  ownerId: z.string(),
  adminFeatured: z.boolean().default(false),
  adminCollections: z.array(z.string()).default([]),

  seed: z.object({
    source: z.enum(['simulation','admin_upload','import']),
    simulationId: z.string().optional(),
    roundOrder: z.number().int().min(1).optional(),
    userId: z.string().optional(),
  }),

  task: z.object({
    brief: z.string(),
    context: z.string().nullable().optional(),
    requirements: z.array(z.string()).default([]),
    acceptanceCriteria: z.array(z.string()).default([]),
    constraints: z.array(z.string()).default([]),
    artifacts: z.object({
      expected: z.array(z.enum(['code','text','diagram','tests'])).default([]),
      fileTemplates: z.array(z.object({ path: z.string(), content: z.string() })).default([]),
    }).default({ expected: [], fileTemplates: [] }),
    inputData: z.object({
      samples: z.array(z.object({ name: z.string(), data: z.any() })).default([]),
    }).default({ samples: [] }),
    hints: z.object({
      subtle: z.array(z.string()).default([]),
      moderate: z.array(z.string()).default([]),
      direct: z.array(z.string()).default([]),
    }).default({ subtle: [], moderate: [], direct: [] }),
    functionSignature: z.string().optional(),
    examples: z.array(z.object({ input: z.any(), output: z.any() })).optional(),
  }),

  rubric: z.object({
    criteria: z.array(z.object({
      key: z.string(),
      weight: z.number().min(0).max(1),
      anchors: z.object({ poor: z.string().optional(), okay: z.string().optional(), great: z.string().optional() }).optional(),
    })).default([]),
    passThreshold: z.number().min(0).max(1).default(0.65),
  }),

  grounding: z.object({
    previouslyAskedProblems: z.array(z.string()).default([]),
    questionExamples: z.array(z.string()).default([]),
    evidenceLinks: z.array(z.string()).default([]),
  }).default({ previouslyAskedProblems: [], questionExamples: [], evidenceLinks: [] }),

  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  version: z.number().int().default(1),

  practiceStats: z.object({
    attempts: z.number().int().default(0),
    avgScore: z.number().min(0).max(1).default(0),
    solvedCount: z.number().int().default(0),
  }).default({ attempts: 0, avgScore: 0, solvedCount: 0 }),
});
export type Problem = z.infer<typeof ProblemZ>;
