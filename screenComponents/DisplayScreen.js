import { View, Text, StyleSheet, } from 'react-native';
import WebView from 'react-native-webview';
import {Vimeo} from 'react-native-vimeo-iframe';

export default function DisplayScreen() {
  const videoCallbacks = {
    timeupdate: (data) => console.log('timeupdate: ', data),
    play: (data) => console.log('play: ', data),
    pause: (data) => console.log('pause: ', data),
    fullscreenchange: (data) => console.log('fullscreenchange: ', data),
    ended: (data) => console.log('ended: ', data),
    controlschange: (data) => console.log('controlschange: ', data),
  };
    return (
        <View style={styles.container}>
            <Vimeo style={styles.vimeo}
            videoId={'208159015'}
            params={'api=1&autoplay=0'}
            handlers={videoCallbacks}
          />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    content: {
        color: "#f2cc00",
        fontSize: 30,
        textAlign: "center",
        fontFamily: "Fjalla",
    },
    vimeo: {
      backgroundColor: "#fff",
    }
})