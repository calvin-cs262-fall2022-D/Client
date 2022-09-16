import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import icon from './assets/icon.png';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={icon} style={{ width: 305, height: 159 }} />
      <Text>Welcome to Knightflix!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
