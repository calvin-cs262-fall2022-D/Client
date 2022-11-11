import { View, StyleSheet } from "react-native";
import { Vimeo } from "react-native-vimeo-iframe";

// displays Vimeo player in the dispay screen
export default function DisplayScreen({ route }) {
  const { videoId } = route.params;
  const videoCallbacks = {
    timeupdate: (data) => console.log("timeupdate: ", data),
    play: (data) => console.log("play: ", data),
    pause: (data) => console.log("pause: ", data),
    fullscreenchange: (data) => console.log("fullscreenchange: ", data),
    ended: (data) => console.log("ended: ", data),
    controlschange: (data) => console.log("controlschange: ", data),
  };
  return (
    <View style={styles.container}>
      <Vimeo
        style={styles.vimeo}
        videoId={videoId}
        params={"api=1&autoplay=0"}
        handlers={videoCallbacks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    color: "#f2cc00",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Fjalla",
  },
  vimeo: {
    backgroundColor: "#000",
  },
});
