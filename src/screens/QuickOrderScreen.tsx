import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CartSummary from "../components/CartSummary";
import CategoryFilter from "../components/CategoryFilter";
import EmptyState from "../components/EmptyState";
import ProductItem from "../components/ProductItem";
import { PRODUCTS } from "../data/products";
import { useCart } from "../hooks/useCart";

export default function QuickOrderScreen() {
  const { cart, updateQty, setQuantity, clearCart, getTotals } = useCart();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [filtered, setFiltered] = useState(PRODUCTS);

  const filterProducts = (searchText: string, cat: string) => {
    const q = searchText.toLowerCase();
    setFiltered(
      PRODUCTS.filter(p =>
        (cat === "All" || p.category === cat) &&
        p.name.toLowerCase().includes(q)
      )
    );
  };

  const debouncedSearch = useMemo(
    () => _.debounce((text: string) => filterProducts(text, category), 300),
    [category]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  useEffect(() => {
    filterProducts(query, category);
  }, [category]);

  const handleClearCart = () => {
    const totals = getTotals(PRODUCTS);
    if (totals.totalQty === 0) {
      Alert.alert("Cart Empty", "Your cart is already empty.");
      return;
    }
    
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", style: "destructive", onPress: clearCart }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quick Order</Text>
        <TouchableOpacity onPress={handleClearCart} style={styles.clearBtn}>
          <Text style={styles.clearBtnText}>Clear Cart</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Search products..."
        value={query}
        onChangeText={setQuery}
        style={styles.searchInput}
        placeholderTextColor="#9ca3af"
      />

      <CategoryFilter value={category} onChange={setCategory} />

      <FlatList
        data={filtered}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            qty={cart[item.id] ?? 0}
            onAdd={() => updateQty(item.id, +1)}
            onRemove={() => updateQty(item.id, -1)}
            onSetQty={(qty) => setQuantity(item.id, qty)}
          />
        )}
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={styles.listContent}
      />

      <CartSummary {...getTotals(PRODUCTS)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: { fontSize: 24, fontWeight: "700", color: "#1f2937" },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  clearBtnText: { color: "#dc2626", fontSize: 14, fontWeight: "600" },
  searchInput: {
    margin: 12,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  listContent: { paddingBottom: 12 },
});
