import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

export default function AboutScreen({ route }) {
    const [favorites, setFavorites] = useState({});

    const { title, poster } = route.params;
    const MOVIE_KEY = "@movie_Key";

    const saveFavorites = async (movieObj) => {
        try {
            const jsonValue = JSON.stringify(movieObj);
            await AsyncStorage.setItem(MOVIE_KEY, jsonValue);
          } catch (e) {
            alert(`${title}: ${e}`);
          }
    }

    const addFavorites = async () => {
        const favMovie = {title: title, poster: poster};

        // prevent duplicate favorites
        // aellxx: ternary operator didn't work
        console.log(favorites);
        if (Object.values(favorites).find(item => item.title === title)) {
            alert(`"${title}" already exists in favorites`);
            return;
        } else {
            const newFavs = {...favorites, [Date.now()]: favMovie};
            setFavorites(newFavs);
            await saveFavorites(newFavs);
        }
    }

    useEffect(
        () => {
            const loadFavorites = async () => {
                try {
                    const jsonValue = await AsyncStorage.getItem(MOVIE_KEY);
                    setFavorites(jsonValue != null ? JSON.parse(jsonValue) : {});
                } catch(e) {
                    alert(`${e}`);
                }
            }
            loadFavorites();
        }, []
    )

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.poster} source={{uri: poster}} />
            </View>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.descriptionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <View style={styles.buttonsWrapper}>
                <TouchableOpacity 
                    style={styles.buttonContainer}
                    onPress={addFavorites}>
                    <Text style={styles.buttonText}>Favorites</Text>
                    <Ionicons name="heart" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttonContainer}
                    onPress={() => console.log(`${title} added to watch history`)}>
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
    }
})