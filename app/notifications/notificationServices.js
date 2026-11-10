import notifee, {
    AndroidImportance,
    AndroidVisibility,
    EventType,
    TriggerType,
} from '@notifee/react-native';
import { router } from 'expo-router';

/**
 * Playground Notification Channels Architecture:
 * 
 * 1. custom_sound_alerts_v1 (HIGH):
 *    - Custom sound: zomato (maps to android/app/src/main/res/raw/zomato.mp3)
 * 2. general_alerts_v1 (HIGH/DEFAULT):
 *    - Standard system sound
 * 3. silent_channel_v1 (LOW/MIN):
 *    - Silent / no sound
 */
export const CHANNELS = {
    CUSTOM_SOUND: 'custom_sound_alerts_v1',
    GENERAL: 'general_alerts_v1',
    SILENT: 'silent_channel_v1',
    // Preserved for previous test cases
    LEGACY_OFFERS: 'offers_custom_sound_v2',
};

/**
 * Initializes notification permissions and channels once during application startup.
 */
export async function initNotification() {
    try {
        const settings = await notifee.requestPermission();

        // Channel with Custom Sound (supports both 'zomato_ring_5' and 'zomato')
        await notifee.createChannel({
            id: CHANNELS.CUSTOM_SOUND,
            name: 'Custom Sound Alerts',
            importance: AndroidImportance.HIGH,
            sound: 'zomato_ring_5', // Resolves to res/raw/zomato_ring_5.mp3 (already compiled into current APK)
            vibration: true,
            vibrationPattern: [300, 500, 300, 500],
            visibility: AndroidVisibility.PUBLIC,
        });

        // Channel for General Notifications
        await notifee.createChannel({
            id: CHANNELS.GENERAL,
            name: 'General Notifications',
            importance: AndroidImportance.HIGH,
            sound: 'default',
            vibration: true,
        });

        // Channel for Silent Notifications
        await notifee.createChannel({
            id: CHANNELS.SILENT,
            name: 'Silent Notifications',
            importance: AndroidImportance.LOW,
            sound: undefined,
        });

        // Backward-compatible channel
        await notifee.createChannel({
            id: CHANNELS.LEGACY_OFFERS,
            name: 'Offers & Promotions',
            importance: AndroidImportance.DEFAULT,
            sound: 'zomato_ring_5',
        });

        return settings;
    } catch (error) {
        console.error('[NotificationService] Error initializing channels:', error);
    }
}

/**
 * Global handler for notification navigation when tapped.
 */
export function handleNotificationPress(notification) {
    if (!notification) return;

    const data = notification.data || {};
    if (data.url) {
        router.push(data.url);
    } else if (data.screen) {
        router.push(data.screen);
    }
}

/**
 * Setup foreground notification listener.
 */
export function setupForegroundNotificationListener() {
    return notifee.onForegroundEvent(({ type, detail }) => {
        if (type === EventType.PRESS && detail.notification) {
            handleNotificationPress(detail.notification);
        }
    });
}

/**
 * Handle cold start: checks if app was launched by tapping a notification.
 */
export async function checkInitialNotification() {
    try {
        const initial = await notifee.getInitialNotification();
        if (initial && initial.notification) {
            handleNotificationPress(initial.notification);
        }
    } catch (error) {
        console.error('[NotificationService] Error checking initial notification:', error);
    }
}

/**
 * Show notification with custom sound (zomato.mp3)
 */
export async function showCustomSoundNotification({
    title = 'Custom Sound Alert 🔊',
    body = 'This notification plays zomato.mp3 custom sound!',
    screen = '/screens/Notifications',
} = {}) {
    await notifee.displayNotification({
        id: `custom_sound_${Date.now()}`,
        title,
        body,
        data: {
            screen,
            url: screen,
        },
        android: {
            channelId: CHANNELS.CUSTOM_SOUND,
            smallIcon: 'ic_launcher',
            sound: 'zomato_ring_5',
            pressAction: {
                id: 'default',
            },
        },
    });
}

/**
 * Schedule a local notification (e.g. 5 seconds delay)
 */
export async function scheduleLocalReminder({
    delaySeconds = 5,
    title = 'Scheduled Reminder ⏰',
    body = '5-second timer finished! Tapping opens Notifications.',
    screen = '/screens/Notifications',
} = {}) {
    const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: Date.now() + delaySeconds * 1000,
    };

    await notifee.createTriggerNotification(
        {
            id: `reminder_${Date.now()}`,
            title,
            body,
            data: {
                screen,
                url: screen,
            },
            android: {
                channelId: CHANNELS.GENERAL,
                smallIcon: 'ic_launcher',
                pressAction: {
                    id: 'default',
                },
            },
        },
        trigger
    );
}

// ---------------- EXISTING TEST FUNCTIONS ----------------

export async function showLocalNotification() {
    await notifee.displayNotification({
        title: 'General Notification (HIGH)',
        body: 'Standard notification with default system sound.',
        android: {
            channelId: CHANNELS.GENERAL,
            smallIcon: 'ic_launcher',
            pressAction: { id: 'default' },
        },
    });
}

export async function OffersNotification() {
    await notifee.displayNotification({
        title: 'Offers is on Live',
        body: 'Latest offers are going on, Dont miss this 📉💰',
        android: {
            channelId: CHANNELS.LEGACY_OFFERS,
            smallIcon: 'ic_launcher',
            sound: 'zomato_ring_5',
            pressAction: { id: 'default' },
        },
    });
}

export async function OrderConfirmed() {
    await notifee.displayNotification({
        title: 'Order Picked',
        body: 'Your order has been picked by delivery boy, He will be at your place in 10mins 📦',
        android: {
            channelId: CHANNELS.GENERAL,
            smallIcon: 'ic_launcher',
            pressAction: { id: 'default' },
        },
    });
}

export async function PaymentNotification() {
    await notifee.displayNotification({
        title: 'Payment Received',
        body: 'Received Rs.12,927.00 in your Kotak Bank AC 1293 from Ram AC XXX1234',
        android: {
            channelId: CHANNELS.GENERAL,
            smallIcon: 'ic_launcher',
            pressAction: { id: 'default' },
        },
    });
}

export async function LikesNotification() {
    await notifee.displayNotification({
        title: 'Liked your Post',
        body: 'Your post is liked by _._.john._._ and others',
        android: {
            channelId: CHANNELS.SILENT,
            smallIcon: 'ic_launcher',
            pressAction: { id: 'default' },
        },
    });
}
