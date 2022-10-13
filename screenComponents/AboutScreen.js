import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function AboutScreen({ route }) {
    const [favorites, setFavorites] = useState({});
    const [recentlyWatched, setRecentlyWatched] = useState({});

    const navigation = useNavigation();

    const { title, poster } = route.params;
    const FAVORITES_KEY = "@favorites_Key";
    const RECENTS_KEY = "@recents_Key";

    // Save what movies you favorite
    const saveFavorites = async (movieObj) => {
        try {
            const jsonValue = JSON.stringify(movieObj);
            await AsyncStorage.setItem(FAVORITES_KEY, jsonValue);
        } catch (e) {
            alert(`${title}: ${e}`);
        }
    }

    const addFavorites = async () => {
        const favMovie = { title: title, poster: poster };

        // prevent duplicate favorites
        // aellxx: ternary operator didn't work
        if (Object.values(favorites).find(item => item.title === title)) {
            alert(`"${title}" already exists in favorites`);
            return;
        } else {
            const newFavs = { ...favorites, [Date.now()]: favMovie };
            setFavorites(newFavs);
            await saveFavorites(newFavs);
        }
    }

    const alertBeforeAdd = () => {
        Alert.alert(
            "Adding to Favorites",
            `Adding ${title} to favorites`,
            [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Add",
                  onPress: () => addFavorites(),
                  style: "default",
                }
              ]
        )
    }

    // Save what movies you favorite
    const saveRecents = async (movieObj) => {
        try {
            const jsonValue = JSON.stringify(movieObj);
            await AsyncStorage.setItem(RECENTS_KEY, jsonValue);
        } catch (e) {
            alert(`${title}: ${e}`);
        }
    }

    const addRecents = async () => {
        const recentMovie = { title: title, poster: poster };

        // prevent duplicate favorites
        // aellxx: ternary operator didn't work
        if (Object.values(recentlyWatched).find(item => item.title === title)) {
            return;
        } else {
            const newRecents = { ...recentlyWatched, [Date.now()]: recentMovie };
            setRecentlyWatched(newRecents);
            await saveRecents(newRecents);
        }
    }

    useEffect(
        // Use aysnc memory to remember what videos people have favorited
        () => {
            const loadInfo = async () => {
                try {
                    const favJsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
                    const recentJsonValue = await AsyncStorage.getItem(RECENTS_KEY);
                    setFavorites(favJsonValue != null ? JSON.parse(favJsonValue) : {});
                    setRecentlyWatched(recentJsonValue != null ? JSON.parse(recentJsonValue) : {});
                } catch (e) {
                    alert(`${e}`);
                }
            }
            loadInfo();
        }, []
    )

    return (
        // Place the poster, description, and buttons for adding to favorites and playing the video
        <View style={styles.container}>
{/*             <TouchableOpacity
                    style={styles.backButton}
                    >
                    <Image style={styles.backImage} source={require('../assets/back_button.png')}/>
                </TouchableOpacity>
    */}
            <View style={styles.imageContainer}>
                <Image style={styles.poster} source={{ uri: poster }} />
            </View>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.descriptionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <View style={styles.buttonsWrapper}>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={alertBeforeAdd}>
                    <Text style={styles.buttonText}>Favorites</Text>
                    <Ionicons name="heart" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={addRecents}>
                    <Text style={styles.buttonText}>Play</Text>
                    <Ionicons name="play" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141414",
        alignItems: "center",
        padding: 30,
        justifyContent: "space-around"
    },
    imageContainer: {
        width: 400,
        height: 300,
        alignItems: "center",
    },
    poster: {
        width: "100%",
        height: "100%",
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Fjalla",
        color: "#fff",
    },
    descriptionText: {
        color: "#fff",
    },
    buttonsWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    buttonContainer: {
        backgroundColor: "#97252B",
        padding: 20,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttonText: {
        color: "#fff",
        fontFamily: "Fjalla",
        fontSize: 20,
    },
    backButton: {
        backgroundColor: "#97252B",
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        top: -17,
        right: 170,
        bottom: 50,
    },
    backImage: {
        //padding: 10,
        //borderRadius: 20,
        //flexDirection: "row",
        width: 40,
        height: 40,
        justifyContent: "space-between",

    }
})