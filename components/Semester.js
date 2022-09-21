import { StatusBar } from 'expo-status-bar';
import Movie from './Movie';
import {useFonts} from 'expo-font';
import { Image,
        StyleSheet,
        Text,
        View,
        ScrollView,
        TextInput,
        KeyboardAvoidingView
      } from 'react-native';

export default function Semester(prop) {
    // const [fontsLoaded] = useFonts({
    //     'BebasNeue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    //     'Fjalla' : require('../assets/fonts/FjallaOne-Regular.ttf')
    // });
    return (
        <View style={styles.container}>
            <View style={styles.sectionHeading}>
                <Text style={styles.sectionHeadingText}>{prop.text}</Text>
            </View>
            <View style={styles.movieList}>
                <ScrollView horizontal={true}>
                    <Movie></Movie>
                    <Movie></Movie>
                    <Movie></Movie>
                    <Movie></Movie>
                    <Movie></Movie>
                    <Movie></Movie>
                    <Movie></Movie>
                    <Movie></Movie>
                    <Movie></Movie>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 400,
        backgroundColor: "12345",
    },
    sectionHeading: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        paddingLeft: 30,
    },
    sectionHeadingText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#ECC409",
        fontFamily: "Fjalla"
    },
    movieList: {
        flex: 6,
        backgroundColor: "#000",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
    }
})