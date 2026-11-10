import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  registerForPushNotificationsAsync,
  setupFCMNotificationListeners,
  testFCMSoundLocally,
  FCM_CHANNELS,
} from '../notifications/fcmService';

export default function FCMScreen() {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [expoToken, setExpoToken] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [lastNotification, setLastNotification] = useState<any>(null);

  useEffect(() => {
    // 1. Register & fetch FCM Token
    handleRegister();

    // 2. Setup Foreground and Tap listeners
    const unsubscribe = setupFCMNotificationListeners({
      onNotificationReceived: (notification: any) => {
        setLastNotification(notification);
        Alert.alert(
          'FCM Message Received! 📩',
          notification.request.content.title + '\n' + notification.request.content.body
        );
      },
      onNotificationTapped: (data: any) => {
        Alert.alert('FCM Notification Tapped 🚀', JSON.stringify(data, null, 2));
      },
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRegister = async () => {
    const result = await registerForPushNotificationsAsync();
    setPermissionGranted(result.granted);
    if (result.fcmDeviceToken) {
      setFcmToken(result.fcmDeviceToken);
    }
    if (result.expoPushToken) {
      setExpoToken(result.expoPushToken);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>FCM Push Notifications 🚀</Text>
        <Text style={styles.subtitle}>Firebase Cloud Messaging & Custom Sound Console</Text>

        {/* Status Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Status & Permissions</Text>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Permission:</Text>
            <Text
              style={[
                styles.statusValue,
                { color: permissionGranted ? '#10B981' : '#EF4444' },
              ]}
            >
              {permissionGranted === null
                ? 'Checking...'
                : permissionGranted
                ? 'Granted ✅'
                : 'Denied ❌'}
            </Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Target Sound:</Text>
            <Text style={styles.statusValue}>zomato_ring_5.mp3</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Channel ID:</Text>
            <Text style={styles.statusValue}>{FCM_CHANNELS.CUSTOM_SOUND}</Text>
          </View>
        </View>

        {/* Tokens Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your FCM Device Token</Text>
          <Text style={styles.infoText}>
            Use this token to send push notifications directly from Firebase Console or backend:
          </Text>
          <View style={styles.tokenBox}>
            <Text selectable style={styles.tokenText}>
              {fcmToken || 'Fetching native FCM token... (Requires physical device)'}
            </Text>
          </View>

          {expoToken && (
            <>
              <Text style={[styles.cardTitle, { marginTop: 14 }]}>Expo Push Token</Text>
              <View style={styles.tokenBox}>
                <Text selectable style={styles.tokenText}>
                  {expoToken}
                </Text>
              </View>
            </>
          )}

          <TouchableOpacity style={styles.refreshButton} onPress={handleRegister}>
            <Text style={styles.refreshButtonText}>🔄 Refresh / Re-register Token</Text>
          </TouchableOpacity>
        </View>

        {/* Action Controls */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Test Actions</Text>
          <View style={styles.buttonList}>
            <Button
              title="🔊 Test FCM Custom Sound Locally"
              color="#059669"
              onPress={async () => {
                await testFCMSoundLocally();
                Alert.alert('Triggered', 'Notification sent to FCM Custom Sound Channel!');
              }}
            />
          </View>
        </View>

        {/* Received Notification Display */}
        {lastNotification && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Last Received Notification</Text>
            <Text style={styles.receivedTitle}>
              {lastNotification.request.content.title}
            </Text>
            <Text style={styles.receivedBody}>
              {lastNotification.request.content.body}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  statusLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  infoText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
  },
  tokenBox: {
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 8,
  },
  tokenText: {
    color: '#38BDF8',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  refreshButton: {
    backgroundColor: '#E0E7FF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  refreshButtonText: {
    color: '#4338CA',
    fontWeight: '600',
    fontSize: 13,
  },
  buttonList: {
    gap: 10,
  },
  receivedTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  receivedBody: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 4,
  },
});
