import { StyleSheet, Text, View } from "react-native";
import PropsSharedScreen from "./PropsSharedScreen";

const PropsMainScr = () => {
  const userData = [
    {
      id: 1,
      name: "Mukesh",
      phone: "+91 8124578791",
      age: 21,
      email: "mukeshyogidoss@gmail.com",
    },
    {
      id: 2,
      name: "Manoj",
      phone: "+91 91762387231",
      age: 21,
      email: "manoj007@gmail.com",
    },

    {
      id: 3,
      name: "Anvi",
      phone: "+91 912981221",
      age: 21,
      email: "anvi2020@gmail.com",
    },

    {
      id: 4,
      name: "Aadhi",
      phone: "+91 9327372723",
      age: 21,
      email: "aadhi123@gmail.com",
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#bacc7e",
        justifyContent: "space-evenly",
      }}
    >
      <Text style={{ textAlign: "center" }}>Props Main Screen</Text>

      <PropsSharedScreen
        userArray={userData}
        // name={userData.name}
        // phone={userData?.phone}
        // email={userData.email}
        // age={userData.age}
      />
    </View>
  );
};

export default PropsMainScr;

const styles = StyleSheet.create({});
