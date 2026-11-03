import { SectionList, StyleSheet, Text, View } from "react-native";

const SectionListScr = () => {
  const DATA = [
    {
      id: 1,
      title: "Tamil Nadu",
      data: ["Idly", "Dosa", "Poori", "Pongal"],
    },
    {
      id: 2,
      title: "Delhi",
      data: ["Chappati", "Vada Pav", "Butter Chicken"],
    },
    {
      id: 3,
      title: "Kerala",
      data: ["Puttu", "Pazham Puri", "Bananna Chips"],
    },
    {
      id: 4,
      title: "America",
      data: ["Pizza", "Burger", "Sandwhich"],
    },
    {
      id: 5,
      title: "Chinese",
      data: ["Noodles", "Rice Bowl", "Fried Rice"],
    },
    {
      id: 6,
      title: "Italy",
      data: ["Pasta", "Cheese Burger", "Fries"],
    },
    {
      id: 5,
      title: "Mexican",
      data: ["Shawarma", "Scehwan Rice", "Dragon Chicken"],
    },
  ];

  const renderSection = ({ section }) => (
    <View
      style={{
        backgroundColor: "#8a181fab",
        marginVertical: 10,
        borderRadius: 10,
        width: 350,
        left: 10,
      }}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: "900",
          marginLeft: 20,
          color: "#fff",
        }}
      >
        {section.title}{" "}
      </Text>
    </View>
  );

  const renderValue = ({ item }) => (
    <View
      style={{
        backgroundColor: "#ce8291",
        width: 220,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
        marginLeft: 80,
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "800",
        }}
      >
        {item}{" "}
      </Text>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: "#e9ef8dab" }}>
      <Text
        style={{
          marginTop: 90,
          textAlign: "center",
          fontWeight: "900",
          fontFamily: "arial",
          fontSize: 30,
        }}
      >
        Section List
      </Text>
      <SectionList
        sections={DATA}
        keyExtractor={(value, index) => index.toString()}
        renderSectionHeader={renderSection}
        renderItem={renderValue}
      />
      <View
        style={{
          marginTop: 40,
        }}
      ></View>
    </View>
  );
};

export default SectionListScr;

const styles = StyleSheet.create({});
