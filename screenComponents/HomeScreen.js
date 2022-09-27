import Semester from '../components/Semester';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { StyleSheet, View, ScrollView, } from 'react-native';
import { movies } from "../movies";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    'BebasNeue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Fjalla': require('../assets/fonts/FjallaOne-Regular.ttf')
  });

  //setting up custom fonts
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      setAppIsReady(true);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.verticalScroll}>
        <ScrollView>
            {
              Object.keys(movies).map((item, idx) => 
                <Semester key={idx} text={item} movieData={movies[item]} />
              )
            }
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  verticalScroll: {
    backgroundColor: "#141414",
    flex: 10,
  },
  navigation: {
    flex: 1,
    backgroundColor: "#97252B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
});
