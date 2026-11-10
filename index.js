import notifee, { EventType } from '@notifee/react-native';

// Notifee background event handler must be registered at the entry level
notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification } = detail;
    if (type === EventType.PRESS && notification) {
        // Deep link or navigation payload will be processed once the activity launches / resumes
        console.log('[Notifee:BackgroundEvent] Notification pressed in background:', notification?.id);
    }
});

// Import Expo Router main entry
import 'expo-router/entry';

