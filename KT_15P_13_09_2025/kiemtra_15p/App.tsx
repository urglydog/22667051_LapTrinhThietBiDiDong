import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

type Product = { id: string; name: string; price: number };

const products: Product[] = [
  { id: "1", name: "Iphone 6", price: 15000000 },
  { id: "2", name: "Iphone 7", price: 16000000 },
  { id: "3", name: "iPhone 8", price: 17000000 },
];

const App = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const cartCount = cart.length;
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price.toLocaleString()}đ</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product List</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <View style={styles.cartSummary}>
        <Text style={styles.cartText}> {cartCount} Items</Text>
        <Text style={styles.cartText}>Total: {cartTotal.toLocaleString()}đ</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16, color:'green' },
  item: {
    backgroundColor: "gray",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: { fontSize: 18, fontWeight: "500", color:'white' },
  price: { fontSize: 16, color: "red", marginHorizontal: 10 },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: { color: "white", fontWeight: "600" },
  cartSummary: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "pink",
    borderRadius: 8,
    alignItems: "center",
  },
  cartText: { fontSize: 18, fontWeight: "bold",fontStyle:'italic', marginBottom: 4, color: "brown" },
});

export default App;