import { View, StyleSheet, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import MovieBanner from '../components/MovieBanner';
import { useState, useCallback } from 'react';

export default function FavoritesScreen(props) {
    const [loading, setLoading] = useState(true); 
    const [favMovies, setFavMovies] = useState({});

    const MOVIE_KEY = "@movie_Key";

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

    useFocusEffect(
        // WHENEVER Favorites screen is focused, load Favorite movies from AsyncStorage
        useCallback(() => {
            const getFavorites = async () => {
                try {
                    const jsonValue = await AsyncStorage.getItem(MOVIE_KEY);
                    setFavMovies(jsonValue != null ? JSON.parse(jsonValue) : null);
                } catch(e) {
                    alert(`${e}`);
                }
            }
            
            getFavorites();
            setLoading(false);
            // Not focused on Favorites -> do nothing
            return () => {/*console.log("not in favs anymore :(")*/};
        }, [])
      );

    return (loading ? 
        (
            <View style={styles.loadingPage}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        ) : (
            <View style={styles.container}>
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
            </View>
        )
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141414",
    },
    loadingPage: {
        flex: 1,
        backgroundColor: "#141414",
        justifyContent: "center",
    }
})