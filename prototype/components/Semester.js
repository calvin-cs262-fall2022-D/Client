import { StatusBar } from 'expo-status-bar';
import Movie from './Movie';
// import fonts from './assets/fonts';
import { Image,
        StyleSheet,
        Text,
        View,
        ScrollView,
        TextInput,
        KeyboardAvoidingView
      } from 'react-native';

export default function Semester(prop) {
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
        paddingLeft: 20,
    },
    sectionHeadingText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#ECC409",
        fontFamily: "Arial"
    },
    movieList: {
        flex: 6,
        backgroundColor: "#000",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
    }
})