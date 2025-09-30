import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { InputField } from "@/components/Input/InputField";

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
      // Aqui você pode adicionar validação
      return;
    }

    // Lógica para processar a transação
    console.log("Transação:", {
      type: selectedTransactionType,
      value: transactionValue,
    });

    // Limpar campos após conclusão
    setSelectedTransactionType("");
    setTransactionValue("");
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <View className="flex-1 bg-neutral-50 px-4 py-6">
      {/* Header com saudação */}
      <Card
        color="light-green"
        className="mb-6 border border-brand-400 shadow-black/30
        py-4
        "
      >
        <Text className="font-nunito-medium text-lg text-brand-700 mb-1">
          Olá, Joana!👋
        </Text>
        <Text className="font-nunito-regular text-sm text-brand-600">
          {currentDate}
        </Text>
      </Card>

      {/* Card do saldo */}
      <Card color="strong-green" className="mb-6 shadow-black/30">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="font-nunito-regular text-sm text-neutral-0 mb-2">
              Saldo disponível ——
            </Text>
            <Text className="font-nunito-bold text-3xl text-neutral-0">
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
      <Card className="flex-1 shadow-black/20 py-3">
        <View className="flex-row items-center mb-6">
          <Ionicons name="add" size={20} color="#28B2AA" />
          <Text className="font-nunito-semi-bold text-lg text-neutral-900 ml-2">
            Nova transação
          </Text>
        </View>

        <View className="flex-1">
          {/* Campo Tipo de transação */}
          <View className="mb-4">
            <Text className="font-nunito-medium text-base text-neutral-900 mb-3">
              Tipo de transação
            </Text>
            <Select
              data={TRANSACTION_TYPES}
              value={selectedTransactionType}
              onChange={value => setSelectedTransactionType(String(value))}
              placeholder="Selecione o tipo"
            />
          </View>

          {/* Campo Valor */}
          <View className="mb-8">
            <Text className="font-nunito-medium text-base text-neutral-900 mb-3">
              Valor(R$)
            </Text>
            <View className="border border-neutral-300 rounded-md bg-white">
              <InputField
                placeholder="0,0"
                value={transactionValue}
                onChangeText={setTransactionValue}
                keyboardType="numeric"
                className="px-3 py-3 font-nunito-regular text-base"
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
  );
}
