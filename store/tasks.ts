import { create } from 'zustand';
import { Task } from '../types';
import { supabase } from '../lib/supabase';
import { N8NService } from '../lib/n8n';

interface TasksStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  loadTasks: (userId: string) => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
}

export const useTasksStore = create<TasksStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  loadTasks: async (userId: string) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        set({ error: error.message, loading: false });
        return;
      }

      set({ tasks: data || [], loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
    }
  },

  addTask: async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from('tasks')
        .insert(taskData)
        .select()
        .single();

      if (error) {
        set({ error: error.message, loading: false });
        return;
      }

      set(state => ({
        tasks: [data, ...state.tasks],
        loading: false,
      }));

      // Send to n8n
      await N8NService.sendTaskUpdate(data.title, 'created', data.user_id);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
    }
  },

  updateTask: async (id: string, updates: Partial<Task>) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        set({ error: error.message, loading: false });
        return;
      }

      set(state => ({
        tasks: state.tasks.map(task => 
          task.id === id ? { ...task, ...updates } : task
        ),
        loading: false,
      }));

      // Send to n8n
      if (updates.title) {
        await N8NService.sendTaskUpdate(updates.title, 'updated', data.user_id);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
    }
  },

  deleteTask: async (id: string) => {
    try {
      set({ loading: true, error: null });

      const task = get().tasks.find(t => t.id === id);
      
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) {
        set({ error: error.message, loading: false });
        return;
      }

      set(state => ({
        tasks: state.tasks.filter(task => task.id !== id),
        loading: false,
      }));

      // Send to n8n
      if (task) {
        await N8NService.sendTaskUpdate(task.title, 'deleted', task.user_id);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
    }
  },

  toggleTask: async (id: string) => {
    try {
      const task = get().tasks.find(t => t.id === id);
      if (!task) return;

      await get().updateTask(id, { completed: !task.completed });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
    }
  },
}));
