import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { FilterOptions } from "../../types";

interface EmptyListProps {
  filters: FilterOptions;
}

function EmptyList({ filters }: EmptyListProps) {
  return (
    <View className="items-center justify-center flex-1 py-12">
      <Ionicons name="receipt-outline" size={64} color="#CBD5E1" />
      <Text className="mt-4 text-lg text-center text-gray-400">
        Nenhuma transação encontrada
      </Text>
    </View>
  );
}

export default EmptyList;