export type Difficulty = '入门' | '进阶' | '实战';

export interface Category {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;
  learningGoals: string[];
  readingOrder: string[];
  featuredTools: string[];
}

export interface ArticleMeta {
  slug: string;
  title: string;
  category: string;
  summary: string;
  audience: string;
  goals: string[];
  difficulty: Difficulty;
  tags: string[];
  updated: string;
  verified?: string;
  readingMinutes: number;
  order: number;
  relatedTools?: string[];
  isCase?: boolean;
  caseType?: '实际案例' | '匿名化案例' | '模拟教学案例';
}

export interface Article extends ArticleMeta {
  content: string;
}

export interface ToolInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  path: string;
}

export interface TemplateInfo {
  id: string;
  name: string;
  format: string;
  description: string;
  scenario: string;
  instructions: string;
  caution: string;
  file: string;
  category: string;
}

export interface CaseInfo {
  id: string;
  title: string;
  type: '实际案例' | '匿名化案例' | '模拟教学案例';
  summary: string;
  tags: string[];
  articleSlug?: string;
}
