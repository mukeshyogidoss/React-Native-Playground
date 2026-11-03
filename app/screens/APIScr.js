import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const APIScr = () => {
  useEffect(() => {
    fetchUsers();
  }, []);

  const [users, setUsers] = useState([]);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/users",
  //     );
  //     const data = await response.json();
  //     console.log("Datatatatatt11", data[0].address.city);
  //   } catch (error) {
  //     console.log("Errorrrrr123 : ", error);
  //   }
  // };
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users",
      );
      setUsers(response.data);
      // console.log("Respoenseeee", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#faf",
      }}
    >
      <View style={{ marginTop: 90, marginLeft: 90 }}>
        <FlatList
          data={users}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => <Text>{item?.name} </Text>}
        />
      </View>
    </View>
  );
};

export default APIScr;

const styles = StyleSheet.create({});
