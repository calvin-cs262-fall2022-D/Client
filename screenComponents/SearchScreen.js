import { View, StyleSheet, SafeAreaView, Animated } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import { TouchableOpacity } from "react-native";
import MovieBanner from "../components/MovieBanner";
import { useState, useEffect, useRef } from "react";

const ITEM_SIZE = 210;

export default function SearchScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderMovie = ({ item, index }) => {
    // calculate scale for scrolling animation
    const scale = scrollY.interpolate({
      inputRange: [
        -1, 0,
        ITEM_SIZE * index,
        ITEM_SIZE * (index + 2)
      ],
      outputRange: [1, 1, 1, 0]
    })
    const opacity = scrollY.interpolate({
      inputRange: [
        -1, 0,
        ITEM_SIZE * index,
        ITEM_SIZE * (index + 0.6)
      ],
      outputRange: [1, 1, 1, 0]
    })
    return (
      <Animated.View style={[styles.item,
      {
        transform: [{ scale }], opacity
      }
      ]} >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("About", {
              title: item.title,
              poster: item.imageLink,
              course: item.course,
              videoId: item.vimeoKey,
              description: item.description,
            })
          }
        >
          <MovieBanner
            title={item.title}
            poster={item.imageLink}
            description={item.description}
            course={item.course}
          />
        </TouchableOpacity>
      </Animated.View >
    )
  };

  const processMovies = (rawMovieData) => {
    const processedMovies = rawMovieData.map((item) => {
      const { semester, course, ...rest } = item;

      const newSemester = !semester ? "MISCELLANEOUS" : semester.toUpperCase();
      const newCourse = !course ? "MISCELLANEOUS" : course.toUpperCase();

      return { semester: newSemester, course: newCourse, ...rest };
    });
    return processedMovies;
  }

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://knightflix-service.herokuapp.com/movies"
      );
      const json = await response.json();
      const processedMovies = processMovies(json);
      setMovies(processedMovies);
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
        <Animated.FlatList
          data={filteredMovies}
          renderItem={renderMovie}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            // Animate the movies shrinking/growing on scroll
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
        />
      </SafeAreaView>
    </View>
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
