import { create } from 'zustand';
import { Message } from '../types';
import { supabase } from '../lib/supabase';
import { N8NService } from '../lib/n8n';

interface ChatStore {
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (content: string, userId: string) => Promise<void>;
  loadMessages: (userId: string) => Promise<void>;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  loading: false,
  error: null,

  sendMessage: async (content: string, userId: string) => {
    try {
      set({ loading: true, error: null });

      // Add user message to local state immediately
      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        user_id: userId,
        content,
        role: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      set(state => ({
        messages: [...state.messages, userMessage],
      }));

      // Save user message to database
      const { data: savedMessage, error: saveError } = await supabase
        .from('messages')
        .insert({
          user_id: userId,
          content,
          role: 'user',
        })
        .select()
        .single();

      if (saveError) {
        console.error('Error saving message:', saveError);
      }

      // Send to n8n webhook
      const n8nResponse = await N8NService.sendMessage(content, userId);
      
      if (!n8nResponse.success) {
        console.error('N8N webhook error:', n8nResponse.error);
      }

      // For now, simulate assistant response
      // In a real app, you'd get this from n8n or your AI service
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        user_id: userId,
        content: `Gracias por tu mensaje: "${content}". Estoy aquí para ayudarte con tu bienestar mental.`,
        role: 'assistant',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Save assistant message to database
      const { error: assistantSaveError } = await supabase
        .from('messages')
        .insert({
          user_id: userId,
          content: assistantMessage.content,
          role: 'assistant',
        });

      if (assistantSaveError) {
        console.error('Error saving assistant message:', assistantSaveError);
      }

      set(state => ({
        messages: [...state.messages, assistantMessage],
        loading: false,
      }));

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
    }
  },

  loadMessages: async (userId: string) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (error) {
        set({ error: error.message, loading: false });
        return;
      }

      set({ messages: data || [], loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
    }
  },

  clearMessages: () => {
    set({ messages: [], error: null });
  },
}));
