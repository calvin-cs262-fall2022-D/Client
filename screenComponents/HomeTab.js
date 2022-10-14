import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import FavoritesScreen from './FavoritesScreen';
import RecentlyWatchedScreen from './RecentlyWatchedScreen';
import SearchScreen from './SearchScreen';
import { Ionicons } from '@expo/vector-icons';
import whiteLogo from '../assets/whiteLogo.png';

const Tab = createBottomTabNavigator();

const iconObj = {
    'Home': ['home', 'home-outline'],
    'Favorites': ['heart', 'heart-outline'],
    'Recently Watched': ['time', 'time-outline'],
    'Search': ['ios-search', 'ios-search-outline'],
  }

export default function HomeTab() {

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
    

    const homeHeaderStyles = {
        headerStyle: {
          backgroundColor: "#97252B",
        },
        // Put the Knightflix logo on the header
        headerTitle: () => <Image source={whiteLogo} style={styles.whiteLogo}></Image>,
        title: "Home",
    }

    const screenHeaderStyles = {
        headerTitleStyle: {
          color: "white",
          fontSize: 35,
          fontFamily: 'BebasNeue',
        }
    }

    return (
        <Tab.Navigator screenOptions={screenStyles}>
            <Tab.Screen name="Home" component={HomeScreen} options={homeHeaderStyles}/>
            <Tab.Screen name="Favorites" component={FavoritesScreen} options={screenHeaderStyles} />
            <Tab.Screen name="Recently Watched" component={RecentlyWatchedScreen} options={screenHeaderStyles} />
            <Tab.Screen name="Search" component={SearchScreen} options={screenHeaderStyles} />
        </Tab.Navigator>
    )
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
});