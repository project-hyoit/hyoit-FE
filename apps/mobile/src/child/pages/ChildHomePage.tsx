import { StyleSheet, Text, View } from "react-native";

export default function ChildHomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Child Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
  },
});
