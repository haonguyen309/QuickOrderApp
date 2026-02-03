import { SafeAreaView } from "react-native";
import QuickOrderScreen from "../src/screens/QuickOrderScreen";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <QuickOrderScreen />
    </SafeAreaView>
  );
}