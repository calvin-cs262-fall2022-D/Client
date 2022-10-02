import {useFonts} from 'expo-font';
import {
        StyleSheet,
        Text,
        View,
        Image,
        TouchableOpacity
      } from 'react-native';


export default function MovieBanner(props) {
    const [fontsLoaded] = useFonts({
        'BebasNeue': require('../assets/fonts/BebasNeue-Regular.ttf'),
        'Fjalla' : require('../assets/fonts/FjallaOne-Regular.ttf')
    });


    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.flexWrapper}>
                <View style={styles.imageContainer}>
                    <Image style={styles.imageContent} source={{uri: props.poster}}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{props.title}</Text>
                    <Text style={styles.directorText}>Director</Text>
                    <Text style={styles.descriptionText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        marginHorizontal: 15,
        marginVertical: 5,
    },
    flexWrapper: {
        height: "100%",
        flexDirection: "row",
    },
    imageContainer: {
        flex: 1.3,
    },
    imageContent: {
        borderRadius: 20,
        flex: 1,
        padding: 15,
    },
    textContainer: {
        borderRadius: 20,
        backgroundColor: "#ffffff",
        flex: 2,
        padding: 15,
        justifyContent: 'space-around',
    },
    titleText: {
        fontSize: 24,
        fontWeight: "700",
    },
    directorText: {
        fontSize: 18, 
        fontWeight: "600",
    },
})
