import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Category } from "../types/product";

const CATEGORIES: ("All" | Category)[] = [
  "All", "Pain Relief", "Antibiotic", "Supplement", "Allergy", "Gastro"
];

export default function CategoryFilter({
  value,
  onChange
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      alwaysBounceVertical={false}
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      {CATEGORIES.map(c => {
        const isSelected = value === c;
        return (
          <TouchableOpacity 
            key={c} 
            onPress={() => onChange(c)}
            style={[styles.pill, isSelected && styles.pillActive]}
          >
            <Text style={[styles.text, isSelected && styles.textActive]}>
              {c}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
  },
  container: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  pillActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4b5563",
  },
  textActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
