import { useQueryClient } from "@tanstack/react-query";
import { FlatList, StyleSheet, Text, View } from "react-native";

const TanStackQuery2 = () => {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<{ id: number; name: string }[]>([
    "posts",
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TanStackQuery2</Text>

      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <View style={styles.userCard}>
            <View style={styles.numberBox}>
              <Text style={styles.number}>{index + 1}</Text>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userId}>User ID: {item.id}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TanStackQuery2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4a4a4a",
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 25,
    gap: 12,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262A38",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#383D50",
  },
  numberBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F96A0D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  number: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  userId: {
    color: "#A0AEC0",
    fontSize: 12,
    marginTop: 5,
  },
});
