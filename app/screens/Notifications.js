
import { useEffect } from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    initNotification,
    OffersNotification,
    OrderConfirmed,
    showLocalNotification,
} from '../notifications/notificationServices';

const Notifications = () => {

    useEffect(() => {
        const requestNotificationPermission = async () => {
            await initNotification();
        };

        requestNotificationPermission();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Notifications 🔔</Text>
            <Text style={styles.subtitle}>Test your notifications</Text>

            <View style={styles.buttons}>
                <Button
                    title="General Notification"
                    onPress={showLocalNotification}
                />

                <Button
                    title="Offers Notification"
                    onPress={OffersNotification}
                />

                <Button
                    title="Order Confirmed"
                    onPress={OrderConfirmed}
                />
            </View>
        </SafeAreaView>
    );
};

export default Notifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#222',
        textAlign: 'center',
        bottom: 120
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
        marginTop: 6,
        marginBottom: 30,
        textAlign: 'center',
        bottom: 100
    },
    buttons: {
        gap: 18,
    },
});
