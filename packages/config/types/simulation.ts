import { z } from 'zod';
import { RoundTypeZ, EvaluationRubricZ } from './round';

export const RoundPlanZ = z.object({
  order: z.number().int().min(1).max(15),
  roundRefId: z.string().optional(),
  type: RoundTypeZ,
  title: z.string().optional(),
  durationMins: z.number().int().min(15).max(240),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).nullable().optional(),
  askedFrequency: z.number().min(0).max(1).nullable().optional(),
  confidence: z.number().min(0).max(1).nullable().optional(),
  focusAreas: z.array(z.string()).default([]),
  topics: z.array(z.string()).default([]),
  evaluationRubric: EvaluationRubricZ.optional(),
  problemId: z.string().optional(), // ← link to /problems/{id}
  problemRefPath: z.string().optional(),
  updatedAt: z.string(),
});

export const SimulationZ = z.object({
  userId: z.string(),
  companyId: z.string(),
  companyName: z.string(),
  companySlug: z.string(),
  designationId: z.string(),
  designationTitle: z.string(),
  level: z.string().nullable().optional(),
  normalizedLevel: z.enum(['L3', 'L4', 'L5', 'L6', 'L7']).nullable().optional(),
  track: z
    .enum(['Frontend', 'Fullstack', 'Mobile', 'Backend', 'Web Platform'])
    .optional(),
  meta: z.any().optional(), // (optional: store simulation.meta from generator)
  process: z.any().optional(), // (optional: store simulation.process from generator)
  rounds: z.array(RoundPlanZ),
  status: z
    .enum(['in_progress', 'completed', 'abandoned'])
    .default('in_progress'),
  currentOrder: z.number().int().min(1),
  startedAt: z.string(),
  updatedAt: z.string(),
  completedAt: z.string().nullable().optional(),
  totals: z
    .object({
      scoredRounds: z.number().int(),
      totalScore: z.number(),
      passCount: z.number().int(),
      failCount: z.number().int(),
    })
    .optional(),
  createdBy: z.string().optional(),
});
export type Simulation = z.infer<typeof SimulationZ>;

export const RoundSubmissionZ = z.object({
  code: z.string().optional(),
  text: z.string().optional(),
  designJson: z.any().optional(),
  links: z.array(z.string().url()).optional(),
  attachments: z
    .array(z.object({ name: z.string(), url: z.string().url() }))
    .optional(),
});
export type RoundSubmission = z.infer<typeof RoundSubmissionZ>;

export const RoundAttemptZ = z.object({
  order: z.number().int(),
  roundMeta: RoundPlanZ,
  prompt: z.string(),
  response: RoundSubmissionZ,
  evaluation: z.object({
    criteriaScores: z
      .array(
        z.object({
          key: z.string(),
          weight: z.number(),
          score: z.number(),
          notes: z.string().optional(),
        })
      )
      .default([]),
    overall: z.number().min(0).max(1),
    pass: z.boolean(),
    feedback: z.array(z.string()).default([]),
    suggestedNextFocus: z.array(z.string()).default([]),
    confidence: z.number().min(0).max(1).default(0.7),
    citations: z.array(z.string()).default([]),
  }),
  submittedAt: z.string(),
  evaluatedAt: z.string(),
});
export type RoundAttempt = z.infer<typeof RoundAttemptZ>;
