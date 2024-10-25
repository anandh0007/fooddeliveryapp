import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MenuScreen = ({ route, navigation }) => {
    const { restaurantDetails, foodItems } = route.params;

    const addToCart = async (foodItem) => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            const response = await fetch("http://192.168.207.5:5000/api/carts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    productname: foodItem.name,
                    price: foodItem.price,
                    image: restaurantDetails.image,
                }),
            });

            if (response.ok) {
                console.log(`${foodItem.name} added to cart!`);
            } else {
                console.error("Failed to add item to cart");
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.restaurantTitle}>{restaurantDetails.name}</Text>
            <FlatList
                data={foodItems}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.foodName}>{item.name}</Text>
                        <Text style={styles.foodPrice}>${item.price}</Text>
                        <Button
                            title="Add to Cart"
                            onPress={() => addToCart(item)}
                        />
                    </View>
                )}
            />
            <Button
                title="Go to Cart"
                onPress={() => navigation.navigate("Cart")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    restaurantTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    foodName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    foodPrice: {
        fontSize: 16,
        color: "green",
        marginBottom: 10,
    },
});

export default MenuScreen;
