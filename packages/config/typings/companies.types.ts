export type SalaryBand = { min: number; max: number; currency: string };

export interface Company {
  name: string;
  slug: string;
  country: 'India' | 'Global';
  hqCity?: string;
  industry: string;
  website?: string;
  careersUrl?: string;
  foundedYear?: number;
  employeeCountBand?: '1-50' | '51-200' | '201-1000' | '1001-5000' | '5001+';
  isProductBased?: boolean;
  isHiring?: boolean;
  status: 'active' | 'paused' | 'archived';
  logo?: { light?: string; dark?: string };
  tags?: string[];
  salaryBands?: Record<string, SalaryBand>;
  sourceOfTruth?: 'manual' | 'gemini' | 'openai' | 'scraped' | 'mixed';
  lastVerifiedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  version?: number;
}

export interface Designation {
  title: string;
  level:
    | 'L3'
    | 'L4'
    | 'L5'
    | 'L5A'
    | 'L6'
    | 'IC3'
    | 'IC4'
    | 'IC5'
    | 'Senior'
    | 'Staff'
    | 'Principal';
  track: 'Frontend' | 'Fullstack' | 'Mobile' | 'Backend' | 'Web Platform';
  locationType: 'Onsite' | 'Hybrid' | 'Remote';
  locations?: string[];
  skills?: { mustHave?: string[]; niceToHave?: string[] };
  notes?: string;
  updatedAt: string;
}

export type RoundType =
  | 'DSA'
  | 'MachineCoding'
  | 'SystemDesign'
  | 'FrontendCore'
  | 'Behavioral'
  | 'BarRaiser'
  | 'HiringManager'
  | 'CodingPair'
  | 'TakeHome';

export interface InterviewRound {
  order: number;
  type: RoundType;
  name?: string;
  durationMins: number;
  focusAreas: string[];
  description?: string;
  evaluationRubric?: {
    criteria: { key: string; weight: number }[];
    passThreshold?: number;
  };
  materials?: { examples?: string[]; links?: string[] };
  updatedAt: string;
}

export interface InterviewProcessFlat {
  companyId: string;
  companyName: string;
  companySlug: string;
  designationId: string;
  designationTitle: string;
  level?: string;
  track?: string;
  country?: string;
  tags?: string[];
  rounds: InterviewRound[];
  updatedAt: string;
}
