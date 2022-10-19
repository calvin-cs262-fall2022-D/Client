import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

export default function AboutScreen({ route }) {
    const [favorites, setFavorites] = useState({});
    const [recentlyWatched, setRecentlyWatched] = useState({});
    const [isLiked, setIsLiked] = useState(false);

    const navigation = useNavigation();

    const { title, poster, videoId } = route.params;
    const FAVORITES_KEY = "@favorites_Key";
    const RECENTS_KEY = "@recents_Key";
    const animation = React.useRef(null);


    // useFocusEffect(
    //     useCallback(() => {
    //         if (isLiked) {
    //             animation.current.play(103, 104);
    //         } else {
    //             animation.current.play(8, 10);
    //         }
    //     }
    //     )
    // )


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
            // play unfavoriting animation
            animation.current.play(94, 180);
            // delete the movie from your favorites
            const newFavs = { ...favorites };
            const movieToDelete = Object.values(favorites).find(item => item.title === title);
            const movieKey = Object.keys(favorites).find(key => favorites[key] === movieToDelete);
            delete newFavs[movieKey];
            setFavorites(newFavs);
            await saveFavorites(newFavs);
            setIsLiked(false);
        } else {
            // play favoriting animation
            animation.current.play(10, 104);
            // add movie to favorites
            const newFavs = { ...favorites, [Date.now()]: favMovie };
            setFavorites(newFavs);
            await saveFavorites(newFavs);
            setIsLiked(true);
        }
    }

    // const alertBeforeAdd = () => {
    //     Alert.alert(
    //         "Adding to Favorites",
    //         `Adding ${title} to favorites`,
    //         [
    //             {
    //                 text: "Cancel",
    //                 style: "cancel",
    //             },
    //             {
    //                 text: "Add",
    //                 onPress: () => addFavorites(),
    //                 style: "default",
    //             }
    //         ]
    //     )
    // }

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
                    onPress={addFavorites}>
                    <View style={styles.favoritesWrapper}>
                        <View style={{ justifyContent: "center" }}>
                            <Text style={styles.buttonText}>
                                Favorite
                                {/* <Ionicons name="heart" size={24} color="#fff"> */}
                            </Text>
                        </View>
                        <View style={styles.lottieWrapper}>
                            <LottieView style={styles.heartLottie}
                                ref={animation}
                                source={require('../assets/lottie/like.json')}
                                loop={false}
                                autoPlay={false}>
                            </LottieView>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={playMovie}>
                    <Text style={styles.buttonText}>
                        Play <Ionicons name="play" size={24} color="#fff" />
                    </Text>
                </TouchableOpacity>
            </View >
        </View >


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
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    favoritesWrapper: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    lottieWrapper: {
        justifyContent: "space-evenly",
        margin: -15,
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
        margin: 28,
    },
    buttonText: {
        color: "#fff",
        fontFamily: "Fjalla",
        fontSize: 20,
        justifyContent: "center",
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
        width: 40,
        height: 40,
        justifyContent: "space-between",

    },
    heartLottie: {
        width: 75,
        height: 75,
    }
})