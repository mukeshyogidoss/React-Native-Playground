import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const LivePrice = () => {
  const [price, setPrice] = useState("Loading...");

  useEffect(() => {
    const socket = new WebSocket(
      "wss://stream.binance.com:443/ws/btcusdt@trade",
    );

    socket.onopen = () => {
      console.log("Connected to Binance");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrice(
        Number(data.t).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      );
    };

    socket.onerror = () => {
      console.log("WebSocket connection error");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bitcoin Live Price 🪙</Text>
      <Text style={styles.price}>${price} USD</Text>
      <Text style={styles.subtitle}>Live trade updates</Text>
    </View>
  );
};

export default LivePrice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111317",
  },
  title: {
    fontSize: 22,
    color: "white",
    marginBottom: 15,
    fontWeight: "800",
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#36D399",
  },
  subtitle: {
    color: "#AAAAAA",
    marginTop: 10,
  },
});
