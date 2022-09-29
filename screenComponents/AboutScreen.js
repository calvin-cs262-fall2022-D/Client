import { View, Text, StyleSheet, } from 'react-native';

export default function AboutScreen({ route, navigation }) {
    const { title, poster } = route.params;

    return (
        <View style={styles.container}>
            <Text>success!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        flex: 10,
        backgroundColor: "#141414",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        color: "#f2cc00",
        fontSize: 30,
        textAlign: "center",
        fontFamily: "Fjalla",
    }
})