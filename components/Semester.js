import Movie from './Movie';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, FlatList, } from 'react-native';

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
                        movieData.map((item, idx) => {
                            return (<Movie key={idx} poster={item.image} title={item.title}></Movie>)
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