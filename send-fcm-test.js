/**
 * Node.js script to test sending an FCM push notification to your device with Custom Sound!
 * 
 * Usage:
 *   1. Replace YOUR_FCM_DEVICE_TOKEN_HERE with the token displayed on your FCMScreen.
 *   2. Run: node send-fcm-test.js
 */

const FCM_SERVER_KEY = 'PASTE_YOUR_FIREBASE_SERVER_KEY_OR_OAUTH_TOKEN_HERE';
const DEVICE_TOKEN = 'YOUR_FCM_DEVICE_TOKEN_HERE';

async function sendFCMNotification() {
  if (DEVICE_TOKEN === 'YOUR_FCM_DEVICE_TOKEN_HERE') {
    console.log('⚠️ Please copy your device FCM token from the app and paste it in DEVICE_TOKEN!');
    return;
  }

  // Standard FCM v1 / Legacy payload formatted with custom sound & channel
  const payload = {
    to: DEVICE_TOKEN,
    priority: 'high',
    notification: {
      title: 'Zomato FCM Alert! 🍕',
      body: 'Testing custom notification sound via Firebase Cloud Messaging.',
      sound: 'zomato_ring_5.mp3',
      android_channel_id: 'fcm_custom_sound_channel_v1',
    },
    data: {
      screen: '/screens/FCMScreen',
      time: new Date().toISOString(),
    },
  };

  console.log('Sending FCM payload:', JSON.stringify(payload, null, 2));

  // If using legacy HTTP endpoint:
  try {
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${FCM_SERVER_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log('FCM Response:', result);
  } catch (err) {
    console.error('Error sending FCM:', err);
  }
}

sendFCMNotification();

