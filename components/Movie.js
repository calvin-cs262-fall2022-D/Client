import {useFonts} from 'expo-font';
import {
        StyleSheet,
        Text,
        View,
        Image,
        TouchableOpacity
      } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Movie(props) {
    const [fontsLoaded] = useFonts({
        'BebasNeue': require('../assets/fonts/BebasNeue-Regular.ttf'),
        'Fjalla' : require('../assets/fonts/FjallaOne-Regular.ttf')
    });

    const navigation = useNavigation(); 

    const imageURI = props.poster;
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("About")}>
                <Image style={styles.poster} source={{uri: imageURI}}></Image>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{props.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
    },
    poster: {
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
    }
})