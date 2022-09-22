import Semester from '../components/Semester';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useCallback} from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({navigation}) {
    const [fontsLoaded] = useFonts({
      'BebasNeue': require('../assets/fonts/BebasNeue-Regular.ttf'),
      'Fjalla' : require('../assets/fonts/FjallaOne-Regular.ttf')
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
      setAppIsReady(true);
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.verticalScroll}>
          <ScrollView>
            <Semester text="Fall 2022"></Semester>
            <Semester text="Spring 2022"></Semester>
            <Semester text="Fall 2021"></Semester>
            <Semester text="Spring 2021"></Semester>
            <Semester text="Fall 2020"></Semester>
          </ScrollView>
        </View>
        <View style={styles.navigation}>
          <TouchableOpacity>
            <Ionicons name="home" size={40} color="#f2cc00" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="heart" size={40} color="#f2cc00" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="download" size={40} color="#f2cc00" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Ionicons name="md-search" size={40} color="#f2cc00" />
          </TouchableOpacity>
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
    backgroundColor: "#000",
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
  