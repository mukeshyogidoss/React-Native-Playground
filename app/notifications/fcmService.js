import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/**
 * Configure default foreground notification presentation behavior
 * Ensures sound, banner, and badge show when app is open in foreground.
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

/**
 * Channel IDs for FCM / Expo Notifications
 */
export const FCM_CHANNELS = {
  CUSTOM_SOUND: 'fcm_custom_sound_channel_v1',
  DEFAULT: 'fcm_default_channel_v1',
};

/**
 * 1. Register for Push Notifications (FCM)
 * - Requests Android 13+ POST_NOTIFICATIONS permission
 * - Configures Android Notification Channel with custom sound (zomato.mp3 / zomato_ring_5.mp3)
 * - Retrieves native FCM Device Push Token & Expo Push Token
 */
export async function registerForPushNotificationsAsync() {
  let fcmDeviceToken = null;
  let expoPushToken = null;

  try {
    // 1. Check existing permission
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('[FCM] Permission not granted for push notifications');
      return { fcmDeviceToken: null, expoPushToken: null, granted: false };
    }

    // 2. Set up Android Notification Channels
    if (Platform.OS === 'android') {
      // Channel 1: High Importance with Custom Sound
      await Notifications.setNotificationChannelAsync(FCM_CHANNELS.CUSTOM_SOUND, {
        name: 'FCM Custom Sound Alerts',
        importance: Notifications.AndroidImportance.MAX,
        sound: 'zomato_ring_5.mp3', // Matches asset compiled into res/raw
        vibrationPattern: [0, 300, 200, 300],
        lightColor: '#059669',
        lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        bypassDnd: false,
      });

      // Channel 2: Standard Default Channel
      await Notifications.setNotificationChannelAsync(FCM_CHANNELS.DEFAULT, {
        name: 'FCM General Alerts',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
      });
    }

    // 3. Get Native FCM Device Push Token
    // Note: Requires physical device and a development build with google-services.json
    try {
      const deviceTokenResult = await Notifications.getDevicePushTokenAsync();
      fcmDeviceToken = deviceTokenResult.data;
      console.log('[FCM] Native Device Push Token (FCM):', fcmDeviceToken);
    } catch (tokenErr) {
      console.warn('[FCM] Could not get native device push token (expected on emulator / Expo Go):', tokenErr);
    }

    // 4. Also fetch Expo Push Token (handy for testing via expo.dev/notifications)
    try {
      const expoTokenResult = await Notifications.getExpoPushTokenAsync();
      expoPushToken = expoTokenResult.data;
      console.log('[FCM] Expo Push Token:', expoPushToken);
    } catch (expoErr) {
      console.log('[FCM] Expo push token fetch info:', expoErr?.message);
    }

    return {
      fcmDeviceToken,
      expoPushToken,
      granted: true,
    };
  } catch (error) {
    console.error('[FCM] Error registering for push notifications:', error);
    return { fcmDeviceToken: null, expoPushToken: null, granted: false, error };
  }
}

/**
 * 2. Setup listeners for incoming remote FCM notifications and user taps
 */
export function setupFCMNotificationListeners({ onNotificationReceived, onNotificationTapped } = {}) {
  // Listener A: Triggered when a notification is received while the app is foregrounded
  const foregroundSubscription = Notifications.addNotificationReceivedListener((notification) => {
    console.log('[FCM] Foreground notification received:', notification);
    if (onNotificationReceived) {
      onNotificationReceived(notification);
    }
  });

  // Listener B: Triggered when user taps / interacts with the notification
  const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
    console.log('[FCM] Notification tapped by user:', response);
    const data = response?.notification?.request?.content?.data;
    if (onNotificationTapped) {
      onNotificationTapped(data, response);
    }
  });

  return () => {
    foregroundSubscription.remove();
    responseSubscription.remove();
  };
}

/**
 * 3. Test local trigger using the FCM Custom Sound Channel
 * Allows immediate verification that the sound and channel play on the device.
 */
export async function testFCMSoundLocally() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'FCM Sound Test (Zomato 🔔)',
      body: 'Testing custom notification sound via expo-notifications FCM channel.',
      sound: 'zomato_ring_5.mp3',
      data: { test: true, timestamp: Date.now() },
    },
    trigger: {
      channelId: FCM_CHANNELS.CUSTOM_SOUND,
    },
  });
}

