import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NotificationService } from '../lib/notifications';
import { useAuthStore } from '../store/auth';

export function useNotificationSetup() {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    // Register for push notifications
    NotificationService.registerForPushNotificationsAsync(user.id);

    // Set up notification listeners
    const subscriptions = NotificationService.addNotificationListener(
      (notification) => {
        console.log('Notification received:', notification);
      },
      (response) => {
        console.log('Notification response:', response);
        const data = response.notification.request.content.data;
        
        if (data?.type === 'mood_reminder') {
          Alert.alert(
            'Recordatorio',
            'Es hora de registrar tu estado de ánimo diario',
            [{ text: 'OK' }]
          );
        } else if (data?.type === 'task_reminder') {
          Alert.alert(
            'Recordatorio de tarea',
            `"${data.taskTitle}" está próxima a vencer`,
            [{ text: 'OK' }]
          );
        }
      }
    );

    // Schedule daily mood reminder
    NotificationService.scheduleDailyMoodReminder(user.id);

    return () => {
      NotificationService.removeNotificationListeners(subscriptions);
    };
  }, [user]);
}
