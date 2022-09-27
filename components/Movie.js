import {useFonts} from 'expo-font';
//import megamind from '../assets/posters/megamind.jpg';
import {
    Image,
        StyleSheet,
        Text,
        View,
      } from 'react-native';

export default function Movie() {
    const [fontsLoaded] = useFonts({
        'BebasNeue': require('../assets/fonts/BebasNeue-Regular.ttf'),
        'Fjalla' : require('../assets/fonts/FjallaOne-Regular.ttf')
    });


    return (
        <View style={styles.container}>
            <View style={styles.posterContainer}>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Movie Title</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
    },
    posterContainer: {
        backgroundColor: "#fff",
        height: 285,
        width: 225,
        marginBottom: 15
    },
    titleContainer: {
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    titleText: {
        fontSize: 19,
        fontStyle: "italic",
        fontFamily: 'Fjalla',
        color: "#fff"
    },
    posters: {
        width: 225,
        height: 285,
    }
})