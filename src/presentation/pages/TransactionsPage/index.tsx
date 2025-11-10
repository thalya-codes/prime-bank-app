import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

import { Card } from "@/presentation/components";
import { Transaction, transactionQueries } from "@/presentation/features/transactions";
import { useDeleteTransactionMutation } from "@/presentation/features/transactions/mutations/delete-transaction-mutation";
import { useEditTransactionMutation } from "@/presentation/features/transactions/mutations/put-transaction-mutation";
import { showSuccessToast } from "@/utils/helpers";
import { currencyToNumbers } from "@/utils/masks";
import { TransactionValidations } from "@/utils/validations";
import { useQuery } from "@tanstack/react-query";
import {
  EmptyList,
  FilterPanel,
  FooterList,
  TransactionEdit,
  TransactionItem,
} from "./components";
import { FilterOptions } from "./types";

export function TransactionsPage() {
  const [refreshing, setRefreshing] = useState(false);

  // Estado para filtragem
  const [filters, setFilters] = useState<FilterOptions>({
    max: 0,
    min: 0,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [debouncedFilter, setDebouncedFilter] = useState({ max: 0, min: 0 });
  // Estado para o modal de editar transação
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const {
    data: transactionData,
    isLoading,
    isPlaceholderData,
    isFetching,
  } = useQuery(
    transactionQueries.list({
      itemsPerPage: itemsPerPage,
      minAmount: debouncedFilter.min === 0 ? undefined : debouncedFilter.min,
      maxAmount: debouncedFilter.max === 0 ? undefined : debouncedFilter.max,
    })
  );
  const { data: transactionDataDetail } = useQuery(
    transactionQueries.detail(currentTransaction?.id || "")
  );
  const { mutateAsync: editTransaction } = useEditTransactionMutation();
  const { mutateAsync: deleteTransactionById } = useDeleteTransactionMutation();

  const loadMoreTransactions = () => {
    if (!isPlaceholderData && transactionData?.pagination.hasMore) {
      setItemsPerPage((prev) => prev + 5);
    }
  };

  const handleRefresh = () => {
    if (!transactionData?.pagination?.hasMore) return;
    setRefreshing(true);
    setItemsPerPage(10);
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
    setDebouncedFilter(filters);
  };

  const resetFilters = () => {
    const resetedFilters = {
      min: 0,
      max: 0,
    };
    setFilters(resetedFilters);
    setDebouncedFilter(resetedFilters);
    setShowFilters(false);
  };

  const openEditTransactionModal = (transaction: Transaction) => {
    setCurrentTransaction({ ...transaction });
    setErrors({});
    setModalVisible(true);
  };

  const validateTransactionForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    const amountError = TransactionValidations.validateEditAmount(currentTransaction?.amount);
    if (amountError) {
      newErrors.amount = amountError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveTransaction = async () => {
    if (!validateTransactionForm()) {
      return;
    }

    try {
      if (currentTransaction?.id) {
        await editTransaction(currentTransaction);
        showSuccessToast("Transação atualizada com sucesso!");
      }

      setModalVisible(false);
      setCurrentTransaction(null);
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
      Alert.alert("Erro", "Não foi possível salvar a transação.");
    }
  };

  const handleFilters = (value: string, type: string) => {
    const numericValue = currencyToNumbers(value);
    setFilters((prev: any) => ({
      ...prev,
      [type]: numericValue,
    }));
  };

  const deleteTransaction = async (id: string) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta transação?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await deleteTransactionById(id);
            showSuccessToast("Transação excluída com sucesso!");
          },
        },
      ]
    );
  };

  const handleAmountChange = (text: string) => {
    const numericValue = currencyToNumbers(text);
    setCurrentTransaction((prev: any) => ({
      ...prev,
      amount: numericValue,
    }));
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TransactionItem
      item={item}
      openEditTransactionModal={openEditTransactionModal}
      deleteTransaction={deleteTransaction}
    />
  );

  const renderFooter = () => {
    if (!isLoading || !isFetching) return null;

    return <FooterList />;
  };

  const renderEmptyList = () => <EmptyList filters={filters} />;

  return (
    <View className="flex-1 bg-gray-100">
      {/* Painel de filtros */}
      <FilterPanel
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        setApplyFilters={handleApplyFilters}
        filters={filters}
        handleFilters={handleFilters}
        resetFilters={resetFilters}
        errors={errors}
      />

      {/* Lista de transações */}
      <Card className="px-4 mx-5 my-3 border border-gray-300">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-xl font-nunito-semi-bold">Extratos</Text>
          <TouchableOpacity
            className="p-2 border border-gray-300 rounded"
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="funnel-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={transactionData?.data}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 2 }}
          ListEmptyComponent={renderEmptyList}
          ListFooterComponent={renderFooter}
          onEndReached={loadMoreTransactions}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      </Card>

      {/* Modal de Editar Transação */}
      <TransactionEdit
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        transactionDetail={currentTransaction}
        errors={errors}
        handleAmountChange={handleAmountChange}
        saveTransaction={saveTransaction}
      />
    </View>
  );
}
