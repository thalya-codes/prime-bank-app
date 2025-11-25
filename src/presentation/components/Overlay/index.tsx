import { TouchableOpacity } from "react-native";

function Overlay({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      className="flex-1"
      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      activeOpacity={1}
      onPress={onPress}
    />
  );
}

export default Overlay