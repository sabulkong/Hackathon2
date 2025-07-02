import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface NotificationSettings {
  paymentReminders: boolean;
  overdueAlerts: boolean;
  newPayments: boolean;
  dailySummary: boolean;
  weeklySummary: boolean;
}

export const useNotifications = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    paymentReminders: true,
    overdueAlerts: true,
    newPayments: true,
    dailySummary: true,
    weeklySummary: false,
  });

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    if ('Notification' in window) {
      setIsEnabled(Notification.permission === 'granted');
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setIsEnabled(permission === 'granted');
      
      if (permission === 'granted') {
        toast.success('Notifications enabled successfully!');
      } else {
        toast.error('Notification permission denied');
      }
    }
  };

  const sendNotification = (title: string, body: string, icon?: string) => {
    if (isEnabled && 'Notification' in window) {
      new Notification(title, {
        body,
        icon: icon || '/vite.svg',
        badge: '/vite.svg',
      });
    }
  };

  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    toast.success('Notification settings updated!');
  };

  const scheduleReminder = (memberId: string, memberName: string, amount: number, dueDate: string) => {
    const reminderDate = new Date(dueDate);
    reminderDate.setDate(reminderDate.getDate() - 3); // 3 days before due date
    
    const now = new Date();
    const timeUntilReminder = reminderDate.getTime() - now.getTime();
    
    if (timeUntilReminder > 0 && settings.paymentReminders) {
      setTimeout(() => {
        sendNotification(
          'Payment Reminder',
          `${memberName} has a payment of KES ${amount.toLocaleString()} due on ${dueDate}`
        );
      }, timeUntilReminder);
    }
  };

  return {
    settings,
    isEnabled,
    requestPermission,
    sendNotification,
    updateSettings,
    scheduleReminder,
  };
};