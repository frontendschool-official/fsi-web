import { z } from 'zod';

export const RoundTypeZ = z.enum(['DSA','MachineCoding','SystemDesign','FrontendCore','Behavioral','BarRaiser','HiringManager','CodingPair','TakeHome']);

export const EvaluationCriterionZ = z.object({
  key: z.string(),
  weight: z.number().min(0).max(1),
  anchors: z.object({ poor: z.string().optional(), okay: z.string().optional(), great: z.string().optional() }).optional(),
});

export const EvaluationRubricZ = z.object({
  criteria: z.array(EvaluationCriterionZ).default([]),
  passThreshold: z.number().min(0).max(1).default(0.65),
});

export const RoundZ = z.object({
  order: z.number().int().min(1).max(15),
  type: RoundTypeZ,
  name: z.string().max(120).nullable().optional(),
  durationMins: z.number().int().min(15).max(240),
  focusAreas: z.array(z.string()).max(15),
  topics: z.array(z.string()).optional().default([]),
  description: z.string().max(4000).nullable().optional(),
  difficulty: z.enum(['Easy','Medium','Hard']).nullable().optional(),
  askedFrequency: z.number().min(0).max(1).nullable().optional(),
  confidence: z.number().min(0).max(1).nullable().optional(),
  materials: z.object({ examples: z.array(z.string()).optional().default([]), links: z.array(z.string().url()).optional().default([]) }).optional(),
  evaluationRubric: EvaluationRubricZ.optional(),
  previouslyAskedProblems: z.array(z.string()).optional().default([]),
  questionExamples: z.array(z.string()).optional().default([]),
  evidenceLinks: z.array(z.string().url()).optional().default([]),
  updatedAt: z.string(),
});
export type Round = z.infer<typeof RoundZ>;
