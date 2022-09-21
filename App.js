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
      } from 'react-native';


export default function App() {
  const [fontsLoaded] = useFonts({
    'BebasNeue': require('./assets/fonts/BebasNeue-Regular.ttf'),
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/** logo at the top */}
        <Image source={whiteLogo} style={styles.whiteLogo}/>
        {/** search bar */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.textInput}
            placeholder="  What are you looking for?"
          ></TextInput>
        </View>
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
  header: {
    backgroundColor: "#97252B",
    alignItems: "center",
    flex: 1.5,
    paddingTop: 40,
  },
  searchBar: {
    backgroundColor: "#97252B",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textInput: {
    backgroundColor: "#fff",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginLeft: 10,
  },
  verticalScroll: {
    backgroundColor: "#000",
    flex: 10,
  },
  navigation: {
    flex: 1.2,
    backgroundColor: "#97252B"
  },
  whiteLogo: {
    backgroundColor: "#97252B",
    alignItems: "center",
    width: 75,
    height: 20,
  },

});
