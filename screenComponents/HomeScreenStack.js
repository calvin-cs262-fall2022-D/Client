import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';

const Stack = createNativeStackNavigator();

export default function HomeScreenStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="About" component={AboutScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}
