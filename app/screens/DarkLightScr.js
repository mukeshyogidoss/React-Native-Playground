import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

const DarkLightScr = () => {
  const theme = useColorScheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme == "dark" ? "#1c1b1bde" : "#d7d5cf",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {theme == "dark" ? (
        <AntDesign
          // style={{ marginLeft: 180 }}
          name="moon"
          size={55}
          color="#a8a3a3"
        />
      ) : (
        <MaterialIcons name="sunny" size={55} color="#b9850d" />
      )}

      <Text
        style={{
          marginTop: 10,
          fontSize: 22,
          textAlign: "center",
          fontWeight: "900",
          color: theme == "dark" ? "#c7c4c4" : "#434141",
        }}
      >
        {theme == "dark" ? "Dark Theme is Enabled " : "Light Theme is Enabled"}
      </Text>
    </View>
  );
};

export default DarkLightScr;

const styles = StyleSheet.create({});
