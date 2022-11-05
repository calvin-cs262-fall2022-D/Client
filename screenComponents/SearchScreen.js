import { View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import SearchBar from "react-native-dynamic-search-bar"
import { TouchableOpacity } from 'react-native-gesture-handler';
import MovieBanner from '../components/MovieBanner';
import { movies } from '../data/movies';

export default function SearchScreen({navigation}) {
    // aellxx: this data is to implement a placeholder for the search function 
    const tempData = movies["Spring 2022"];
    console.log(tempData);

    // aellxx: temporary render function; delete once we have DB set up
    const renderMovie = ({item}) => (
        <TouchableOpacity 
            onPress={() => 
                navigation.navigate("About", {
                    title: item.title, 
                    poster: item.image, 
                    course: item.course, 
                    videoId: item.videoId, 
                    description: item.description,
        })} >
            <MovieBanner title={item.title} poster={item.image} description={item.description} course={item.course}/>
        </TouchableOpacity>
    )

    return (
        // Set up the search input
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <SearchBar
                    placeholder="Search">
                </SearchBar>
            </View>
            <SafeAreaView style={styles.container}>
                <FlatList
                  data={tempData}
                  renderItem={renderMovie}
                  keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141414"
    },
    textInputContainer: {
        paddingVertical: 10,
        paddingHorizontal: 0,
        marginTop: 15,
        borderRadius: 20,
        backgroundColor: "#97252B",
    },
})