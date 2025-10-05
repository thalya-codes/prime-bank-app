import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { Badge, Card, MenuDropDown } from "@/components";
import { currencyMask, formatDateTime, formatMonthDate } from "@/utils/masks";

function TransactionItem({
  item,
  openEditTransactionModal,
  deleteTransaction,
}: any) {
  return (
    <Card className="p-5 mb-3 shadow-sm">
      <View className="flex-row justify-between items-center mb-8">
        <View className="flex-row items-center">
          <Badge
            className="mr-2"
            color={`${item.type === "income" ? "bg-green-100" : "bg-red-100"}`}
          >
            <Ionicons
              name={`${item.type === "income" ? "arrow-up-sharp" : "arrow-down-sharp"}`}
              size={24}
              color={`${item.type === "income" ? "#16A34A" : "#DC2626"}`}
            />
          </Badge>
          <Text className="text-lg font-nunito-semi-bold">{item.type}</Text>
        </View>
 
        <MenuDropDown
          data={[
            {
              label: "Editar",
              icon: <Ionicons name="pencil-outline" size={16} color="#666" />,
              onPress: () => openEditTransactionModal(item),
            },
            {
              label: "Excluir",
              icon: <Ionicons name="trash-outline" size={16} color="#666" />,
              onPress: () => deleteTransaction(item.id),
            },
          ]}
          maxHeight={100}
        />
      </View>

      <View
        className="flex-row justify-between items-center"
        style={{ zIndex: -1 }}
      >
        <Text className="text-sm text-gray-600">
          {formatDateTime(item.createdAt)}
        </Text>
        <View className="flex justify-between items-center">
          <Badge color="bg-gray-200 mb-2">
            <Text className="text-l font-nunito-semi-bold mx-2">
              {formatMonthDate(item.createdAt)}
            </Text>
          </Badge>

          <Text
            className={`text-lg font-bold ${item.type === "income" ? "text-green-600" : "text-red-600"}`}
          >
            {item.type === "income" ? "+" : "-"}
            {currencyMask(item.amount)}
          </Text>
        </View>
      </View>

      {item.urlAnexo && (
        <View className="flex-row items-center mt-2">
          <Ionicons name="receipt-outline" size={16} color="#666" />
          <Text className="text-xs text-gray-600 ml-1">
            Comprovante anexado
          </Text>
        </View>
      )}
    </Card>
  );
}

export default TransactionItem;
