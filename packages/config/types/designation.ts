import { z } from 'zod';

export const LevelZ = z.enum(['SDE1','SDE2','SDE3','SDE4','SDE5','L3','L4','L5','L5A','L6','L7','IC3','IC4','IC5','IC6','IC7','MTS-1','MTS-2','SMTS','Senior','Staff','Principal']);
export const TaxonomyZ = z.enum(['SDE','L','IC','MTS','Mixed']);

export const DesignationZ = z.object({
  id: z.string(),
  title: z.string(),
  level: LevelZ,
  normalizedLevel: z.enum(['L3','L4','L5','L6','L7']).nullable().optional(),
  taxonomy: TaxonomyZ.optional().default('Mixed'),
  levelAliases: z.array(z.string()).optional().default([]),
  track: z.enum(['Frontend','Fullstack','Mobile','Backend','Web Platform']),
  locationType: z.enum(['Onsite','Hybrid','Remote']),
  locations: z.array(z.string()).max(20).optional().default([]),
  skills: z.object({ mustHave: z.array(z.string()).optional().default([]), niceToHave: z.array(z.string()).optional().default([]) }).optional(),
  notes: z.string().nullable().optional(),
  interviewOverview: z.string().max(1200).nullable().optional(),
  previouslyAskedRoundsCount: z.number().int().min(0).max(15).optional().default(0),
  updatedAt: z.string(),
});
export type Designation = z.infer<typeof DesignationZ>;
