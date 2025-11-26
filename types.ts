
export interface Scholarship {
  id: string;
  title: string;
  subtitle: string;
  deadline?: string;
  iconType: 'grad' | 'globe';
  country?: string;
  amount?: string;
  url?: string;
}

export interface NavItem {
  id: string;
  icon: any;
  label: string;
  isSpecial?: boolean;
}

export interface UserProfile {
  name: string;
  age: number;
  classLevel: string;
  jambCombination: string[];
  waecSubjects: string[];
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctOption: number;
  note?: string;
  subject?: string;
}

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export type ViewState = 'home' | 'subjects' | 'scholarships' | 'performance' | 'profile' | 'cbt';

export const THEME = {
  primaryMint: "#4DB6AC",
  secondarySage: "#81C784",
  backgroundPaleGreen: "#F1F8E9",
  textDarkGreen: "#1B5E20",
  textMediumGreen: "#388E3C",
  accentGold: "#FDD835"
};