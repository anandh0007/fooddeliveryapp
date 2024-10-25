import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCartData = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            const response = await fetch(`http://192.168.207.5:5000/api/carts/${userId}`);
            const data = await response.json();
            if (data) {
                setCartItems(data);
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    const handleQuantityChange = async (id, action) => {
        try {
            const response = await fetch(`http://192.168.207.5:5000/api/carts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action }), // Send action as "increase" or "decrease"
            });
            if (response.ok) {
                fetchCartData(); // Refresh the cart data after updating quantity
            } else {
                console.error("Error updating quantity");
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            const response = await fetch(`http://192.168.207.5:5000/api/carts/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                fetchCartData(); // Refresh the cart data after deletion
            } else {
                console.error("Error deleting item");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleOrder = () => {
        // Navigate to the OrderScreen when the order button is pressed
        navigation.navigate("Order");
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    return (
        <View style={styles.container}>
            {cartItems.map((item) => (
                <View key={item._id} style={styles.cartItem}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.itemDetails}>
                        <Text style={styles.productName}>{item.productname}</Text>
                        <Text style={styles.price}>${item.price}</Text>
                        <View style={styles.quantityControl}>
                            <TouchableOpacity onPress={() => handleQuantityChange(item._id, "decrease")}>
                                <Text style={styles.controlButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => handleQuantityChange(item._id, "increase")}>
                                <Text style={styles.controlButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => handleDeleteItem(item._id)} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            ))}

            {/* Add the Order Button */}
            <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
                <Text style={styles.orderButtonText}>Place Order</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    cartItem: {
        flexDirection: "row",
        marginBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 8,
    },
    itemDetails: {
        flex: 1,
        justifyContent: "center",
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    price: {
        fontSize: 14,
        color: "#888",
    },
    quantityControl: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    controlButton: {
        fontSize: 20,
        paddingHorizontal: 10,
    },
    quantity: {
        fontSize: 16,
        paddingHorizontal: 10,
    },
    deleteButton: {
        justifyContent: "center",
        backgroundColor: "#ff4d4d",
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    orderButton: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    orderButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default CartScreen;
