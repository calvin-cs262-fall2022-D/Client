import Semester from '../components/Semester';
import { useFonts } from 'expo-font';
import { StyleSheet, View, ScrollView, Button } from 'react-native';
import { movies } from "../data/movies";

export default function HomeScreen() {
  // Load in the fonts
  const [fontsLoaded] = useFonts({
    'BebasNeue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Fjalla': require('../assets/fonts/FjallaOne-Regular.ttf')
  });

  return (!fontsLoaded ? null :
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
  },
  verticalScroll: {
    backgroundColor: "#141414",
    flex: 10,
  },
});
