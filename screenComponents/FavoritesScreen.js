import { View, Text, StyleSheet, } from 'react-native';

export default function FavoritesScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <Text style={styles.content}>This is the Favorites page</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        flex: 10,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    navigationContainer: {
        flex: 1,
        backgroundColor: "#97252B",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    content: {
        color: "#f2cc00",
        fontSize: 30,
        textAlign: "center"
    }
})