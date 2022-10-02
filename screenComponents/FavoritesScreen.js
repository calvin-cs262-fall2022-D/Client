import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieBanner from '../components/MovieBanner';
import { useState, useEffect } from 'react';

export default function FavoritesScreen({ navigation }) {
    const [loading, setLoading] = useState(true); 
    const [movies, setMovies] = useState({});

    const MOVIE_KEY = "@movie_Key";

    const getFavorites = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(MOVIE_KEY);
            setMovies(jsonValue != null ? JSON.parse(jsonValue) : null);
        } catch(e) {
            alert(`${e}`);
        }
    }

    useEffect(
        () => {
            getFavorites();
            setLoading(false);
        }, []
    )

    return (loading ? 
        (<View><Text>Loading...</Text></View>) :
        (<View style={styles.container}>
            <ScrollView>
                {
                    Object.keys(movies).map((movieKey) =>
                        <MovieBanner key={movieKey} title={movies[movieKey].title} poster={movies[movieKey].poster} />
                    )
                }
            </ScrollView>
        </View>)
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141414",
    },
})