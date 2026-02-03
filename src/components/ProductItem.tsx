import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Product } from "../types/product";

interface Props {
  product: Product;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
  onSetQty?: (qty: number) => void;
}

export default function ProductItem({ product, qty, onAdd, onRemove, onSetQty }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.name}>{product.name}</Text>
          {product.isPrescription && (
            <View style={styles.rxBadge}>
              <Text style={styles.rxText}>Rx</Text>
            </View>
          )}
        </View>
        <Text style={styles.meta}>{product.category}</Text>
        <Text style={styles.price}>{product.price.toLocaleString()} đ</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          onPress={onRemove} 
          style={[styles.btn, qty === 0 && styles.btnDisabled]}
          disabled={qty === 0}
        >
          <Text style={styles.btnText}>−</Text>
        </TouchableOpacity>
        
        <TextInput
          value={qty.toString()}
          onChangeText={(text) => {
            const num = parseInt(text) || 0;
            onSetQty?.(Math.min(99, Math.max(0, num)));
          }}
          keyboardType="number-pad"
          style={styles.qtyInput}
          selectTextOnFocus
        />
        
        <TouchableOpacity onPress={onAdd} style={styles.btn}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  info: { flex: 1, marginRight: 12 },
  header: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  name: { fontSize: 16, fontWeight: "600", color: "#1a1a1a" },
  rxBadge: {
    backgroundColor: "#ff4444",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rxText: { color: "#fff", fontSize: 11, fontWeight: "bold" },
  meta: { fontSize: 13, color: "#666", marginBottom: 4 },
  price: { fontSize: 15, fontWeight: "700", color: "#2563eb" },
  actions: { flexDirection: "row", alignItems: "center", gap: 8 },
  btn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },
  btnDisabled: { backgroundColor: "#ccc" },
  btnText: { color: "#fff", fontSize: 20, fontWeight: "600" },
  qtyInput: {
    width: 50,
    height: 36,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "#f9fafb",
  },
});
