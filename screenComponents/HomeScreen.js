import Semester from '../components/Semester';
import { useFonts } from 'expo-font';
import { StyleSheet, View, ScrollView, Button } from 'react-native';
import { useState, useEffect } from 'react';

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [filteredSemesters, setFilteredSemesters] = useState({});
  // Load in the fonts
  const [fontsLoaded] = useFonts({
    'BebasNeue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Fjalla': require('../assets/fonts/FjallaOne-Regular.ttf')
  });

  const filterBySemesters = () => {
    semesters.forEach((semester) => {
      const semesterMovies = movies.filter((item) => {item.semester === semester});
      const newFilteredSemesters = {...filteredSemesters, semester: semesterMovies};
      setFilteredSemesters(newFilteredSemesters);
    })
  }

  const getSemesters = () => {
    console.log({movies});
    movies.forEach((item) => {
      // if the class is already in the set
      if (!semesters.includes(item.semester)) {
        setSemesters([...semesters, item.semester])
      }
    })
  }

  const fetchMovies = async () => {
    try {
      const response = await fetch("https://knightflix-service.herokuapp.com/movies");
      const json = await response.json();
      setMovies(json)

      getSemesters(); 
      filterBySemesters();
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    fetchMovies();
    console.log({semesters});
  }, [])

  return (!fontsLoaded ? null :
    <View style={styles.container}>
      <View style={styles.verticalScroll}>
        <ScrollView>
          {
            Object.keys(filteredSemesters).map((semester, idx) =>
              <Semester key={idx} text={semester} movieData={filteredSemesters[semester]} />
            )
          }
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalScroll: {
    backgroundColor: "#141414",
    flex: 10,
  },
});
