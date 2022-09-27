import Movie from './Movie';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';

export default function Semester(prop) {
    const movieData = {
        m1: {
            title: "Breakfast at Tiffany's",
            image: "https://i.pinimg.com/originals/47/79/45/47794561e0e38712ae1e8f75d879ff9e.jpg",
        },
        m2: {
            title: "Parasite",
            image: "https://parade.com/.image/t_share/MTkwNTgxMjk2NzkxODg5MDIx/parasite2.jpg",
        },
        m3: {
            title: "Titanic",
            image: "https://www.shuspectra.com/wp-content/uploads/2022/01/titanic-631x900.jpg",
        },
        m4: {
            title: "Before Sunrise",
            image: "https://m.media-amazon.com/images/M/MV5BZDdiZTAwYzAtMDI3Ni00OTRjLTkzN2UtMGE3MDMyZmU4NTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        },
    }
    return (
        <View style={styles.container}>
            <View style={styles.sectionHeading}>
                <Text style={styles.sectionHeadingText}>{prop.text}</Text>
            </View>
            <View style={styles.movieList}>
                <ScrollView horizontal={true}>
                    {Object.keys(movieData).map((item, idx) =>
                        <Movie key={idx} poster={movieData[item].image} title={movieData[item].title}></Movie>
                    )}
                </ScrollView>
            </View>
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