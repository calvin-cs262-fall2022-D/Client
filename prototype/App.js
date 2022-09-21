import { StatusBar } from 'expo-status-bar';
import Semester from './components/Semester';
import wayfinder from './assets/wayfinder.png';
import whiteLogo from './assets/whiteLogo.png';
import {useFonts} from 'expo-font';
import { Image,
        StyleSheet,
        Text,
        View,
        ScrollView,
        TextInput,
        KeyboardAvoidingView
      } from 'react-native';


export default function App() {
  const [fontsLoaded] = useFonts({
    'BebasNeue': require('./assets/fonts/BebasNeue-Regular.ttf'),
  });

  return (
    <View style={styles.container}>
      {/* logo at top right of screen */}
      {/** search bar */}
      <View style={styles.searchBar}>
      <Image source={whiteLogo} style={styles.whiteLogo}/>
        <TextInput
          style={styles.textInput}
          placeholder="  What are you looking for?"
        ></TextInput>
      </View>

      {/** movie posters */}
      <View style={styles.verticalScroll}>
        <ScrollView>
          <Semester text="Fall 2022"></Semester>
          <Semester text="Spring 2022"></Semester>
          <Semester text="Fall 2021"></Semester>
          <Semester text="Spring 2021"></Semester>
          <Semester text="Fall 2020"></Semester>
        </ScrollView>
      </View>


      {/** navigation */}
      <View style={styles.navigation}>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: "#97252B",
    flex: 1.5,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  textInput: {
    backgroundColor: "#fff",
    height: "30%",
    alignContent: "center",
    height: "40%",
    borderRadius: 20,
    marginTop: 50,
    marginLeft: 10,
  },
  verticalScroll: {
    backgroundColor: "#000",
    flex: 10,
  },
  horizontalScroll: {
    flex: 1,
    borderColor: "red",
    borderWidth: 2,
  },
  navigation: {
    flex: 1.2,
    backgroundColor: "#97252B"
  },
  whiteLogo: {
    position: 'relative',
    marginLeft: 15,
    width: 75,
    height: 20,
    backgroundColor: "#97252B",

  }
});
