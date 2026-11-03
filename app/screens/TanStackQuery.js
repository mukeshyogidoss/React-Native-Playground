import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { addPost, fetchPost } from "../../api/api";

const TanStackQuery = () => {
  const router = useRouter();

  // GET request
  const {
    data,
    isLoading,
    isError: isGetError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPost,
  });

  // POST request
  const {
    mutate,
    data: postData,
    isPending,
    isSuccess,
    isError: isPostError,
    error,
  } = useMutation({
    mutationFn: addPost,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TanStack Query</Text>
      <Text style={styles.subtitle}>Users List</Text>

      <Button
        title={isPending ? "Adding User..." : "Add User"}
        onPress={() => mutate()}
        disabled={isPending}
      />

      {isPending && <Text style={styles.message}>Posting user...</Text>}

      {isSuccess && (
        <Text style={styles.message}>POST successful! ID: {postData?.id}</Text>
      )}

      {isPostError && (
        <Text style={styles.message}>POST failed: {error.message}</Text>
      )}

      {isLoading ? (
        <Text style={styles.message}>Loading users...</Text>
      ) : isGetError ? (
        <Text style={styles.message}>Failed to load users.</Text>
      ) : (
        <Button
          title="See Response"
          onPress={() => router.push("./TanStackQuery2")}
        />
      )}
    </View>
  );
};

export default TanStackQuery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4a4a4a",
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#A0AEC0",
    fontSize: 15,
    marginTop: 6,
    marginBottom: 20,
  },
  message: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 20,
  },
});
