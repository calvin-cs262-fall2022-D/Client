import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import MovieBanner from "../components/MovieBanner";
import { useState, useCallback } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function RecentlyWatchedScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [recentMovies, setRecentMovies] = useState({});
  const [prevOpenedRow, setPrevOpenedRow] = useState();
  const [selectedMovie, setSelectedMovie] = useState({});

  const RECENTS_KEY = "@recents_Key";

  const saveRecents = async (movieObj) => {
    try {
      const jsonValue = JSON.stringify(movieObj);
      await AsyncStorage.setItem(RECENTS_KEY, jsonValue);
    } catch (e) {
      alert(`${title}: ${e}`);
    }
  };

  const deleteRecents = async (movieKey) => {
    const newRecents = { ...recentMovies };
    delete newRecents[movieKey];
    setRecentMovies(newRecents);
    await saveRecents(newRecents);
  };

  const alertBeforeDelete = (movieKeyToDelete) => {
    Alert.alert(
      "Remove from Recently Watched",
      `Removing "${recentMovies[movieKeyToDelete].title}"`,
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteRecents(movieKeyToDelete),
          style: "destructive",
        },
      ]
    );
  };

  const clearHistory = async () => {
    const emptyRecents = {};
    setRecentMovies(emptyRecents);
    await saveRecents(emptyRecents);
  };

  const alertBeforeClear = () => {
    Alert.alert(
      "Clearing Watch History",
      "This action cannot be undone. Are you sure?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Yes, I'm sure",
          onPress: () => clearHistory(),
          style: "destructive",
        },
      ]
    );
  };

  // Swipeable code modified;
  // originally from: https://snack.expo.dev/@aaronksaunders/calm-beef-jerky
  const renderRightActions = (progress, dragX, alertBeforeDelete) => {
    return (
      <View
        style={{
          margin: 0,
          alignContent: "center",
          justifyContent: "center",
          width: 70,
        }}
      >
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={alertBeforeDelete}
        >
          <Ionicons name="trash" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  const closeRow = (movieKey) => {
    if (prevOpenedRow && prevOpenedRow !== selectedMovie[movieKey]) {
      prevOpenedRow.close();
    }
    setPrevOpenedRow(selectedMovie[movieKey]);
  };

  useFocusEffect(
    // WHENEVER Favorites screen is focused, load Favorite movies from AsyncStorage
    useCallback(() => {
      const getRecents = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem(RECENTS_KEY);
          setRecentMovies(jsonValue != null ? JSON.parse(jsonValue) : {});
        } catch (e) {
          alert(`${e}`);
        }
      };

      getRecents();
      setLoading(false);
      // Not focused on Favorites -> do nothing
      return () => {
        /*console.log("not in favs anymore :(")*/
      };
    }, [])
  );

  return loading ? (
    <View style={styles.loadingPage}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  ) : (
    <View style={styles.container}>
      <ScrollView>
        {Object.keys(recentMovies)
          .reverse()
          .map((movieKey) => (
            <Swipeable
              key={movieKey}
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, () =>
                  alertBeforeDelete(movieKey)
                )
              }
              ref={(ref) => (selectedMovie[movieKey] = ref)}
              onSwipeableOpen={() => closeRow(movieKey)}
              rightOpenValue={-100}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate({
                    name: "About",
                    params: {
                      title: recentMovies[movieKey].title,
                      poster: recentMovies[movieKey].poster,
                      videoId: recentMovies[movieKey].videoId,
                      description: recentMovies[movieKey].description,
                      course: recentMovies[movieKey].course,
                    },
                  });
                }}
              >
                <MovieBanner
                  title={recentMovies[movieKey].title}
                  poster={recentMovies[movieKey].poster}
                  course={recentMovies[movieKey].course}
                  description={recentMovies[movieKey].description}
                />
              </TouchableOpacity>
            </Swipeable>
          ))}
      </ScrollView>
      <View style={styles.clearContainer}>
        <Text style={styles.instructionText}>swipe left to delete, tap to view details</Text>
        <Button
          style={styles.clearButton}
          title="clear"
          color="#f5392f"
          onPress={alertBeforeClear}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  loadingPage: {
    flex: 1,
    backgroundColor: "#141414",
    justifyContent: "center",
  },
  deleteButton: {
    color: "red",
    backgroundColor: "#f5392f",
    height: "95%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  clearContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  instructionText: {
    color: "grey",
  }
});
