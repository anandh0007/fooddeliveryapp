import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const storedUsername = await AsyncStorage.getItem("fullname");
                const storedEmail = await AsyncStorage.getItem("email");
                setUsername(storedUsername || "");
                setEmail(storedEmail || "");
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        }
        fetchUserInfo();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear(); // Clear all AsyncStorage data
            navigation.navigate("Login"); // Navigate to Login screen after logout
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/splash2.png")} style={styles.profileImage} />
            <Text style={styles.name}>{username}</Text>
            <Text style={styles.email}>{email}</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditProfile")}>
            <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>


            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: "#ddd",
    },
    name: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    email: {
        fontSize: 18,
        color: "#666",
        marginBottom: 30,
    },
    button: {
        backgroundColor: "#007bff", // Bootstrap primary color
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    logoutButton: {
        backgroundColor: "#ff4d4d", // Red color for logout
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        width: "80%",
        alignItems: "center",
    },
    logoutButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
