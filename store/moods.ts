import { create } from 'zustand';
import { Mood } from '../types';
import { supabase } from '../lib/supabase';
import { N8NService } from '../lib/n8n';

interface MoodsStore {
  moods: Mood[];
  loading: boolean;
  error: string | null;
  loadMoods: (userId: string) => Promise<void>;
  addMood: (moodData: Omit<Mood, 'id' | 'created_at'>) => Promise<void>;
  getTodayMood: (userId: string) => Mood | null;
}

export const useMoodsStore = create<MoodsStore>((set, get) => ({
  moods: [],
  loading: false,
  error: null,

  loadMoods: async (userId: string) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from('moods')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        set({ error: error.message, loading: false });
        return;
      }

      set({ moods: data || [], loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
    }
  },

  addMood: async (moodData: Omit<Mood, 'id' | 'created_at'>) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from('moods')
        .insert(moodData)
        .select()
        .single();

      if (error) {
        set({ error: error.message, loading: false });
        return;
      }

      set(state => ({
        moods: [data, ...state.moods],
        loading: false,
      }));

      // Send to n8n
      await N8NService.sendMoodUpdate(data.mood, data.user_id, data.note || undefined);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
    }
  },

  getTodayMood: (userId: string) => {
    const today = new Date().toDateString();
    return get().moods.find(mood => 
      mood.user_id === userId && 
      new Date(mood.created_at).toDateString() === today
    ) || null;
  },
}));
