import { StatusBar } from 'expo-status-bar';
import { Image,
        StyleSheet,
        Text,
        View,
        ScrollView,
        TextInput,
        KeyboardAvoidingView,
        AppRegistry,
      } from 'react-native';

export default function Movie() {
    return (
        <View style={styles.container}>
            <View style={styles.posterContainer}></View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Movie Title</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
    },
    posterContainer: {
        backgroundColor: "#fff",
        height: 285,
        width: 225,
        marginBottom: 15
    },
    titleContainer: {
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    titleText: {
        fontSize: 19,
        fontStyle: "italic",
        fontFamily: 'BebasNeue-Regular',
        color: "#fff"
    }
})