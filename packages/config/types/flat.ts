import { z } from 'zod';
import { RoundZ } from './round';

export const InterviewProcessFlatZ = z.object({
  companyId: z.string(),
  companyName: z.string(),
  companySlug: z.string(),
  designationId: z.string(),
  designationTitle: z.string(),
  level: z.string().nullable().optional(),
  normalizedLevel: z.enum(['L3','L4','L5','L6','L7']).nullable().optional(),
  taxonomy: z.enum(['SDE','L','IC','MTS','Mixed']).optional(),
  track: z.string().optional(),
  country: z.enum(['India','Global']).optional(),
  tags: z.array(z.string()).optional().default([]),
  rounds: z.array(RoundZ.pick({ order: true, type: true, name: true, durationMins: true, focusAreas: true, updatedAt: true, difficulty: true })).max(15),
  previouslyAskedRoundsCount: z.number().int().min(0).max(15).optional().default(0),
  updatedAt: z.string(),
});
export type InterviewProcessFlat = z.infer<typeof InterviewProcessFlatZ>;
