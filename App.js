import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './screenComponents/HomeScreen';
import SearchScreen from './screenComponents/SearchScreen';
import whiteLogo from './assets/whiteLogo.png';
import { StyleSheet, View, Image } from 'react-native';
import FavoritesScreen from './screenComponents/FavoritesScreen';
import DownloadsScreen from './screenComponents/DownloadsScreen';



const Stack = createNativeStackNavigator();

export default function App({navigation}) {

  return (
    <NavigationContainer style={styles.container}>
        <View style={styles.header}>
          <Image source={whiteLogo} style={styles.whiteLogo}/>
        </View>

      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Downloads" component={DownloadsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  whiteLogo: {
    backgroundColor: "#97252B",
    alignItems: "center",
    width: 112.5,
    height: 30,
  },
  header: {
    backgroundColor: "#97252B",
    alignItems: "center",
    flex: .05,
    paddingTop: 40,
  },
});
