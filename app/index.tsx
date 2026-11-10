import { router, type Href } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const screens = [
    { title: "FCM Push Notifications 🚀", path: "/screens/FCMScreen" },
    { title: "Notifications Screen 🔔", path: "/screens/Notifications" },
    { title: "Use State Screen", path: "/screens/UseState" },
    { title: "Use Effect Screen", path: "/screens/UseEffect" },
    { title: "Use Ref Screen", path: "/screens/UseRefScr" },
    { title: "Use Memo Screen", path: "/screens/UseMemoScr" },
    { title: "React Query TanStack", path: "/screens/TanStackQuery" },
    { title: "Web Sockets Screen", path: "/screens/WebSockets" },
    { title: "Notifications Screen", path: "/screens/Notifications" },
    { title: "Dark Light Theme Screen", path: "/screens/DarkLightScr" },
    { title: "Search Items Screen", path: "/screens/SearchScreen" },
    { title: "Styling Screen", path: "/screens/StylingScr" },
    { title: "Props Screen", path: "/screens/PropsMainScr" },
    { title: "Section List Screen", path: "/screens/SectionListScr" },
    { title: "API Screen", path: "/screens/APIScr" },
    { title: "Performance Screen", path: "/screens/PerformanceScr" },
    { title: "Image Picker Screen", path: "/screens/ImagePicker" },
    { title: "Form Screen", path: "/screens/FormScreen" },
    { title: "FlatList Screen", path: "/screens/FlatList" },
    { title: "Condtinal Render Screen", path: "/screens/CondtionalScrRend" },
    { title: "Component Screen", path: "/screens/ComponentScr" },
    { title: "Async Storage Screen", path: "/screens/AsyncStorg" },
  ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#181818ec",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginTop: 30,
          backgroundColor: "#434942ff",
          height: 700,
          width: 300,
          borderRadius: 20
        }}
      >
        <FlatList
          data={screens}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 10,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(item.path as Href)}
              style={{
                marginVertical: 13,
                backgroundColor: "#084c1d",
                width: 200,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "#fff",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>{item.title} </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
