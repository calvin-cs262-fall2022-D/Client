import Semester from "../components/Semester";
import { useFonts } from "expo-font";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [filteredSemesters, setFilteredSemesters] = useState({});
  const [filteredClasses, setFilteredClasses] = useState({});
  const [filteredMovies, setFilteredMovies] = useState({});
  // const [class_or_sem, setText] = useState({});
  // Load in the fonts
  const [fontsLoaded] = useFonts({
    BebasNeue: require("../assets/fonts/BebasNeue-Regular.ttf"),
    Fjalla: require("../assets/fonts/FjallaOne-Regular.ttf"),
  });

  const iconObj = {
    Filter: ["filter-sharp"],
  };

  const getMoviesBySemesters = (data) => {
    // get list of all the semesters
    const sems = [];
    data.forEach((item) => {
      // if the semester is not in the set
      if (!sems.includes(item.semester)) {
        sems.push(item.semester);
      }
    });

    // filter movies by semesters
    let filteredBySem = {};
    sems.forEach((sem) => {
      const semesterMovies = data.filter((item) => item.semester === sem);
      // console.log(sem, semesterMovies);
      filteredBySem[sem] = semesterMovies;
    });
    setFilteredSemesters(filteredBySem);
    // start as semester on default
    setFilteredMovies(filteredBySem);
  };

  const getMoviesByClass = (data) => {
    const classes = [];
    data.forEach((item) => {
      // if the semester is not in the set
      if (!classes.includes(item.class)) {
        classes.push(item.class);
      }
    });

    let filteredByClass = {};
    classes.forEach((classes) => {
      const classMovies = data.filter((item) => item.class === classes);
      //console.log(classes, classMovies);
      filteredByClass[classes] = classMovies;
    });
    setFilteredClasses(filteredByClass);
  };

  const filterBySemester = () => {
    setFilteredMovies(filteredSemesters);
  };

  const filterByClasses = () => {
    setFilteredMovies(filteredClasses);
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://knightflix-service.herokuapp.com/movies"
      );
      const json = await response.json();
      setMovies(json);
      getMoviesBySemesters(json);
      getMoviesByClass(json);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return loading && !fontsLoaded ? (
    <View>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.verticalScroll}>
        <ScrollView>
          <View style={styles.filterButtons}>
            <Ionicons
              style={styles.icons}
              name={iconObj["Filter"][0]}
              size={36}
              color={"#f2cc00"}
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={filterBySemester}
            >
              <Text style={styles.buttonText}>Semester</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={filterByClasses}
            >
              <Text style={styles.buttonText}>Class</Text>
            </TouchableOpacity>
          </View>

          {Object.keys(filteredMovies).map((semester, idx) => (
            <Semester
              key={idx}
              text={semester}
              // start as semester on default
              movieData={filteredMovies[semester]}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignContent: "center",
  },
  filterButtons: {
    flexDirection: "row",
    padding: 10,
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#f2cc00",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginHorizontal: 6,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Fjalla",
    color: "#000000",
    fontWeight: "bold",
    alignSelf: "center",
  },
  icons: {
    marginTop: -3,
  },
});
