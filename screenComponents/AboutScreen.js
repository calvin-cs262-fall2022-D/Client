import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function AboutScreen({ route }) {
    const [favorites, setFavorites] = useState({});
    const [recentlyWatched, setRecentlyWatched] = useState({});

    const navigation = useNavigation();

    const { title, poster, videoId } = route.params;
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
        const favMovie = { title: title, poster: poster, videoId: videoId };

        // prevent duplicate favorites
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

    const addRecents = async (movie) => {
        // prevent duplicate favorites
        const alreadyWatchedKey = Object.keys(recentlyWatched).find(key => recentlyWatched[key].title === title);
        console.log(alreadyWatchedKey)
        let newRecents = {...recentlyWatched};

        if (alreadyWatchedKey) {
            delete newRecents[alreadyWatchedKey]
        } 
        newRecents = { ...newRecents, [Date.now()]: movie };
        setRecentlyWatched(newRecents);
        await saveRecents(newRecents);
    }

    const playMovie = async () => {
        const recentMovie = { title: title, poster: poster, videoId: videoId };
        
        await addRecents(recentMovie);
        navigation.navigate("Display", recentMovie);
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
            <View style={styles.imageWrapper}>
                <Image style={styles.poster} source={{ uri: poster }} resizeMode="contain" />
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.descriptionText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </Text>
            </View>
            <View style={styles.buttonsWrapper}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={alertBeforeAdd}>
                    <Text style={styles.buttonText}>
                        Favorites <Ionicons name="heart" size={24} color="#fff" />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={playMovie}>
                    <Text style={styles.buttonText}>
                        Play <Ionicons name="play" size={24} color="#fff" />
                    </Text>
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
        justifyContent: "space-around",
    },
    imageWrapper: {
        flex: 8,
        alignItems: "center",
        flexDirection: "row",
    },
    textWrapper: {
        flex: 4,
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    buttonsWrapper: {
        flex: 3,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    poster: {
        flex: 1,
        height: undefined,
        width: undefined,
        alignSelf: "stretch",
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
    button: {
        backgroundColor: "#97252B",
        padding: 20,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonText: {
        color: "#fff",
        fontFamily: "Fjalla",
        fontSize: 20,
    },
})