import { useEffect } from 'react';
import {
    Alert,
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    initNotification,
    LikesNotification,
    OffersNotification,
    OrderConfirmed,
    PaymentNotification,
    scheduleLocalReminder,
    showCustomSoundNotification,
    showLocalNotification,
} from '../notifications/notificationServices';

const Notifications = () => {

    useEffect(() => {
        const setup = async () => {
            await initNotification();
        };
        setup();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Notifications 🔔</Text>
                <Text style={styles.subtitle}>Native Notification & Sound Practice Console</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>⭐ Custom Sound & Navigation</Text>
                    <View style={styles.buttons}>
                        <Button
                            title="🔊 Test Custom Sound (zomato.mp3)"
                            color="#059669"
                            onPress={() => showCustomSoundNotification()}
                        />
                        <Button
                            title="⏰ Schedule 5s Alert (Notification Tap Test)"
                            color="#2563EB"
                            onPress={async () => {
                                await scheduleLocalReminder({ delaySeconds: 5 });
                                Alert.alert("Scheduled", "Notification will arrive in 5 seconds. You can lock your screen or go to Home to test background arrival.");
                            }}
                        />
                        <Button
                            title="Offers Notification (zomato sound)"
                            color="#D97706"
                            onPress={OffersNotification}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Standard Channel Tests</Text>
                    <View style={styles.buttons}>
                        <Button
                            title="General Notification (HIGH)"
                            onPress={showLocalNotification}
                        />
                        <Button
                            title="Order Confirmed (HIGH)"
                            onPress={OrderConfirmed}
                        />
                        <Button
                            title="Payment Received (HIGH)"
                            onPress={PaymentNotification}
                        />
                        <Button
                            title="Likes your Post (SILENT/LOW)"
                            color="#6B7280"
                            onPress={LikesNotification}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Notifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    scrollContent: {
        padding: 20,
        paddingTop: 40,
        gap: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111827',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 4,
        marginBottom: 10,
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionHeader: {
        fontSize: 15,
        fontWeight: '700',
        color: '#374151',
        marginBottom: 14,
    },
    buttons: {
        gap: 12,
    },
});
