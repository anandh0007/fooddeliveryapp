import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OrderScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.orderText}>Thank you for your order!</Text>
            <Text style={styles.subText}>Your food will arrive soon.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    orderText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    subText: {
        fontSize: 18,
        color: "#666",
    },
});
