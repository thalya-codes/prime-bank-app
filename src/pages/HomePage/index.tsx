import Button from "@/components/Button";
import Card from "@/components/Card";
import { InputField } from "@/components/Input/InputField";
import { useGetBankAccount } from "@/features/bankAccount/queries";
import { useGetUser } from "@/features/user/queries";
import { useDropdownAnimation } from "@/hooks";
import useGeneralInfos from "@/store/generalInfosStore";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Toast } from "toastify-react-native";
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
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true);
  const [transactionValue, setTransactionValue] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("");
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [buttonLayout, setButtonLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const { animatedHeight, open, close } = useDropdownAnimation(0, 150);
  const { data: user } = useGetUser();
  const { data: bankAccount } = useGetBankAccount();
  const { setName } = useGeneralInfos();
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const toggleSelectDropdown = () => {
    if (isSelectOpen) {
      close();
      setIsSelectOpen(false);
    } else {
      open();
      setIsSelectOpen(true);
    }
  };

  const handleSelectOption = (value: string) => {
    setTransactionType(value);
    close();
    setIsSelectOpen(false);
  };

  const handleValueChange = (value: string) => {
    setTransactionValue(value);
  };

  const handleTransactionSubmit = () => {
    if (!transactionValue || transactionValue === "0,00") {
      Toast.show({
        autoHide: true,
        text1: "Por favor, insira um valor válido",
        type: "error",
      });
      return;
    }

    // TODO: Implement transaction submission logic here
    Toast.show({
      autoHide: true,
      text1: "Transação realizada com sucesso!",
      type: "success",
    });

    // Reset the form
    setTransactionValue("");
  };

  const handleCopyAccountNumber = async () => {
    try {
      await Clipboard.setStringAsync(String(bankAccount?.bankAccountNumber));
      Toast.show({
        autoHide: true,
        text1: "Número da conta copiado",
        type: "success",
      });
    } catch {
      Toast.show({
        autoHide: true,
        text1: "Não foi possível copiar o número da conta.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    setName(user?.fullName);
  }, [setName, user?.fullName]);
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
            Olá, {user?.fullName}!👋
          </Text>
          <Text className="text-sm font-nunito-regular text-brand-600">
            {currentDate}
          </Text>
          <View className="items-center ">
            <Text className="pt-2 text-lg font-bold font-nunito-regular text-brand-600">
              Numero da conta:
            </Text>
            <Text className="pt-2 text-lg font-bold font-nunito-regular text-brand-600">
              {bankAccount?.bankAccountNumber}{" "}
            </Text>
            <TouchableOpacity onPress={handleCopyAccountNumber}>
              <FontAwesome name="paste" size={20} color={"#249695"} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Card do saldo */}
        <Card color="strong-green" className="mb-6 shadow-black/30">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="mb-2 text-sm font-nunito-regular text-neutral-0">
                Saldo disponível ——
              </Text>
              <Text className="text-3xl font-nunito-bold text-neutral-0">
                {isBalanceVisible ? `R$ ${bankAccount?.balance}` : "R$ ****,**"}
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
            {/* Campo Tipo de Transação */}
            <View className="mb-6" style={{ zIndex: 10 }}>
              <Text className="mb-3 text-base font-nunito-medium text-neutral-900">
                Tipo de transação
              </Text>
              <View className="relative">
                <TouchableOpacity
                  onPress={toggleSelectDropdown}
                  onLayout={e => setButtonLayout(e.nativeEvent.layout)}
                  className="bg-white border rounded-md border-neutral-300 px-3 py-3"
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="text-base font-nunito-regular text-neutral-700">
                      {transactionType
                        ? TRANSACTION_TYPES.find(
                            t => t.value === transactionType
                          )?.label
                        : "Selecione o tipo"}
                    </Text>
                    <Ionicons
                      name={isSelectOpen ? "chevron-up" : "chevron-down"}
                      size={20}
                      color="#666"
                    />
                  </View>
                </TouchableOpacity>

                {isSelectOpen && buttonLayout && (
                  <Animated.View
                    style={{
                      height: animatedHeight,
                      overflow: "hidden",
                      position: "absolute",
                      top: buttonLayout.height + 4,
                      left: 0,
                      right: 0,
                      zIndex: 9999,
                      elevation: 10,
                      backgroundColor: "white",
                      borderRadius: 8,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.4,
                      shadowRadius: 8,
                    }}
                  >
                    <ScrollView
                      style={{ backgroundColor: "white" }}
                      showsVerticalScrollIndicator={false}
                    >
                      {TRANSACTION_TYPES.map((type, index) => (
                        <TouchableOpacity
                          key={type.value}
                          onPress={() => handleSelectOption(type.value)}
                          className="flex-row items-center gap-2 p-3 bg-white border-b border-gray-200 active:bg-gray-50"
                          style={{ backgroundColor: "white" }}
                        >
                          <Text className="text-base font-nunito-regular text-neutral-900">
                            {type.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </Animated.View>
                )}
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
