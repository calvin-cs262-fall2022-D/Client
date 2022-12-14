import Semester from "../components/Semester";
import { useFonts } from "expo-font";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Text, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [filteredSemesters, setFilteredSemesters] = useState({});
  const [filteredCourses, setFilteredCourses] = useState({});
  const [filteredMovies, setFilteredMovies] = useState({});
  const [semesterFiltered, setSemesterFiltered] = useState({});
  const [classFiltered, setClassFiltered] = useState({});
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

  const getMoviesByCourses = (data) => {
    const courses = [];
    data.forEach((item) => {
      // if the semester is not in the set
      if (!courses.includes(item.course)) {
        courses.push(item.course);
      }
    });

    let filteredByCourse = {};
    courses.forEach((course) => {
      const courseMovies = data.filter((item) => item.course === course);
      filteredByCourse[course] = courseMovies;
    });
    setFilteredCourses(filteredByCourse);
  };

  const filterBySemester = () => {
    setFilteredMovies(filteredSemesters);
    setSemesterFiltered(true);
    setClassFiltered(false);
  };

  const filterByCourses = () => {
    setFilteredMovies(filteredCourses);
    setSemesterFiltered(false);
    setClassFiltered(true);
  };

  // data wrangling
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
      getMoviesBySemesters(processedMovies);
      getMoviesByCourses(processedMovies);
      setSemesterFiltered(true);
      setClassFiltered(false);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchMovies();
    setLoading(false);
  }, []);

  return !fontsLoaded ? (
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
              style={{
                elevation: 8,
                borderRadius: 16,
                paddingVertical: 6,
                paddingHorizontal: 14,
                marginHorizontal: 6,
                backgroundColor: semesterFiltered ? "#7c6800" : "#f2cc00",
              }}
              onPress={filterBySemester}
            >
              <Text style={styles.buttonText}>Semester</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                elevation: 8,
                borderRadius: 16,
                paddingVertical: 6,
                paddingHorizontal: 14,
                marginHorizontal: 6,
                backgroundColor: classFiltered ? "#7c6800" : "#f2cc00",
              }}
              onPress={filterByCourses}
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
  // buttonContainer: {
  //   elevation: 8,
  //   borderRadius: 16,
  //   paddingVertical: 6,
  //   paddingHorizontal: 14,
  //   marginHorizontal: 6,
  //   backgroundColor: semesterFiltered ? "#f2cc00" : "black",
  // },
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
