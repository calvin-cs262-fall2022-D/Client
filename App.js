import { NavigationContainer } from '@react-navigation/native';
import whiteLogo from './assets/whiteLogo.png';
import { StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screenComponents/HomeScreen';
import SearchScreen from './screenComponents/SearchScreen';
import FavoritesScreen from './screenComponents/FavoritesScreen';
import DownloadsScreen from './screenComponents/DownloadsScreen';

const Tab = createBottomTabNavigator();

const iconObj = {
  'Home': ['home', 'home-outline'],
  'Favorites': ['heart', 'heart-outline'],
  'Downloads': ['download', 'download-outline'],
  'Search': ['ios-search', 'ios-search-outline'],
}

export default function App({ navigation }) {

  const screenStyles = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const iconName = focused ? iconObj[route.name][0] : iconObj[route.name][1];
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#f2cc00',
    tabBarInactiveTintColor: '#f2cc00',
    tabBarStyle: {backgroundColor: "#97252B"},
    headerStyle: {
      backgroundColor: "#97252B",
    }
  })

  const screenHeaderStyles = {
    headerTitleStyle: {
      color: "#f2cc00",
      fontSize: "40",
    }
  }

  const homeHeaderStyles = {
    headerTitle: "",
    headerStyle: {
      backgroundColor: "#97252B",
    },
    headerLeft: () => <Image source={whiteLogo} style={styles.whiteLogo}></Image>,
  }

  return (
    <NavigationContainer style={styles.container}>
        {/**<View style={styles.header}>
          <Image source={whiteLogo} style={styles.whiteLogo}/>
  </View>*/}

      <Tab.Navigator screenOptions={screenStyles} >
        <Tab.Screen name="Home" component={HomeScreen} options={homeHeaderStyles}/>
        <Tab.Screen name="Favorites" component={FavoritesScreen} options={screenHeaderStyles} />
        <Tab.Screen name="Downloads" component={DownloadsScreen} options={screenHeaderStyles} />
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
  whiteLogo: {
    alignItems: "center",
    width: 120,
    height: 32,
    marginHorizontal: 145,
    marginBottom: 10,
  },
});
