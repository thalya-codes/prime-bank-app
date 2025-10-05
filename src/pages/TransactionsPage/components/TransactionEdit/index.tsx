import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Badge, BottomSheet } from "@/components";
import { currencyMask, formatDate } from "@/utils/masks";
import { FilterType } from "../../types";

function TransactionEdit({
  modalVisible,
  setModalVisible,
  currentTransaction,
  setCurrentTransaction,
  errors,
  handleAmountChange,
  renderCategories,
  receiptImage,
  setReceiptImage,
  showTransactionDatePicker,
  setShowTransactionDatePicker,
  pickImage,
  takePicture,
  pickDocument,
  saveTransaction,
  handleTransactionDateChange,
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
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium mb-4 text-gray-600">
              Descrição
            </Text>
            <TextInput
              className={`border ${errors.description ? "border-red-500" : "border-gray-300"} p-3 flex-row justify-between items-center bg-white `}
              placeholder="Ex: Supermercado, Salário..."
              value={currentTransaction?.description || ""}
              onChangeText={(text) =>
                setCurrentTransaction((prev: any) => ({
                  ...prev,
                  description: text,
                }))
              }
            />
            {errors.description && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.description}
              </Text>
            )}
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

          <View className="mb-6">
            <Text className="text-sm font-medium mb-4 text-gray-600">
              Categoria
            </Text>
            <View className="border border-gray-300 p-3 flex-row justify-between items-center bg-white ">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {renderCategories.map((category: any) => (
                  <Badge
                    className="mr-2"
                    key={category}
                    color={`${currentTransaction?.category === category ? "bg-blue-100 border border-blue-500" : "bg-gray-200"}`}
                    onPress={() =>
                      setCurrentTransaction((prev: any) => ({
                        ...prev,
                        category,
                      }))
                    }
                  >
                    <Text
                      className={
                        currentTransaction?.category === category
                          ? "text-blue-700"
                          : "text-gray-800"
                      }
                    >
                      {category}
                    </Text>
                  </Badge>
                ))}
              </ScrollView>
            </View>
            {errors.category && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.category}
              </Text>
            )}
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium mb-4 text-gray-600">Data</Text>
            <TouchableOpacity
              className={`border ${errors.date ? "border-red-500" : "border-gray-300"} p-3 flex-row justify-between items-center bg-white`}
              onPress={() => setShowTransactionDatePicker(true)}
            >
              <Text>
                {currentTransaction?.date
                  ? formatDate(currentTransaction.date)
                  : "Selecionar data"}
              </Text>
            </TouchableOpacity>
            {errors.date && (
              <Text className="text-red-500 text-xs mt-1">{errors.date}</Text>
            )}
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium mb-4 text-gray-600">
              Observações (opcional)
            </Text>
            <TextInput
              className="border border-gray-300 p-3 flex-row justify-between items-center bg-white"
              placeholder="Alguma informação adicional..."
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              value={currentTransaction?.notes || ""}
              onChangeText={(text) =>
                setCurrentTransaction((prev: any) => ({ ...prev, notes: text }))
              }
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium mb-4 text-gray-600">
              Comprovante (opcional)
            </Text>

            {receiptImage ? (
              <View className="mb-2">
                <Image
                  source={{ uri: receiptImage }}
                  className="w-full h-48 rounded-lg"
                  resizeMode="cover"
                />
                <TouchableOpacity
                  className="absolute top-2 right-2 bg-white w-8 h-8 rounded-full justify-center items-center"
                  onPress={() => setReceiptImage(null)}
                >
                  <Ionicons name="close" size={18} color="#666" />
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-row justify-between">
                <TouchableOpacity
                  className="flex-1 mr-2 py-2 px-3 bg-gray-200 rounded-lg justify-center items-center flex-row"
                  onPress={pickImage}
                >
                  <Ionicons
                    name="image-outline"
                    size={18}
                    color="#666"
                    className="mr-1"
                  />
                  <Text className="text-gray-800">Galeria</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 mx-1 py-2 px-3 bg-gray-200 rounded-lg justify-center items-center flex-row"
                  onPress={takePicture}
                >
                  <Ionicons
                    name="camera-outline"
                    size={18}
                    color="#666"
                    className="mr-1"
                  />
                  <Text className="text-gray-800">Câmera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 ml-2 py-2 px-3 bg-gray-200 rounded-lg justify-center items-center flex-row"
                  onPress={pickDocument}
                >
                  <Ionicons
                    name="document-outline"
                    size={18}
                    color="#666"
                    className="mr-1"
                  />
                  <Text className="text-gray-800">Arquivo</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <TouchableOpacity
            className="bg-blue-600 py-4 px-6 rounded-lg mb-6"
            onPress={saveTransaction}
          >
            <Text className="text-white text-center font-bold text-lg">
              {currentTransaction?.id ? "Atualizar" : "Adicionar"} Transação
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {showTransactionDatePicker && (
          <DateTimePicker
            value={currentTransaction?.date || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleTransactionDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>
    </BottomSheet>
  );
}

export default TransactionEdit;
