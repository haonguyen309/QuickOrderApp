import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CartSummary({
  skuCount,
  totalQty,
  totalAmount
}: {
  skuCount: number;
  totalQty: number;
  totalAmount: number;
}) {
  const handleCheckout = () => {
    if (totalQty === 0) {
      Alert.alert("Empty Cart", "Please add items to your cart before checkout.");
      return;
    }
    Alert.alert(
      "Checkout",
      `Total: ${totalAmount.toLocaleString()} đ\nItems: ${totalQty}\nSKUs: ${skuCount}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => Alert.alert("Success", "Order placed!") }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.summaryRow}>
        <View style={styles.stat}>
          <Text style={styles.label}>SKUs</Text>
          <Text style={styles.value}>{skuCount}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.label}>Items</Text>
          <Text style={styles.value}>{totalQty}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.totalValue}>{totalAmount.toLocaleString()} đ</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[styles.checkoutBtn, totalQty === 0 && styles.checkoutBtnDisabled]} 
        onPress={handleCheckout}
        disabled={totalQty === 0}
      >
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 2,
    borderTopColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  stat: { alignItems: "center" },
  label: { fontSize: 12, color: "#6b7280", marginBottom: 4 },
  value: { fontSize: 18, fontWeight: "700", color: "#1f2937" },
  totalValue: { fontSize: 18, fontWeight: "700", color: "#2563eb" },
  checkoutBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutBtnDisabled: { backgroundColor: "#9ca3af" },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
