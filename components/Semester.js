import Movie from './Movie';
import { StyleSheet, Text, View, SafeAreaView, FlatList, } from 'react-native';

export default function Semester(props) {
    // array of objects 
    const movieData = props.movieData;

    const renderMovies = ({ item }) => (
        <Movie poster={item.image} title={item.title} videoId={item.videoId} />
    )

    return (
        <View style={styles.container}>
            <View style={styles.sectionHeading}>
                <Text style={styles.sectionHeadingText}>{props.text}</Text>
            </View>
            <SafeAreaView style={styles.movieList}>
                <FlatList 
                    data={movieData}
                    renderItem={renderMovies}
                    keyExtractor={item => item.id}
                    horizontal={true}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 400,
        backgroundColor: "12345",
    },
    sectionHeading: {
        flex: 1,
        backgroundColor: "#141414",
        justifyContent: "center",
        paddingLeft: 30,
    },
    sectionHeadingText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#ECC409",
        fontFamily: "Fjalla"
    },
    movieList: {
        flex: 6,
        backgroundColor: "#141414",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
    }
})