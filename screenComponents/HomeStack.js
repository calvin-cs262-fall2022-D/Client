import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import DocumentationScreen from "./DocumentationScreen";
import whiteLogo from "../assets/whiteLogo.png";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const navigation = useNavigation();

  const homeHeader = {
    headerStyle: {
      backgroundColor: "#97252B",
      shadowOffset: {
        height: 0,
      },
    },
    // Put the Knightflix logo on the header
    headerTitle: () => (
      <Image source={whiteLogo} style={styles.whiteLogo}></Image>
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Documentation");
        }}
      >
        <FontAwesome name="question-circle-o" size={30} color="#fff" />
      </TouchableOpacity>
    ),
    title: "Home",
  };

  const documentationHeader = ({ navigation }) => ({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Ionicons name="arrow-back-outline" size={30} color="#f2cc00" />
      </TouchableOpacity>
    ),
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
  });
  return (
    // Link each screen to its corrosponding component
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={homeHeader} />
      <Stack.Screen
        name="Documentation"
        component={DocumentationScreen}
        options={documentationHeader}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Style the Knightflix logo
  whiteLogo: {
    width: 120,
    height: 32,
  },
});
