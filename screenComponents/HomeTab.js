import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import FavoritesScreen from "./FavoritesScreen";
import RecentlyWatchedScreen from "./RecentlyWatchedScreen";
import SearchScreen from "./SearchScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const iconObj = {
  HomeStack: ["home", "home-outline"],
  Favorites: ["heart", "heart-outline"],
  "Recently Watched": ["time", "time-outline"],
  Search: ["ios-search", "ios-search-outline"],
};

export default function HomeTab() {
  const screenStyles = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const iconName = focused
        ? iconObj[route.name][0]
        : iconObj[route.name][1];
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "#f2cc00",
    tabBarInactiveTintColor: "#f2cc00",
    tabBarStyle: {
      backgroundColor: "#97252B",
      borderTopWidth: 0,
    },
    headerStyle: {
      backgroundColor: "#97252B",
      borderTopWidth: 0,
    },
  });

  const screenHeaderStyles = {
    headerTitleStyle: {
      color: "white",
      fontSize: 35,
      fontFamily: "BebasNeue",
    },
    headerStyle: {
      backgroundColor: "#97252B",
      shadowOffset: {
        height: 0,
      },
    },
  };

  return (
    <Tab.Navigator screenOptions={screenStyles}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={screenHeaderStyles}
      />
      <Tab.Screen
        name="Recently Watched"
        component={RecentlyWatchedScreen}
        options={screenHeaderStyles}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={screenHeaderStyles}
      />
    </Tab.Navigator>
  );
}
