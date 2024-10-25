import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
    // Define menu categories and items
    const menuCategories = {
        Beverages: [
            { id: 1, name: "Coca Cola", image: "https://pbs.twimg.com/profile_images/936231532402036738/HSAotpyV_400x400.jpg", price: "20.00" },
            { id: 2, name: "Pepsi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyo1wwsQiS34tROVMVlEU6rcb40L7cJfvqjw&s", price: "20.00" },
            { id: 3, name: "Lemonade", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj67aDHkZxCi6SB8nDxsn-vOcHyGBfw1v4aA&s", price: "30.00" },
        ],
        Drinks: [
            { id: 4, name: "Orange Juice", image: "https://w7.pngwing.com/pngs/22/576/png-transparent-orange-juice-in-drinking-glass-orange-juice-soft-drink-smoothie-breakfast-orange-juice-orange-health-shake-non-alcoholic-beverage-thumbnail.png", price: "40.00" },
            { id: 5, name: "Apple Juice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO6l2cFVZHz68OPI9ajcV0ShEm8Lei19f1rA&s", price: "40.00" },
            { id: 6, name: "Milkshake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjj7Bj3-74PFNv8MMY-gvktlcpNmrXt4V2eA&s", price: "50.00" },
        ],
        Starters: [
            { id: 7, name: "French Fries", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdWnuNXZozEPtTdXZ4wdMIPVGT8aiWFelh1w&s", price: "60.00" },
            { id: 8, name: "Garlic Bread", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbOAtbykJzUaF2V-Aji_iS7SeQk8GiW915Qg&s", price: "50.00" },
            { id: 9, name: "Spring Rolls", image: "https://images.themodernproper.com/billowy-turkey/production/posts/2022/FreshSpringRolls_Shot5_82.jpg?w=1200&q=82&auto=format&fit=crop&dm=1652810418&s=ea741d267b513336348e70b59449d308", price: "79.00" },
        ],
        "Main Dish": [
            { id: 10, name: "Pizza", image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/02/vegetarian-pizza-500x500.jpg", price: "129.00" },
            { id: 11, name: "Burger", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sT5zC4y0-6mPucxnXLg4ATqCxjVN7bAttQ&s", price: "109.00" },
            { id: 12, name: "Pasta", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx-5M1Zk8W6Vn7ThOt2S9qxSxGUp5XWKmYsA&s", price: "129.00" },
            { id: 13, name: "Grilled Chicken", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuC2DselGxx3dvaMGvjBRRtwUwtyE2awiMCQ&s", price: "249.00" },
            { id: 14, name: "Sushi Platter", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxfg-KLTt7tn6GxZuiTJTDzs3V_jOUVil7Lw&s", price: "189.00" },
        ],
    };

    // Function to handle clicking on food items
    const handleFoodClick = async (foodItem) => {
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
                    image: foodItem.image,
                }),
            });

            if (response.ok) {
                navigation.navigate("Cart");
            } else {
                console.error("Failed to add item to cart");
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    // Render each category with its food items
    const renderCategory = (categoryName, items) => (
        <View key={categoryName} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{categoryName}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                {items.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.card} onPress={() => handleFoodClick(item)}>
                        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" /> {/* Ensure images fit */}
                        <Text style={styles.cardText}>{item.name}</Text>
                        <Text style={styles.priceText}>₹{item.price}</Text> {/* Display the price */}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>food Delivery App</Text>
                <Text style={styles.subtitle}>Explore our menu</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Render each menu category */}
                {Object.entries(menuCategories).map(([categoryName, items]) => renderCategory(categoryName, items))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
        padding: 20,
        backgroundColor: "#3E4A59",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        color: "#d1d1d1",
        marginTop: 5,
        textAlign: "center",
    },
    categoryContainer: {
        marginBottom: 30,
    },
    categoryTitle: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 12,
        color: "#333",
        borderBottomWidth: 2,
        borderBottomColor: "#e91e63",
        paddingBottom: 8,
    },
    horizontalScroll: {
        paddingBottom: 10,
    },
    card: {
        width: 160,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#fff",
        marginRight: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        transform: [{ translateY: -5 }],
    },
    image: {
        width: "100%",
        height: 120, // Increased height for better visibility
    },
    cardText: {
        paddingTop: 8,
        paddingHorizontal: 8,
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    priceText: {
        paddingBottom: 8,
        paddingHorizontal: 8,
        fontSize: 14,
        fontWeight: "bold",
        color: "#e91e63",
    },
});

export default HomeScreen;
