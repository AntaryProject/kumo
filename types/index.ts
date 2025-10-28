// Database types exported from Supabase
export type { Database } from '../lib/supabase';

// User types
export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// Message types
export interface Message {
  id: string;
  user_id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
  updated_at: string;
}

// Task types
export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

// Mood types
export interface Mood {
  id: string;
  user_id: string;
  mood: 'very_happy' | 'happy' | 'neutral' | 'sad' | 'very_sad';
  note: string | null;
  created_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

// Auth types
export interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
  error: string | null;
}

// Navigation types
export type RootStackParamList = {
  '(auth)': undefined;
  '(tabs)': undefined;
};

export type AuthStackParamList = {
  login: undefined;
  register: undefined;
  forgotPassword: undefined;
};

export type TabsStackParamList = {
  chat: undefined;
  tasks: undefined;
  profile: undefined;
};
