import { z } from 'zod';

export const CompanyZ = z.object({
  name: z.string().min(2).max(140),
  slug: z.string().regex(/^[a-z0-9-]+$/),
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
      light: z.string().url().nullable().optional(),
      dark: z.string().url().nullable().optional(),
    })
    .optional(),
  tags: z.array(z.string()).max(20).optional().default([]),
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
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  version: z.number().int().min(1).default(1),
});
export type Company = z.infer<typeof CompanyZ>;
