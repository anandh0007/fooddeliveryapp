import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function SplashScreen({ navigation }) {
  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handleRegisterPress = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require("../assets/splash2.png")} /> */}
      <Image source={require("../assets/splash.png")} />
      <Text style={styles.text}>Splash Screen</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );k
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#485bc4",
  },
  text: {
    fontSize: 20,
    color: "white",
    margin: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 10,
  },
  button: {
    backgroundColor: "rgba(233,30,99,0.7)",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
