import { useFonts } from "expo-font";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Movie(props) {
  const [fontsLoaded] = useFonts({
    BebasNeue: require("../assets/fonts/BebasNeue-Regular.ttf"),
    Fjalla: require("../assets/fonts/FjallaOne-Regular.ttf"),
  });

  const navigation = useNavigation();

  //console.log({ props });

  const imageURI = props.poster;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("About", {
            title: props.title,
            poster: imageURI,
            videoId: props.videoId,
            course: props.course,
            description: props.description,
          })
        }
      >
        <Image style={styles.poster} source={{ uri: imageURI }}></Image>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    width: 225,
  },
  poster: {
    backgroundColor: "#fff",
    height: 285,
    width: "100%",
  },
  titleContainer: {
    height: 60,
    padding: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  titleText: {
    fontSize: 18,
    fontStyle: "italic",
    fontFamily: "Fjalla",
    color: "#fff",
    flex: 1,
    flexWrap: "wrap",
    textAlign: "center",
  },
});
