import notifee, { AndroidImportance } from '@notifee/react-native';


export async function initNotification() {
    await notifee.requestPermission();
    await notifee.createChannel({
        id: 'default_001',
        name: 'Default',
        importance: AndroidImportance.HIGH
    })
    await notifee.createChannel({
        id: 'offers_001',
        name: 'New Offers',
        importance: AndroidImportance.HIGH
    })
    await notifee.createChannel({
        id: 'order_001',
        name: 'Orders',
        importance: AndroidImportance.HIGH
    })

}


export async function showLocalNotification() {
    await notifee.displayNotification({
        title: 'Dummmy Notifications Title',
        body: 'Hello this is a body of the Notificaiton Part',
        android: {
            channelId: 'default_001',
            smallIcon: 'ic_launcher'
        }
    })
}
export async function OffersNotification() {
    await notifee.displayNotification({
        title: 'Offers is on Live',
        body: 'Latest offers are going on, Dont miss this 📉💰',
        android: {
            channelId: 'offers_001',
            smallIcon: 'ic_launcher'
        }
    })
}
export async function OrderConfirmed() {
    await notifee.displayNotification({
        title: 'Order Picked',
        body: ' Your order has been picked by delivery boy,He will be at your place in 10mins 📦',
        android: {
            channelId: 'order_001',
            smallIcon: 'ic_launcher'
        }
    })
}