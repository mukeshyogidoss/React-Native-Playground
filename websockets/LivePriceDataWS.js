const WebSocket = require("ws");

const ws = new WebSocket("wss://stream.binance.com:443/ws/solusdt@trade");

ws.on("open", () => {
  console.log("Connected!");
});

ws.on("message", (data) => {
  const trade = JSON.parse(data);
  console.log("Bitcoin price:", trade.p);
});

ws.on("error", (error) => {
  console.log("Error:", error.message);
});

ws.on("close", () => {
  console.log("Connection closed");
});
