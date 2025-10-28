import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { supabase } from './supabase';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export interface NotificationToken {
  token: string;
  userId: string;
}

export class NotificationService {
  static async registerForPushNotificationsAsync(userId: string): Promise<string | null> {
    let token: string | null = null;

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return null;
      }
      
      try {
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Push token:', token);
      } catch (error) {
        console.error('Error getting push token:', error);
        return null;
      }
    } else {
      console.log('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // Save token to Supabase
    if (token && userId) {
      await this.saveTokenToDatabase(token, userId);
    }

    return token;
  }

  static async saveTokenToDatabase(token: string, userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('notification_tokens')
        .upsert({
          user_id: userId,
          token,
          platform: Platform.OS,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error saving notification token:', error);
      } else {
        console.log('Notification token saved successfully');
      }
    } catch (error) {
      console.error('Error saving notification token:', error);
    }
  }

  static async sendLocalNotification(
    title: string,
    body: string,
    data?: any
  ): Promise<void> {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: null, // Show immediately
    });
  }

  static async scheduleReminderNotification(
    title: string,
    body: string,
    triggerDate: Date,
    data?: any
  ): Promise<void> {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: {
        date: triggerDate,
      },
    });
  }

  static async scheduleDailyMoodReminder(userId: string): Promise<void> {
    // Cancel existing mood reminders
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule daily mood reminder at 8 PM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(20, 0, 0, 0);

    await this.scheduleReminderNotification(
      '¿Cómo te sientes hoy? 😊',
      'Es hora de registrar tu estado de ánimo diario',
      tomorrow,
      { type: 'mood_reminder', userId }
    );
  }

  static async scheduleTaskReminder(
    taskTitle: string,
    dueDate: Date,
    userId: string
  ): Promise<void> {
    await this.scheduleReminderNotification(
      'Recordatorio de tarea 📝',
      `"${taskTitle}" está próxima a vencer`,
      dueDate,
      { type: 'task_reminder', userId, taskTitle }
    );
  }

  static addNotificationListener(
    onNotificationReceived: (notification: Notifications.Notification) => void,
    onNotificationResponse: (response: Notifications.NotificationResponse) => void
  ): Notifications.Subscription[] {
    const receivedSubscription = Notifications.addNotificationReceivedListener(onNotificationReceived);
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(onNotificationResponse);

    return [receivedSubscription, responseSubscription];
  }

  static removeNotificationListeners(subscriptions: Notifications.Subscription[]): void {
    subscriptions.forEach(subscription => subscription.remove());
  }

  static async getBadgeCount(): Promise<number> {
    return await Notifications.getBadgeCountAsync();
  }

  static async setBadgeCount(count: number): Promise<void> {
    await Notifications.setBadgeCountAsync(count);
  }

  static async clearAllNotifications(): Promise<void> {
    await Notifications.dismissAllNotificationsAsync();
  }
}
