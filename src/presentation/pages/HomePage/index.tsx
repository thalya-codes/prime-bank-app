import { HomeSkeleton, ReceiptUpload } from "@/presentation/components";
import Button from "@/presentation/components/Button";
import Card from "@/presentation/components/Card";
import { InputField } from "@/presentation/components/Input/InputField";
import { TRANSACTION_TYPES } from "@/presentation/constants/transactionTypes";
import { useGetBankAccount } from "@/presentation/features/bankAccount/queries";
import { useCreateTransactionMutation } from "@/presentation/features/transactions/mutations";
import { TransactionType } from "@/presentation/features/transactions/types";
import { useGetUser } from "@/presentation/features/user/queries";
import { useDropdownAnimation } from "@/presentation/hooks";
import useAuthStore from "@/presentation/store/useAuthStore";
import {
  buildTransactionData,
  copyToClipboard,
  extractErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/utils/helpers";
import { currencyMasks, currencyToNumbers } from "@/utils/masks";
import { TransactionValidations } from "@/utils/validations";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function HomePage() {
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true);
  const [transactionType, setTransactionType] = useState<TransactionType | "">(
    ""
  );
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  const [buttonLayout, setButtonLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const { animatedHeight, open, close } = useDropdownAnimation(0, 150);
  const [transactionValue, setTransactionValue] = useState<number>(0.0);
  const [targetAccountNumber, setTargetAccountNumber] = useState<string>("");
  const {
    data: user,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    isLoadingError: isUserLoadingError,
    refetch: refetchUser,
  } = useGetUser();

  const {
    data: bankAccount,
    isLoading: isBankAccountLoading,
    isFetching: isBankAccountFetching,
    refetch: refetchBankAccount,
    isLoadingError: isBankAccountLoadingError,
  } = useGetBankAccount();
  const { uid } = useAuthStore();
  const createTransactionMutation = useCreateTransactionMutation();
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const isHomeSkeletonVisible =
    (!user && (isUserLoading || isUserFetching || isUserFetching)) ||
    (!bankAccount && (isBankAccountLoading || isBankAccountFetching));

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

  const handleSelectOption = (value: TransactionType) => {
    setTransactionType(value);
    close();
    setIsSelectOpen(false);
  };

  const handleValueChange = (value: string) => {
    setTransactionValue(value);
  };

  const handleTargetAccountChange = (value: string) => {
    setTargetAccountNumber(value);
  };

  const handleReceiptSelected = (file: any) => {
    if (file) {
      setSelectedReceipt(file);
    }
  };

  const resetTransactionForm = () => {
    setTransactionValue(0.0);
    setTransactionType("");
    setSelectedReceipt(null);
    setTargetAccountNumber("");
    setTargetAccountNumber("");
  };

  const handleTransactionSubmit = () => {
    const amount = currencyToNumbers(transactionValue.toString());
    const fromAccountNumber = bankAccount?.bankAccountNumber;
    const accountId = bankAccount?.id;

    const validationError = TransactionValidations.validateCreateTransaction({
      amount: amount || 0,
      type: transactionType,
      fromAccountNumber: fromAccountNumber || "",
      toAccountNumber: targetAccountNumber,
      bankAccountId: accountId,
      userId: uid,
    });

    if (validationError) {
      showErrorToast(validationError);
      return;
    }

    const transactionData = buildTransactionData(
      fromAccountNumber,
      targetAccountNumber,
      amount,
      selectedReceipt,
      "others",
      transactionType
    );

    createTransactionMutation.mutate(transactionData, {
      onSuccess: async () => {
        showSuccessToast("Transação realizada com sucesso!");
        await refetchBankAccount();
        resetTransactionForm();
      },
      onError: (error: any) => {
        showErrorToast("Erro ao criar transação", extractErrorMessage(error));
      },
    });

    resetTransactionForm();
  };
  const handleCopyAccountNumber = async () => {
    await copyToClipboard(
      String(bankAccount?.bankAccountNumber),
      "Número da conta copiado",
      "Não foi possível copiar o número da conta."
    );
  };

  useEffect(() => {
    if (isUserLoadingError) refetchUser();
  }, [isUserLoadingError, refetchUser]);

  useEffect(() => {
    if (isBankAccountLoadingError) refetchBankAccount();
  }, [isBankAccountLoadingError, refetchBankAccount]);

  if (isHomeSkeletonVisible) {
    return (
      <ScrollView
        className='flex-1 bg-neutral-50'
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className='px-4 py-6 pb-12'>
          <HomeSkeleton />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      className='flex-1 bg-neutral-50'
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View className='px-4 py-6 pb-12'>
        {/* Header com saudação */}
        <Card
          color='light-green'
          className='py-4 mb-6 border border-brand-400 shadow-black/30 '
        >
          <Text className='mb-1 text-lg font-nunito-medium text-brand-700'>
            Olá, {user?.firstName}!👋
          </Text>
          <Text className='text-sm font-nunito-regular text-brand-600'>
            {currentDate}
          </Text>
          <View className='items-center '>
            <Text className='pt-2 text-lg font-bold font-nunito-regular text-brand-600'>
              Numero da conta:
            </Text>
            <Text className='pt-2 text-lg font-bold font-nunito-regular text-brand-600'>
              {bankAccount?.formattedAccountNumber()}{" "}
            </Text>
            <TouchableOpacity onPress={handleCopyAccountNumber}>
              <FontAwesome name='paste' size={20} color={"#249695"} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Card do saldo */}
        <Card color='strong-green' className='mb-6 shadow-black/30'>
          <View className='flex-row items-center justify-between'>
            <View>
              <Text className='mb-2 text-sm font-nunito-regular text-neutral-0'>
                Saldo disponível ——
              </Text>
              <Text className='text-3xl font-nunito-bold text-neutral-0'>
                {isBalanceVisible
                  ? bankAccount?.formattedBalance() || "R$ 0,00"
                  : "R$ ****"}
              </Text>
            </View>
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              <Ionicons
                name={isBalanceVisible ? "eye" : "eye-off"}
                size={24}
                color='white'
              />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Seção Nova Transação */}
        <Card
          className='shadow-black/20 py-3 min-h-[300px]'
          style={{ overflow: "visible" }}
        >
          <View className='flex-row items-center mb-6'>
            <Ionicons name='add-sharp' size={24} color='#28B2AA' />
            <Text className='ml-2 text-lg font-nunito-semi-bold text-neutral-900'>
              Nova transação
            </Text>
          </View>

          <View className='flex-1' style={{ overflow: "visible" }}>
            {/* Campo Tipo de Transação */}
            <View className='mb-6' style={{ zIndex: 10 }}>
              <Text className='mb-3 text-base font-nunito-medium text-neutral-900'>
                Tipo de transação
              </Text>
              <View className='relative'>
                <TouchableOpacity
                  onPress={toggleSelectDropdown}
                  onLayout={(e) => setButtonLayout(e.nativeEvent.layout)}
                  className='px-3 py-3 bg-white border rounded-md border-neutral-300'
                >
                  <View className='flex-row items-center justify-between'>
                    <Text className='text-base font-nunito-regular text-neutral-700'>
                      {transactionType
                        ? TRANSACTION_TYPES.find(
                            (t) => t.value === transactionType
                          )?.label
                        : "Selecione o tipo"}
                    </Text>
                    <Ionicons
                      name={isSelectOpen ? "chevron-up" : "chevron-down"}
                      size={20}
                      color='#666'
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
                          className='flex-row items-center gap-2 p-3 bg-white border-b border-gray-200 active:bg-gray-50'
                          style={{ backgroundColor: "white" }}
                        >
                          <Text className='text-base font-nunito-regular text-neutral-900'>
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
            <View className='mb-8'>
              <Text className='mb-3 text-base font-nunito-medium text-neutral-900'>
                Valor (R$)
              </Text>
              <View className='bg-white border rounded-md border-neutral-300'>
                <InputField
                  placeholder='R$ 0,00'
                  value={currencyMasks(transactionValue)}
                  onChangeText={handleValueChange}
                  keyboardType='numeric'
                  className='px-3 py-3 text-base font-nunito-regular'
                />
              </View>
            </View>

            {/* Campo conta de destino */}
            <View className='mb-8'>
              <Text className='mb-3 text-base font-nunito-medium text-neutral-900'>
                Conta de destino
              </Text>
              <View className='bg-white border rounded-md border-neutral-300'>
                <InputField
                  value={targetAccountNumber}
                  onChangeText={handleTargetAccountChange}
                  keyboardType='numeric'
                  className='px-3 py-3 text-base font-nunito-regular'
                />
              </View>
            </View>

            {/* Botão Concluir */}
            <View className='mt-auto'>
              <Button
                text='Concluir transação'
                variant='primary'
                onPress={handleTransactionSubmit}
                className='flex-row items-center justify-center'
              >
                <Ionicons name='checkmark' size={20} color='white' />
              </Button>
            </View>
          </View>
        </Card>

        {/* Upload de recibo */}
        <View className='mt-6'>
          <ReceiptUpload
            onFileSelected={handleReceiptSelected}
            selectedFile={selectedReceipt}
          />
        </View>
      </View>
    </ScrollView>
  );
}

