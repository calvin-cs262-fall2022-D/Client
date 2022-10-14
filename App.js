import { NavigationContainer } from '@react-navigation/native';
import whiteLogo from './assets/whiteLogo.png';
import { StyleSheet, Image, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreenStack from './screenComponents/HomeScreenStack';
import SearchScreen from './screenComponents/SearchScreen';
import FavoritesScreen from './screenComponents/FavoritesScreen';
import RecentlyWatchedScreen from './screenComponents/RecentlyWatchedScreen';
import DisplayScreen from './screenComponents/DisplayScreen';

const Tab = createBottomTabNavigator();

// Create an object for each screen in the app
const iconObj = {
  'HomeStack': ['home', 'home-outline'],
  'Favorites': ['heart', 'heart-outline'],
  'Recently Watched': ['time', 'time-outline'],
  'Search': ['ios-search', 'ios-search-outline'],
}

export default function App() {

  // Instigate and style the tab bar, and plan the routes for each one
  const screenStyles = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const iconName = focused ? iconObj[route.name][0] : iconObj[route.name][1];
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#f2cc00',
    tabBarInactiveTintColor: '#f2cc00',
    tabBarStyle: { backgroundColor: "#97252B" },
    headerStyle: {
      backgroundColor: "#97252B",
    }
  })

  const screenHeaderStyles = {
    headerTitleStyle: {
      color: "white",
      fontSize: 35,
      fontFamily: 'BebasNeue',
    }
  }

  const favHeaderStyles = {
    headerRight: () => <Button title="hi"></Button>
  }

  const homeHeaderStyles = {
    headerStyle: {
      backgroundColor: "#97252B",
    },
    // Put the Knightflix logo on the header
    headerTitle: () => <Image source={whiteLogo} style={styles.whiteLogo}></Image>,
    title: "Home",
  }

  return (
    // Link each screen to its corrosponding component
    <NavigationContainer style={styles.container}>
      <Tab.Navigator screenOptions={screenStyles} >
        <Tab.Screen name="HomeStack" component={HomeScreenStack} options={homeHeaderStyles} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} options={screenHeaderStyles} />
        <Tab.Screen name="Recently Watched" component={RecentlyWatchedScreen} options={screenHeaderStyles} />
        <Tab.Screen name="Search" component={SearchScreen} options={screenHeaderStyles} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Style the Knightflix logo
  whiteLogo: {
    width: 120,
    height: 32,
  },
  backButton: {
    backgroundColor: "#97252B",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 0,
    zIndex: 3,
    bottom: 50,
},
backImage: {
    //padding: 10,
    //borderRadius: 20,
    //flexDirection: "row",
    width: 30,
    height: 30,
    justifyContent: "space-between",

}
});