import Button from "@/components/Button";
import Card from "@/components/Card";
import { InputField } from "@/components/Input/InputField";
import Select from "@/components/Select";
import { currencyMasks, currencyToNumbers } from "@/utils/masks";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface TransactionType {
  value: string;
  label: string;
}

const TRANSACTION_TYPES: TransactionType[] = [
  { value: "receita", label: "Receita" },
  { value: "despesa", label: "Despesa" },
  { value: "transferencia", label: "Transferência" },
];

export function HomePage() {
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<string>("");
  const [transactionValue, setTransactionValue] = useState<string>("");
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true);

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleTransactionSubmit = () => {
    if (!selectedTransactionType || !transactionValue) {
      return;
    }
    const numericValue = currencyToNumbers(transactionValue);

    // Lógica para processar a transação
    console.log("Transação:", {
      type: selectedTransactionType,
      value: numericValue,
      formattedValue: transactionValue,
    });

    // Limpar campos após conclusão
    setSelectedTransactionType("");
    setTransactionValue("");
  };

  const handleValueChange = (value: string) => {
    const maskedValue = currencyMasks(value);
    setTransactionValue(maskedValue);
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-50"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4 py-6 pb-12">
        {/* Header com saudação */}
        <Card
          color="light-green"
          className="py-4 mb-6 border border-brand-400 shadow-black/30 "
        >
          <Text className="mb-1 text-lg font-nunito-medium text-brand-700">
            Olá, Joana!👋
          </Text>
          <Text className="text-sm font-nunito-regular text-brand-600">
            {currentDate}
          </Text>
        </Card>

        {/* Card do saldo */}
        <Card color="strong-green" className="mb-6 shadow-black/30">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="mb-2 text-sm font-nunito-regular text-neutral-0">
                Saldo disponível ——
              </Text>
              <Text className="text-3xl font-nunito-bold text-neutral-0">
                {isBalanceVisible ? "R$ 3800,52" : "R$ ****,**"}
              </Text>
            </View>
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              <Ionicons
                name={isBalanceVisible ? "eye" : "eye-off"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Seção Nova Transação */}
        <Card
          className="shadow-black/20 py-3 min-h-[300px]"
          style={{ overflow: "visible" }}
        >
          <View className="flex-row items-center mb-6">
            <Ionicons name="add-sharp" size={24} color="#28B2AA" />
            <Text className="ml-2 text-lg font-nunito-semi-bold text-neutral-900">
              Nova transação
            </Text>
          </View>

          <View className="flex-1" style={{ overflow: "visible" }}>
            {/* Campo Tipo de transação */}
            <View className="mb-4" style={{ zIndex: 10, overflow: "visible" }}>
              <Text className="mb-3 text-base font-nunito-medium text-neutral-900">
                Tipo de transação
              </Text>
              <View
                className="bg-white border rounded-md border-neutral-300"
                style={{ overflow: "visible" }}
              >
                <Select
                  data={TRANSACTION_TYPES}
                  value={selectedTransactionType}
                  onChange={value => setSelectedTransactionType(String(value))}
                  placeholder="Selecione o tipo"
                />
              </View>
            </View>

            {/* Campo Valor */}
            <View className="mb-8">
              <Text className="mb-3 text-base font-nunito-medium text-neutral-900">
                Valor(R$)
              </Text>
              <View className="bg-white border rounded-md border-neutral-300">
                <InputField
                  placeholder="0,00"
                  value={transactionValue}
                  onChangeText={handleValueChange}
                  keyboardType="numeric"
                  className="px-3 py-3 text-base font-nunito-regular"
                />
              </View>
            </View>

            {/* Botão Concluir */}
            <View className="mt-auto">
              <Button
                text="Concluir transação"
                variant="primary"
                onPress={handleTransactionSubmit}
                className="flex-row items-center justify-center"
              >
                <Ionicons name="checkmark" size={20} color="white" />
              </Button>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
