import { View, StyleSheet, FlatList, SafeAreaView, Text } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import MovieBanner from "../components/MovieBanner";
import { useState, useEffect } from "react";

export default function SearchScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("About", {
          title: item.title,
          poster: item.imageLink,
          course: item["class"],
          videoId: item.vimeoKey,
          description: item.description,
        })
      }
    >
      <MovieBanner
        title={item.title}
        poster={item.imageLink}
        description={item.description}
        course={item["class"]}
      />
    </TouchableOpacity>
  );

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://knightflix-service.herokuapp.com/movies"
      );
      const json = await response.json();
      setMovies(json);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    // Set up the search input

    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <SearchBar placeholder="Search" onChangeText={(text) => {
          if (text === "") {
            setFilteredMovies([]);
          } else {
            setFilteredMovies(movies.filter((movie) => movie.title.toLowerCase().includes(text.toLowerCase())));
          }
        }}></SearchBar>
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={filteredMovies}
          renderItem={renderMovie}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  textInputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginTop: 15,
    borderRadius: 20,
    backgroundColor: "#97252B",
  },
});
