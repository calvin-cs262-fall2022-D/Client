import { View, Text, StyleSheet } from "react-native";

export default function DownloadsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.content}>This is the Downloads page</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 10,
    backgroundColor: "#141414",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    color: "#f2cc00",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Fjalla",
  },
});
