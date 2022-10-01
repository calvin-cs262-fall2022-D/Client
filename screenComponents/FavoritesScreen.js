import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import MovieBanner from '../components/MovieBanner';

export default function FavoritesScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView>
                <MovieBanner />
                <MovieBanner />
                <MovieBanner />
                <MovieBanner />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141414",
    },
})