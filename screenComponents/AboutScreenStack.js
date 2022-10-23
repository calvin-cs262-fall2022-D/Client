import * as React from 'react';
import { View, Text, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import whiteLogo from '../assets/whiteLogo.png';
import DisplayScreen from './DisplayScreen';
//import DisplayScreen from './DisplayScreen.js;'

const Stack = createNativeStackNavigator();

export default function AboutScreenStack() {
    return (

        <Stack.Navigator>
        <Stack.Screen name="About" component={AboutScreen} options={ {headerShown: false} }/>
        <Stack.Screen name="Display" component={DisplayScreen} options={ {headerShown: false} }/>
      </Stack.Navigator>
    )
}