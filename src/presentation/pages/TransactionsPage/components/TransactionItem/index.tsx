import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { Transaction } from "@/domain/entities";
import { Badge, Card, MenuDropDown } from "@/presentation/components";

interface TransactionItemProps {
  item: Transaction;
  openEditTransactionModal: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
}

function TransactionItem({
  item,
  openEditTransactionModal,
  deleteTransaction,
}: TransactionItemProps) {
  const isReceived = item.isReceived();
  const isSended = item.isSended();

  const getTransactionLabel = () => {
    if (isReceived) return "Recebido";
    if (isSended) return "Enviado";
    return "Transação";
  };

  const getBadgeColor = () => {
    if (isReceived) return "bg-green-100";
    if (isSended) return "bg-red-100";
    return "bg-gray-100";
  };

  const getIconName = () => {
    if (isReceived) return "arrow-down-sharp";
    if (isSended) return "arrow-up-sharp";
    return "swap-horizontal";
  };

  const getIconColor = () => {
    if (isReceived) return "#16A34A";
    if (isSended) return "#DC2626";
    return "#6B7280";
  };

  return (
    <Card className="p-5 mb-3 shadow-sm">
      <View className="flex-row justify-between items-center mb-8">
        <View className="flex-row items-center">
          <Badge
            className="mr-2"
            color={getBadgeColor()}
          >
            <Ionicons
              name={getIconName()}
              size={24}
              color={getIconColor()}
            />
          </Badge>
          <Text className="text-lg font-nunito-semi-bold">
            {getTransactionLabel()}
          </Text>
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
          {item.formattedDateTime()}
        </Text>
        <View className="flex justify-between items-center">
          <Badge color="bg-gray-200 mb-2">
            <Text className="text-l font-nunito-semi-bold mx-2">
              {item.formattedMonth()}
            </Text>
          </Badge>

          <Text
            className={`text-lg font-bold ${isReceived ? "text-green-600" : "text-red-600"}`}
          >
            {isReceived ? "+" : "-"}
            {item.formattedAmount().replace('R$ ', '')}
          </Text>
        </View>
      </View>

      {item.hasAttachment() && (
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
