import Movie from './Movie';
import megamind from '../assets/posters/megamind.jpg';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';

export default function Semester(prop) {
    const movieData = {
        m1: {
            title: "ObstructSean",
            image: "https://i.vimeocdn.com/video/623408857-9ed08834cb46cde1b9b1a28f7915f9b69035e828f667ae079ff35e5125189ce4-d_1920x1080",
        },
        m2: {
            title: "Significant Others",
            image: "https://i.vimeocdn.com/video/626019415-241412f021ef833dcd5399ad03bd689cbbe041774d11e627b85413b9e7f01baf-d_1920x1080",
        },
        m3: {
            title: "Renardo",
            image: "https://i.vimeocdn.com/video/626019221-f6fe572940b55fde70d601651b6de8d5a0d34b812591c5d4d13eb953351f3d0e-d_1920x1080",
        },
        m4: {
            title: "Daughter of the Congo",
            image: "https://i.vimeocdn.com/video/623413845-15fc8bd03fbbd4ab63c4358466506dfbbf9acb4bd9a60b56d433f7b4da37b45d-d_1920x1080"
        },
        m5: {
            title: "Breakfast at Tiffany's",
            image: "https://i.pinimg.com/originals/47/79/45/47794561e0e38712ae1e8f75d879ff9e.jpg",
        },
        m6: {
            title: "Parasite",
            image: "https://parade.com/.image/t_share/MTkwNTgxMjk2NzkxODg5MDIx/parasite2.jpg",
        },
        m7: {
            title: "Titanic",
            image: "https://www.shuspectra.com/wp-content/uploads/2022/01/titanic-631x900.jpg",
        },
        m8: {
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