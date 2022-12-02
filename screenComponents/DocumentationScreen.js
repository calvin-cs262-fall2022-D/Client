import { View, Text, StyleSheet } from "react-native";

export default function DocumentationScreen() {
  return (
    <View styles={styles.container}>
      <View style={styles.bodyContainer}>
        <View>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>How to Use KnightFlix</Text>
          </View>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionHeader}>1. Watching a movie:</Text>
            <Text style={styles.instruction}>a. Click on movie</Text>
            <Text style={styles.instruction}>b. Press play</Text>
          </View>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionHeader}>2. Favorite movie:</Text>
            <Text style={styles.instruction}>a. Click on movie</Text>
            <Text style={styles.instruction}>b. Press favorite button</Text>
            <Text style={styles.instruction}>
              c. Navigate to Favorites tab to view favorite movies
            </Text>
          </View>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionHeader}>
              3. Remove movie from Favorites (3 options):
            </Text>
            <Text style={styles.instruction}>
              a. Navigate to Favorites tab and swipe left on movie
            </Text>
            <Text style={styles.instruction}>
              b. Then click the trash can icon
            </Text>
            <Text style={styles.instruction}>
              c. Navigate to Favorites tab and click “Clear all”
            </Text>
            <Text style={styles.instruction}>
              d. Navigate to movie About page and then unpress the favorite
              movie icon.
            </Text>
          </View>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionHeader}>
              4. Remove movie from Recently Watched (2 options):
            </Text>
            <Text style={styles.instruction}>
              a. Navigate to Recently Watched tab and swipe left on movie
            </Text>
            <Text style={styles.instruction}>
              b. Then click the trash can icon
            </Text>
            <Text style={styles.instruction}>
              c. Navigate to Recently Watched tab and click “Clear all”
            </Text>
          </View>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionHeader}>5. Search for movie:</Text>
            <Text style={styles.instruction}>a. Navigate to search page</Text>
            <Text style={styles.instruction}>b. Type in desired movie</Text>
          </View>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionHeader}>
              6. Filter by Class/Semester
            </Text>
            <Text style={styles.instruction}>
              a. Click on class/semester filter at top of home page
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "blue",
  },
  headerContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  bodyContainer: {
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 15,
  },
  instructionContainer: {
    marginBottom: 10,
  },
  instructionHeader: {
    fontSize: 20,
  },
  instruction: {
    marginLeft: 20,
    fontSize: 16,
  },
  subinstruction: {
    marginLeft: 40,
  },
});
