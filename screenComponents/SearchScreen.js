import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function SearchScreen() {
    return (
        // Set up the search input
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
                <TouchableOpacity onPress={showSearchInfo}>
                    <View style={styles.suggestionBanner}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.poster} source={{ uri: "https://i.vimeocdn.com/video/623408857-9ed08834cb46cde1b9b1a28f7915f9b69035e828f667ae079ff35e5125189ce4-d_1920x1080" }}></Image>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText}>ObstructSean</Text>
                            <Text style={styles.directorText}>Michael Ribbens</Text>
                            <Text style={styles.descriptionText}>
                                ObstructSean tells the tale of an unfortunate protagonist, Sean. He seems to get stopped, blocked, and obstructed at every turn. Why can't Sean just have a normal life?
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {/* Data for each student film */}
                <TouchableOpacity onPress={showSearchInfo}>
                    <View style={styles.suggestionBanner}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.poster} source={{ uri: "https://i.vimeocdn.com/video/626019415-241412f021ef833dcd5399ad03bd689cbbe041774d11e627b85413b9e7f01baf-d_1920x1080" }}></Image>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText}>Significant Others</Text>
                            <Text style={styles.directorText}>Andrew Pruim</Text>
                            <Text style={styles.descriptionText}>
                                Relationships. Heartbreak. Passion. This story asks the question: How do you successfully live with another person?
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={showSearchInfo}>
                    <View style={styles.suggestionBanner}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.poster} source={{ uri: "https://i.vimeocdn.com/video/626019221-f6fe572940b55fde70d601651b6de8d5a0d34b812591c5d4d13eb953351f3d0e-d_1920x1080" }}></Image>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText}>Renardo</Text>
                            <Text style={styles.directorText}>Nate Roels</Text>
                            <Text style={styles.descriptionText}>
                                Who is Renardo? Why is Renardo? Renardo could be a person. Renardo could be a place. Most importantly, Renardo could simply be a feeling.
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
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
        fontSize: 29,
        fontWeight: "700",
        paddingBottom: 2,
    },
    directorText: {
        fontSize: 20,
        color: 'gray',
        fontWeight: "600",
        paddingBottom: 3,
    },
    navigation: {
        flex: .12,
        backgroundColor: "#97252B",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    poster: {
        backgroundColor: "#fff",
        height: 270,
        width: 192,
        right: 40,
        borderRadius: 15,
    },
})