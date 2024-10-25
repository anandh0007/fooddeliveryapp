import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfileScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    const handleSave = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId"); // Assuming userId is stored
            const response = await fetch(`http://192.168.207.5:5000/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullname: username,
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                Alert.alert("Profile updated successfully");
                navigation.navigate("Profile");
            } else {
                Alert.alert("Error updating profile");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            Alert.alert("Error saving profile");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Profile</Text>

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#007bff",
        borderRadius: 5,
        paddingVertical: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
