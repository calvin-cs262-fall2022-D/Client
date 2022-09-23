import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DownloadsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <Text style={styles.content}>This is the Downloads page</Text>
            </View>
            <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                  <Ionicons name="home" size={40} color="#f2cc00" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
                  <Ionicons name="heart" size={40} color="#f2cc00" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Downloads")}>
                  <Ionicons name="download" size={40} color="#f2cc00" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                  <Ionicons name="md-search" size={40} color="#f2cc00" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  listContainer: {
      flex: 10,
      backgroundColor: "#000",
      justifyContent: "center",
      alignItems: "center",
  },
  navigationContainer: {
      flex: 1,
      backgroundColor: "#97252B",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around"
  },
  content: {
      color: "#f2cc00",
      fontSize: 30,
      textAlign: "center"
  }
})