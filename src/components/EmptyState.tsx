import { StyleSheet, Text, View } from "react-native";

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <Text style={styles.title}>No products found</Text>
      <Text style={styles.subtitle}>Try adjusting your search or filters</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 64, marginBottom: 16 },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
});
