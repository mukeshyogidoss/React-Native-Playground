import { FlatList, StyleSheet, Text, View } from "react-native";

const PropsSharedScreen = ({ userArray }) => {
  // const PropsSharedScreen = ({name, age, phoneNo, email}) => {
  // const { name, email, age } = props.userArray;

  return (
    <View
      style={{
        backgroundColor: "#1e3c25",
        padding: 20,
        bottom: 90,
      }}
    >
      <Text style={{ textAlign: "center", color: "#ffffff", marginBottom: 20 }}>
        This is Props shared Screen these below datas are shared from main
        Screen
      </Text>
      {/* {userArray.map((val, index) => (
        <Text
          key={index}
          style={{
            backgroundColor: "#d3d3d3aa",
            margin: 4,
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          {val?.name}{" "}
        </Text>
      ))
      } */}
      <FlatList
        data={userArray}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ color: "#ff9b19" }}>{item.name} </Text>
        )}
      />
    </View>
  );
};

export default PropsSharedScreen;

const styles = StyleSheet.create({});
