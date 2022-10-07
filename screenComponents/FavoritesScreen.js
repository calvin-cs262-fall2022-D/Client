import { View, StyleSheet, ScrollView, Alert, ActivityIndicator, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import MovieBanner from '../components/MovieBanner';
import { useState, useCallback } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

export default function FavoritesScreen({ navigation }) {
    const [loading, setLoading] = useState(true); 
    const [favMovies, setFavMovies] = useState({});
    const [prevOpenedRow, setPrevOpenedRow] = useState();
    const [row, setRow] = useState({});
    

    const MOVIE_KEY = "@movie_Key";

    const saveFavorites = async (movieObj) => {
        try {
            const jsonValue = JSON.stringify(movieObj);
            await AsyncStorage.setItem(MOVIE_KEY, jsonValue);
          } catch (e) {
            alert(`${title}: ${e}`);
          }
    }

    const deleteFavorite = async (movieKey) => {
        const newFavs = {...favMovies}
        delete newFavs[movieKey];
        setFavMovies(newFavs);
        await saveFavorites(newFavs);
        console.log("newFavs: ", newFavs);
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

    const renderRightActions = (progress, dragX, alertBeforeDelete) => {
        return (
          <View
            style={{
              margin: 0,
              alignContent: 'center',
              justifyContent: 'center',
              width: 70,
            }}>
            <Button color="red" onPress={alertBeforeDelete} title="DELETE"></Button>
          </View>
        );
      };

    const closeRow = (movieKey) => {
        console.log('closerow');
        if (prevOpenedRow && prevOpenedRow !== row[movieKey]) {
          prevOpenedRow.close();
        }
        setPrevOpenedRow(row[movieKey]);
    };

    useFocusEffect(
        // WHENEVER Favorites screen is focused, load Favorite movies from AsyncStorage
        useCallback(() => {
            const getFavorites = async () => {
                try {
                    const jsonValue = await AsyncStorage.getItem(MOVIE_KEY);
                    setFavMovies(jsonValue != null ? JSON.parse(jsonValue) : {});
                } catch(e) {
                    alert(`${e}`);
                }
            }
            
            getFavorites();
            setLoading(false);
            console.log(Object.values(favMovies));
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
                            <Swipeable
                                key={movieKey}
                                renderRightActions={(progress, dragX) =>
                                  renderRightActions(progress, dragX, () => alertBeforeDelete(movieKey))
                                }
                                ref={(ref) => (row[movieKey] = ref)}
                                onSwipeableOpen={() => closeRow(movieKey)}
                                rightOpenValue={-100}
                            >
                                <MovieBanner title={favMovies[movieKey].title} poster={favMovies[movieKey].poster} />
                            </Swipeable>
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