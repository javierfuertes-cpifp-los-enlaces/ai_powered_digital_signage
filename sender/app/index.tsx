import { ScrollView } from "react-native";
import PlantillaFormScreen from "./PlantillaFormScreen";

export default function Index() {




  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ padding: 20 }}
    >
      <PlantillaFormScreen />
    </ScrollView>
  );
}
