import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { BottomSheet } from "@/presentation/components";
import { currencyMask } from "@/utils/masks";

function TransactionEdit({
  modalVisible,
  setModalVisible,
  transactionDetail,
  errors,
  handleAmountChange,
  saveTransaction,
}: any) {
  return (
    <BottomSheet visible={modalVisible} setVisible={setModalVisible}>
      <View>
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-xl font-bold text-gray-800">
            {transactionDetail?.id ? "Editar Transação" : "Nova Transação"}
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mb-6">
            <Text className="text-sm font-medium mb-4 text-gray-600">
              Valor (R$)
            </Text>
            <TextInput
              className={`border ${errors.amount ? "border-red-500" : "border-gray-300"} p-3 flex-row justify-between items-center bg-white `}
              placeholder="R$ 0,00"
              keyboardType="numeric"
              value={currencyMask(transactionDetail?.amount)}
              onChangeText={handleAmountChange}
            />
            {errors.amount && (
              <Text className="text-red-500 text-xs mt-1">{errors.amount}</Text>
            )}
          </View>

          <TouchableOpacity
            className="bg-blue-600 py-4 px-6 rounded-lg mb-6"
            onPress={saveTransaction}
          >
            <Text className="text-white text-center font-bold text-lg">
              Atualizar Transação
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </BottomSheet>
  );
}

export default TransactionEdit;
