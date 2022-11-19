import Movie from "./Movie";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { useEffect, useState } from "react";

export default function Semester(props) {
  const [movies, setMovies] = useState([]);

  const processText = (text) => {
    const year = text.match(/\d+/g);
    const seasonObj = text.match(/[a-zA-Z]+/g).toString();
    const season = seasonObj.toUpperCase();

    // without class number or miscellaneous
    if (!year) {
      return `${season}`
    } else {
      return `${season} ${year}`;
    }
  };

  const getMovies = async () => {
    try {
      // We will fetch data from our Knightflix web service, and store the items in movies
      const response = await fetch(
        "https://knightflix-service.herokuapp.com/movies"
      );
      const json = await response.json();
      setMovies(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  // array of objects
  const movieData = props.movieData;

  const renderMovies = ({ item }) => (
    //now we just need to refactor the code so we can access the correct attributes
    <Movie
      poster={item.imageLink}
      title={item.title}
      videoId={item.vimeoKey}
      description={item.description}
      course={item.course}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeading}>
        <Text style={styles.sectionHeadingText}>{processText(props.text)}</Text>
      </View>
      <SafeAreaView style={styles.movieList}>
        <FlatList
          data={movieData}
          renderItem={renderMovies}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 410,
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
    fontFamily: "Fjalla",
  },
  movieList: {
    flex: 6,
    backgroundColor: "#141414",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
});
