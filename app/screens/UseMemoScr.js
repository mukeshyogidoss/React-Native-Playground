import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

import styles from "../Styling";

const UseMemoScr = () => {
  const [dark, setDark] = useState(false);
  const [number, setNumber] = useState(0);
  console.log("Component Rendered");

  const doubleNumber = slowFunction(number);

  //To slow the codes of program
  function slowFunction(numb) {
    console.log("Slow Function is Running");
    for (let i = 0; i < 100; i++) {}
    return numb * 2;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#949931",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          marginTop: 90,
          fontSize: 26,
          fontWeight: "900",
        }}
      >
        UseMemo Screen
      </Text>
      <TextInput
        value={number}
        onChangeText={(num) => setNumber(num)}
        style={styles.textInput}
        placeholder="Enter a Number : "
        keyboardType="number-pad"
      />

      <Text
        style={{
          backgroundColor: dark ? "#0e0e0e" : "#fff",
          color: dark ? "#fff" : "#141414",

          width: 250,
          height: 30,
          textAlign: "center",
          marginTop: 40,
          marginBottom: 30,
        }}
      >
        {doubleNumber}{" "}
      </Text>
      <Button
        title="Toggle Theme"
        onPress={() => {
          setDark((cur) => !cur);
          console.log("Theme Btn is Pressed");
        }}
      />
    </View>
  );
};

export default UseMemoScr;
