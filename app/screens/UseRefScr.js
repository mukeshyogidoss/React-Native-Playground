import { useRef, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import styles from "../Styling";

const UseRefScr = () => {
  const [name, setName] = useState();

  // Random background color
  const [bgColor, setBgColor] = useState("#ea3140");

  const nameRef = useRef("");
  const keyboardRef = useRef();

  // This runs every time the component re-rendersssssss
  console.log("Re-Rendering useState:", name);

  const showText = () => {
    console.log("name Ref:", nameRef.current);

    Alert.alert("UseRef Value is:", nameRef.current);
  };

  // Generate random color
  const getRandomColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: bgColor,
        alignItems: "center",
      }}
    >
      <Text style={styles.mainHeaderText}>UseRef Screen</Text>

      {/* useRef TextInput */}
      <TextInput
        ref={keyboardRef}
        style={styles.textInput}
        placeholder="Using the useRef..."
        onChangeText={(text) => {
          nameRef.current = text;
        }}
      />

      {/* useState TextInput */}
      <TextInput
        style={[styles.textInput, { marginTop: -5 }]}
        placeholder="Using useState..."
        onChangeText={(text) => {
          setName(text);

          // Chngess BG colouur whenever useState updates
          setBgColor(getRandomColor());
        }}
      />

      <Text
        style={{
          fontSize: 20,
          marginTop: 30,
          width: 270,
        }}
      >
        Using UseState : {name}
      </Text>

      <View style={{ marginTop: 30 }}>
        <Button title="Use Ref Value" onPress={showText} />
      </View>

      {/* Focus keyboard */}
      <View style={{ marginTop: 30 }}>
        <Button
          title="Keyboard Focus"
          onPress={() => keyboardRef.current?.focus()}
        />
      </View>
    </View>
  );
};

export default UseRefScr;
