
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown supported
  author: string;
  category: CategoryType;
  readTime: string;
  imageUrl: string;
  date: string;
  tags: string[];
}

export type CategoryType = 
  | 'Tech News' 
  | 'AI News' 
  | 'AI Tools' 
  | 'Smartphones & Gadgets' 
  | 'Apps' 
  | 'Software' 
  | 'Tutorials' 
  | 'Reviews' 
  | 'Deals' 
  | 'Cybersecurity' 
  | 'Gaming' 
  | 'Startups & Business Tech' 
  | 'Web & Development';

export enum AdSize {
  LEADERBOARD = 'LEADERBOARD', // 728x90
  RECTANGLE = 'RECTANGLE', // 300x250
  SKYSCRAPER = 'SKYSCRAPER', // 160x600
  MOBILE_BANNER = 'MOBILE_BANNER', // 320x50
}

export interface GeneratorConfig {
  topic: string;
  tone: string;
  category: string;
}
