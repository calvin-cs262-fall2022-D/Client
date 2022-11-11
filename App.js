import { NavigationContainer } from '@react-navigation/native';
import HomeTab from './screenComponents/HomeTab';
import AboutScreen from './screenComponents/AboutScreen';
import DisplayScreen from './screenComponents/DisplayScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  const aboutHeaderStyles = {
    headerTitleStyle: {
      color: "white",
      fontSize: 35,
      fontFamily: 'BebasNeue',
    },
    headerStyle: {
      backgroundColor: "#97252B",
    },
    headerTintColor: "#f2cc00",
  }

  const displayHeaderStyles = ({ route }) => ({
    headerTitleStyle: {
      color: "white",
      fontSize: 25,
      fontFamily: 'BebasNeue',
    },
    headerStyle: {
      backgroundColor: "#97252B",
    },
    headerTintColor: "#f2cc00",
    title: route.params.title,
  })

  return (
    // Link each screen to its corrosponding component
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeTabs" component={HomeTab} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={AboutScreen} options={aboutHeaderStyles} />
        <Stack.Screen name="Display" component={DisplayScreen} options={displayHeaderStyles} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}