import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const UseState = () => {
  const [count, setCount] = useState(0);
  const incrementFn = () => {
    setCount((val) => val + 1);
  };

  const decrementFn = () => {
    setCount((val) => val - 1);
  };

  return (
    <View
      style={{
        backgroundColor: "rgb(255, 208, 255)",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "900",
          marginBottom: 28,
        }}
      >
        {count}
      </Text>
      <Button title="Increment" onPress={incrementFn} />
      <View style={{ height: 30 }} />
      <Button title="Decrement" onPress={decrementFn} />
    </View>
  );
};

export default UseState;

const styles = StyleSheet.create({});
