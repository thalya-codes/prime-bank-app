import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { BottomSheet } from "@/components";
import { currencyMask } from "@/utils/masks";
import { FilterType } from "../../types";

function TransactionEdit({
  modalVisible,
  setModalVisible,
  currentTransaction,
  setCurrentTransaction,
  errors,
  handleAmountChange,
  saveTransaction,
}: any) {
  return (
    <BottomSheet visible={modalVisible} setVisible={setModalVisible}>
      <View>
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-xl font-bold text-gray-800">
            {currentTransaction?.id ? "Editar Transação" : "Nova Transação"}
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mb-6">
            <Text className="text-sm font-medium mb-4 text-gray-600">Tipo</Text>
            <View className="flex-row">
              <TouchableOpacity
                className={`flex-1 py-3 ${currentTransaction?.type === FilterType.Income ? "bg-green-100 border border-green-500" : "bg-gray-200"} rounded-l-lg justify-center items-center`}
                onPress={() =>
                  setCurrentTransaction((prev: any) => ({
                    ...prev,
                    type: FilterType.Income,
                  }))
                }
              >
                <Text
                  className={`font-medium ${currentTransaction?.type === FilterType.Income ? "text-green-700" : "text-gray-800"}`}
                >
                  Receita
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-3 ${currentTransaction?.type === FilterType.Expense ? "bg-red-100 border border-red-500" : "bg-gray-200"} rounded-r-lg justify-center items-center`}
                onPress={() =>
                  setCurrentTransaction((prev: any) => ({
                    ...prev,
                    type: FilterType.Expense,
                  }))
                }
              >
                <Text
                  className={`font-medium ${currentTransaction?.type === FilterType.Expense ? "text-red-700" : "text-gray-800"}`}
                >
                  Despesa
                </Text>
              </TouchableOpacity>
                            <TouchableOpacity
                className={`flex-1 py-3 ${currentTransaction?.type === FilterType.Transfer ? "bg-red-100 border border-blue-500" : "bg-gray-200"} rounded-r-lg justify-center items-center`}
                onPress={() =>
                  setCurrentTransaction((prev: any) => ({
                    ...prev,
                    type: FilterType.Transfer,
                  }))
                }
              >
                <Text
                  className={`font-medium ${currentTransaction?.type === FilterType.Transfer ? "text-blue-700" : "text-gray-800"}`}
                >
                  Transferência
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium mb-4 text-gray-600">
              Valor (R$)
            </Text>
            <TextInput
              className={`border ${errors.amount ? "border-red-500" : "border-gray-300"} p-3 flex-row justify-between items-center bg-white `}
              placeholder="R$ 0,00"
              keyboardType="numeric"
              value={currencyMask(currentTransaction?.amount || 0)}
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
