import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import MovieBanner from '../components/MovieBanner';

export default function SearchScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInputStyles}
                    placeholder="What are you looking for?"
                    placeholderTextColor={"#000000"}></TextInput>
            </View>
            {/* allows user to scroll through the search page*/}
            <ScrollView style={styles.suggestionContainer}>
              {/* allows user to click search items*/}
                <MovieBanner />
                <MovieBanner />
                <MovieBanner />
            </ScrollView>
        </View>
    )
}
const showSearchInfo = () => {
    console.log('Search was clicked!');
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141414"
    },
    textInputContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 15,
        borderRadius: 20,
        backgroundColor: "#97252B",
    },
    textInputStyles: {
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        opacity: .5,
        borderRadius: 10,
    },
    suggestionContainer: {
        flex: 1,
        marginVertical: 15,
    },
    suggestionBanner: {
        flex: 1,
        marginTop: 5,
        marginHorizontal: 15,
        flexDirection: "row",
    },
    imageContainer: {
        backgroundColor: "rgba(255, 255, 255, .8)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    textContainer: {
        backgroundColor: "#fff",
        flex: 2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
    },
    titleText: {
        fontSize: 30,
        fontWeight: "700"
    },
    directorText: {
        fontSize: 22,
        fontWeight: "600",
    },
    navigation: {
        flex: .12,
        backgroundColor: "#97252B",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
})