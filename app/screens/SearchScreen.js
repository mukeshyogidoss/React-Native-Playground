import filter from "lodash.filter";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TextInput, View } from "react-native";

import { ActivityIndicator } from "react-native";
import styles from "../Styling";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fullData, setFullData] = useState();

  const handleQuery = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (user) => {
      return containsFn(user, formattedQuery);
    });
    setData(filteredData);
  };

  //                 (Full params    , typing params)
  const containsFn = ({ name, email }, formattedQuery) => {
    const { first, last } = name;

    if (
      first.includes(formattedQuery) ||
      last.includes(formattedQuery) ||
      email.includes(formattedQuery)
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUsers();
  }, []);

  const API_ENDPOINT = `https://randomuser.me/api/?results=30`;

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const json = await response.json();
      setData(json.results);
      setFullData(json.results);
      setIsLoading(false);
      console.log("Dataaa", data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 17,
            color: "#142991",
            marginBottom: 35,
          }}
        >
          Please wait... Fetching your Data{" "}
        </Text>
        <ActivityIndicator size={"large"} color=" #fff" />
      </View>
    );
  }
  const renderItem = ({ item }) => {
    return (
      //Main COntainer
      <View
        style={{
          padding: 12,
          flexDirection: "row",
          height: 89,
          width: 350,
          marginLeft: 20,
          backgroundColor: "#c3094138",
          marginBottom: 20,
          alignItems: "center",
          borderRadius: 12,
          borderWidth: 0.6,
        }}
      >
        {/* Conatiner for Image */}
        <View>
          <Image
            style={{
              width: 66,
              height: 66,
              // resizeMode: "contain",
              borderRadius: 12,
            }}
            source={{ uri: item?.picture?.medium }}
          />
        </View>
        {/* Container for Text Body */}
        <View
          style={{
            marginLeft: 19,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "800" }}>
            {item?.name?.first} {item?.name?.last}
          </Text>
          <Text>{item?.email} </Text>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#db7713c5",
      }}
    >
      <Text style={styles.mainHeaderText}>Search Screen</Text>
      <TextInput
        placeholder="Search Product"
        style={styles.textInput}
        onChangeText={(query) => handleQuery(query)}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item?.login?.username}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SearchScreen;
