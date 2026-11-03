import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Button, FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import LivePrice from '../../websockets/LivePrice';


const WebSockets = () => {
    const [chatData, setChatData] = useState([]);
    const [message, setMessage] = useState('');
    const [showLivePrice, setShowLivePrice] = useState(false);
    const socketRef = useRef(null);

    const router = useRouter()



    useEffect(() => {
        const socket = new WebSocket('ws://192.168.1.8:8080');
        socketRef.current = socket;

        socket.onopen = () => {
            console.log('Connected to the server');
            displayMessage('Connected to the server', 'server');
        };

        socket.onmessage = (event) => {
            displayMessage(event.data, 'server');
        };

        socket.onerror = () => {
            displayMessage('Connection error', 'server');
        };

        return () => {
            socket.close();
        };
    }, []);

    function displayMessage(msg, type) {
        setChatData((prev) => [
            ...prev,
            {
                id: Date.now().toString() + Math.random(),
                message: msg,
                type: type,
            },
        ]);
    }

    function sendMsg() {
        if (message.trim() === '') {
            return;
        }

        if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(message);

            displayMessage(message, 'client');

            setMessage('');
        }
    }

    if (showLivePrice) {
        return <LivePrice />;
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Simple Chat 💬</Text>

            <FlatList
                style={styles.chatList}
                data={chatData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.chatBubble,
                            item.type === 'client'
                                ? styles.clientBubble
                                : styles.serverBubble,
                        ]}
                    >
                        <Text style={styles.sender}>
                            {item.type === 'client' ? 'You' : 'Server'}
                        </Text>

                        <Text style={styles.chatText}>
                            {item.message}
                        </Text>
                    </View>
                )}
            />

            <View style={styles.inputRow}>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    style={styles.input}
                    placeholder="Type a message..."
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={sendMsg}
                >
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
                <Button
                    title="LIVE PRICE123"
                    onPress={() => setShowLivePrice(true)}
                />
            </View>

        </View>
    );
};

export default WebSockets;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f45422',
        padding: 16,
        paddingTop: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    chatList: {
        flex: 1,
    },
    chatBubble: {
        padding: 12,
        borderRadius: 12,
        marginVertical: 5,
        maxWidth: '80%',
    },
    clientBubble: {
        backgroundColor: '#d9fdd3',
        alignSelf: 'flex-end',
    },
    serverBubble: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
    },
    sender: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#555',
    },
    chatText: {
        fontSize: 16,
        color: '#222',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 189,
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 48,
    },
    button: {
        backgroundColor: '#222',
        paddingHorizontal: 18,
        height: 48,
        borderRadius: 10,
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});