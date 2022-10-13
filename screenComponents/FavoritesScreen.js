import { View, StyleSheet, ScrollView, Alert, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import MovieBanner from '../components/MovieBanner';
import { useState, useCallback } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesScreen({ navigation }) {
    const [loading, setLoading] = useState(true); 
    const [favMovies, setFavMovies] = useState({});
    const [prevOpenedRow, setPrevOpenedRow] = useState();
    const [selectedMovie, setSelectedMovie ] = useState({});
    

    const FAVORITES_KEY = "@favorites_Key";

    const saveFavorites = async (movieObj) => {
        try {
            const jsonValue = JSON.stringify(movieObj);
            await AsyncStorage.setItem(FAVORITES_KEY, jsonValue);
        } catch (e) {
            alert(`${title}: ${e}`);
        }
    }

    const deleteFavorite = async (movieKey) => {
        const newFavs = {...favMovies}
        delete newFavs[movieKey];
        setFavMovies(newFavs);
        await saveFavorites(newFavs);
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
                onPress: () => deleteFavorite(movieKeyToDelete),
                style: "destructive",
              }
            ]
        );
    }

    const clearFavorites = async () => {
        const emptyFavs = {}
        setFavMovies(emptyFavs);
        await saveFavorites(emptyFavs);
    }

    const alertBeforeClear = () => {
        Alert.alert(
            "Clearing Favorites",
            "This action cannot be undone. Are you sure?",
            [
              {
                text: "Cancel",
              },
              {
                text: "Yes, I'm sure",
                onPress: () => clearFavorites(),
                style: "destructive",
              }
            ]
        );
    }

    // Swipeable code modified;
    // originally from: https://snack.expo.dev/@aaronksaunders/calm-beef-jerky
    const renderRightActions = (progress, dragX, alertBeforeDelete) => {
        return (
          <View
            style={{
              margin: 0,
              alignContent: 'center',
              justifyContent: 'center',
              width: 70,
            }}>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={alertBeforeDelete}>
                <Ionicons name="trash" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
        );
      };

    const closeRow = (movieKey) => {
        if (prevOpenedRow && prevOpenedRow !== selectedMovie[movieKey]) {
          prevOpenedRow.close();
        }
        setPrevOpenedRow(selectedMovie[movieKey]);
    };

    useFocusEffect(
        // WHENEVER Favorites screen is focused, load Favorite movies from AsyncStorage
        useCallback(() => {
            const getFavorites = async () => {
                try {
                    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
                    setFavMovies(jsonValue != null ? JSON.parse(jsonValue) : {});
                } catch(e) {
                    alert(`${e}`);
                }
            }

            getFavorites();
            setLoading(false);
            // Not focused on Favorites -> do nothing
            return () => {/*console.log("not in favs anymore :(")*/ };
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
                            <Swipeable
                                key={movieKey}
                                renderRightActions={(progress, dragX) =>
                                  renderRightActions(progress, dragX, () => alertBeforeDelete(movieKey))
                                }
                                ref={(ref) => (selectedMovie[movieKey] = ref)}
                                onSwipeableOpen={() => closeRow(movieKey)}
                                rightOpenValue={-100}
                            >
                                <MovieBanner title={favMovies[movieKey].title} poster={favMovies[movieKey].poster} />
                            </Swipeable>
                        )
                    }
                </ScrollView>
                <View style={styles.clearButtonContainer}>
                    <Button 
                        style={styles.clearButton} 
                        title="clear" 
                        color="#f5392f" 
                        onPress={alertBeforeClear} />
                </View>
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
    },
    deleteButton: {
        color: "red",
        backgroundColor: "#f5392f",
        height: "95%",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    clearButtonContainer: {
        marginBottom: 15,
    },
})