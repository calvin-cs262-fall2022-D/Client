import Movie from './Movie';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';

export default function Semester(props) {
    const movieData = props.movieData;

    return (
        <View style={styles.container}>
            <View style={styles.sectionHeading}>
                <Text style={styles.sectionHeadingText}>{props.text}</Text>
            </View>
            <View style={styles.movieList}>
                <ScrollView horizontal={true}>
                    {   
                        Object.keys(movieData).map((item, idx) => {
                            console.log("error?");
                            console.log("get the fricken item", typeof movieData[item].image);
                            const titleTitle = movieData[item].title;
                            console.log(titleTitle);
                            const imageImage = movieData[item].image;
                            console.log(imageImage);
                            return (<Movie key={idx} poster={imageImage} title={titleTitle}></Movie>)
                        })  
                    }               
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