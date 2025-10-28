// n8n webhook integration
const N8N_WEBHOOK_URL = process.env.EXPO_PUBLIC_N8N_WEBHOOK_URL || 'https://antary-n8n.zbwz54.easypanel.host/webhook/f78e4252-4f26-4195-b00f-76aba4045aae';
const N8N_WEBHOOK_TEST_URL = process.env.EXPO_PUBLIC_N8N_WEBHOOK_TEST_URL || 'https://antary-n8n.zbwz54.easypanel.host/webhook-test/f78e4252-4f26-4195-b00f-76aba4045aae';

export interface N8NWebhookPayload {
  message: string;
  userId?: string;
  timestamp?: string;
  metadata?: Record<string, any>;
}

export interface N8NWebhookResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export class N8NService {
  private static async sendToWebhook(
    url: string,
    payload: N8NWebhookPayload
  ): Promise<N8NWebhookResponse> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('N8N webhook error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  static async sendMessage(message: string, userId?: string): Promise<N8NWebhookResponse> {
    const payload: N8NWebhookPayload = {
      message,
      userId,
      timestamp: new Date().toISOString(),
    };

    return this.sendToWebhook(N8N_WEBHOOK_URL, payload);
  }

  static async sendTestMessage(message: string, userId?: string): Promise<N8NWebhookResponse> {
    const payload: N8NWebhookPayload = {
      message,
      userId,
      timestamp: new Date().toISOString(),
      metadata: { test: true },
    };

    return this.sendToWebhook(N8N_WEBHOOK_TEST_URL, payload);
  }

  static async sendMoodUpdate(mood: string, userId: string, note?: string): Promise<N8NWebhookResponse> {
    const payload: N8NWebhookPayload = {
      message: `Mood update: ${mood}`,
      userId,
      timestamp: new Date().toISOString(),
      metadata: {
        type: 'mood_update',
        mood,
        note,
      },
    };

    return this.sendToWebhook(N8N_WEBHOOK_URL, payload);
  }

  static async sendTaskUpdate(taskTitle: string, action: string, userId: string): Promise<N8NWebhookResponse> {
    const payload: N8NWebhookPayload = {
      message: `Task ${action}: ${taskTitle}`,
      userId,
      timestamp: new Date().toISOString(),
      metadata: {
        type: 'task_update',
        action,
        taskTitle,
      },
    };

    return this.sendToWebhook(N8N_WEBHOOK_URL, payload);
  }
}
