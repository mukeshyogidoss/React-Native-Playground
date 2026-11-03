const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('New client connected');
    console.log(`Total clients: ${wss.clients.size}`);

    // Send a welcome message to this client
    ws.send('Hello from the WebSocket Server');

    // Receive a message from this client
    ws.on('message', (message) => {
        console.log(`Received from client: ${message}`);

        // Reply to this client
        ws.send(`Server Response: You sent -> ${message}`);
    });

    // Send the connected-client count every 3 seconds
    const interval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(`Total connected clients: ${wss.clients.size}`);
        }
    }, 3000);

    // Handle client disconnection
    ws.on('close', () => {
        clearInterval(interval);
        console.log(`Client disconnected. Total clients: ${wss.clients.size}`);
    });

    // Handle connection errors
    ws.on('error', (error) => {
        console.log('WebSocket error:', error.message);
    });
});

wss.on('listening', () => {
    console.log('WebSocket server running on port 8080');
});

wss.on('error', (error) => {
    console.log('Server error:', error.message);
});