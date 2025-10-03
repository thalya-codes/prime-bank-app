import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { FilterType } from "../..";

function EmptyList(filters: any) {
  return (
    <View className="flex-1 justify-center items-center py-12">
      <Ionicons name="receipt-outline" size={64} color="#CBD5E1" />
      <Text className="text-lg text-gray-400 mt-4 text-center">
        Nenhuma transação encontrada
      </Text>
      <Text className="text-sm text-gray-400 mt-2 text-center">
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
