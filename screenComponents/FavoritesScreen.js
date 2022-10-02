import { View, Text, StyleSheet, ScrollView, Pressable, Alert, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieBanner from '../components/MovieBanner';
import { useState, useEffect } from 'react';

export default function FavoritesScreen({ navigation }) {
    const [loading, setLoading] = useState(true); 
    const [favMovies, setFavMovies] = useState({});

    const MOVIE_KEY = "@movie_Key";

    const getFavorites = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(MOVIE_KEY);
            setFavMovies(jsonValue != null ? JSON.parse(jsonValue) : null);
        } catch(e) {
            alert(`${e}`);
        }
    }

    const saveFavorites = async (movieObj) => {
        try {
            const jsonValue = JSON.stringify(movieObj);
            await AsyncStorage.setItem(MOVIE_KEY, jsonValue);
          } catch (e) {
            alert(`${title}: ${e}`);
          }
    }

    const alertBeforeDelete = (movieKeyToDelete) => {
        Alert.alert(
            "Remove from Favorites", 
            `Removing "${favMovies[movieKeyToDelete].title}"`,
            [
              {
                text: "Cancel",
              },
              {
                text: "Delete",
                onPress: async () => deleteFavorite(movieKeyToDelete),
                style: "destructive",
              }
            ]
          );
    }

    const deleteFavorite = async (movieKey) => {
        const newFavs = {...favMovies}
        delete newFavs[movieKey];
        setFavMovies(newFavs);
        await saveFavorites(newFavs);
    }

    const renderFavorites = () => {
        return (loading ? 
            (<View><Text>Loading...</Text></View>) :
            (<View style={styles.container}>
                <ScrollView>
                    {
                        Object.keys(favMovies).map((movieKey) =>
                            <Pressable 
                                key={movieKey}
                                onLongPress={() => alertBeforeDelete(movieKey)}>
                                <MovieBanner title={favMovies[movieKey].title} poster={favMovies[movieKey].poster} />
                            </Pressable>
                        )
                    }
                </ScrollView>
            </View>)
        )
    }

    useEffect(
        () => {
            getFavorites();
            setLoading(false);
        }, []
    )

    useEffect(
        () => {
            renderFavorites()
        }, [favMovies]
    )

    return renderFavorites();
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141414",
    },
})