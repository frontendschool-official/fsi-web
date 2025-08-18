// Shared types and interfaces for the fsi-web monorepo

// ============================================================================
// API Types
// ============================================================================

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
}

/**
 * Simple API response for demo/testing purposes
 */
export interface SimpleApiResponse {
  message: string;
  timestamp: string;
  method: string;
  receivedData?: Record<string, unknown>;
}

/**
 * User interface for API responses
 */
export interface ApiUser {
  id: number;
  name: string;
  email: string;
}

// ============================================================================
// Problem Types
// ============================================================================

/**
 * Problem difficulty levels
 */
export type ProblemDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Problem categories
 */
export type ProblemCategory = 'dsa' | 'machine_coding' | 'system_design';

// ============================================================================
// UI Types
// ============================================================================

/**
 * Notification types
 */
export type NotificationType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'achievement';

/**
 * Notification interface
 */
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

/**
 * Leaderboard entry
 */
export interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  avatar?: string;
  score: number;
  problemsSolved: number;
  streak: number;
  isCurrentUser?: boolean;
  badges?: string[];
  lastActive?: string;
}

/**
 * Sidebar navigation item
 */
export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: string | number;
  children?: SidebarItem[];
  isActive?: boolean;
}

/**
 * Sidebar section
 */
export interface SidebarSection {
  id: string;
  title: string;
  items: SidebarItem[];
  isCollapsible?: boolean;
  isCollapsed?: boolean;
}

/**
 * Navigation item for headers
 */
export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  isActive?: boolean;
  isExternal?: boolean;
}

/**
 * Test case for problem evaluation
 */
export interface TestCase {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'error';
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  executionTime?: number; // in milliseconds
  memoryUsed?: number; // in MB
  isHidden?: boolean;
  timeLimit?: number;
  memoryLimit?: number;
}

/**
 * Performance metrics for test results
 */
export interface PerformanceMetrics {
  totalExecutionTime: number;
  averageExecutionTime: number;
  memoryUsage: number;
  timeComplexity?: string;
  spaceComplexity?: string;
  executionTime?: number;
  cpuUsage?: number;
  passed?: boolean;
  error?: string;
}

/**
 * Progress data for tracking
 */
export interface ProgressData {
  label?: string;
  value: number;
  max: number;
  color?: string;
  description?: string;
}

/**
 * Category progress data for tracking
 */
export interface CategoryProgressData {
  category: 'dsa' | 'machine-coding' | 'system-design';
  completed: number;
  total: number;
  streak?: number;
}

/**
 * Select option
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Accordion item
 */
export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  isOpen?: boolean;
  disabled?: boolean;
}

/**
 * Tab item
 */
export interface Tab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * Common component props that extend HTML attributes
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Button variants
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive';

/**
 * Button sizes
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Alert variants
 */
export type AlertVariant = 'default' | 'destructive' | 'success' | 'warning';

/**
 * Badge variants
 */
export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

/**
 * Typography variants
 */
export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div';

/**
 * Typography sizes
 */
export type TypographySize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

/**
 * Typography weights
 */
export type TypographyWeight =
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold';

/**
 * Typography colors
 */
export type TypographyColor =
  | 'default'
  | 'muted'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error';
