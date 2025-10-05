import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { FilterType } from "../../types";

interface EmptyListProps {
  filters: {
    type: FilterType;
    category: string;
    startDate: Date | null;
    endDate: Date | null;
  };
}

function EmptyList({ filters }: EmptyListProps) {
  return (
    <View className="items-center justify-center flex-1 py-12">
      <Ionicons name="receipt-outline" size={64} color="#CBD5E1" />
      <Text className="mt-4 text-lg text-center text-gray-400">
        Nenhuma transação encontrada
      </Text>
      <Text className="mt-2 text-sm text-center text-gray-400">
        {filters.category ||
          filters.type !== FilterType.All ||
          filters.startDate ||
          filters.endDate
          ? "Tente ajustar os filtros"
          : "Adicione sua primeira transação tocando no botão +"}
      </Text>
    </View>
  );
}

export default EmptyList;