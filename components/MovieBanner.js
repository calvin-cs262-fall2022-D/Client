import { useFonts } from "expo-font";
import { StyleSheet, Text, View, Image } from "react-native";

export default function MovieBanner(props) {
  const [fontsLoaded] = useFonts({
    BebasNeue: require("../assets/fonts/BebasNeue-Regular.ttf"),
    Fjalla: require("../assets/fonts/FjallaOne-Regular.ttf"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.flexWrapper}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageContent} source={{ uri: props.poster }} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{props.title}</Text>
          </View>
          <Text style={styles.directorText}>{props.course.toUpperCase()}</Text>
          <Text style={styles.descriptionText}>{props.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  flexWrapper: {
    height: "100%",
    flexDirection: "row",
  },
  imageContainer: {
    flex: 1.3,
  },
  imageContent: {
    borderRadius: 20,
    flex: 1,
    padding: 15,
  },
  textContainer: {
    borderRadius: 20,
    backgroundColor: "#ffffff",
    flex: 2,
    padding: 15,
    justifyContent: "space-around",
  },
  titleContainer: {
    flex: 1.7,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "700",
  },
  directorText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
  },
  descriptionText: {
    flex: 2,
  },
});
