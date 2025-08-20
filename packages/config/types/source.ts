import { z } from 'zod';
export const CompanySourceZ = z.object({
  kind: z.enum(['careers','leetcode','blog','reddit','glassdoor','employee','other']),
  title: z.string().max(200),
  url: z.string().url(),
  notes: z.string().nullable().optional(),
  addedAt: z.string(),
});
export type CompanySource = z.infer<typeof CompanySourceZ>;
