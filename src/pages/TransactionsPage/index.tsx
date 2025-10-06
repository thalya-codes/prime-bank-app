import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

import { Card } from "@/components";
import { transactionQueries, TransactionsData } from "@/features/transactions";
import { useDeleteTransactionMutation } from "@/features/transactions/mutations/delete-transaction-mutation";
import { useEditTransactionMutation } from "@/features/transactions/mutations/put-transaction-mutation";
import { useQuery } from "@tanstack/react-query";
import {
  EmptyList,
  FilterPanel,
  FooterList,
  TransactionEdit,
  TransactionItem,
} from "./components";
import { FilterOptions, FilterType } from "./types";

const filterType = Object.values(FilterType).map((item) => ({
  label: item.charAt(0).toUpperCase() + item.slice(1),
  value: item,
}));

export function TransactionsPage() {
  const [refreshing, setRefreshing] = useState(false);

  // Estado para filtragem
  const [filters, setFilters] = useState<FilterOptions>({
    startDate: null,
    endDate: null,
    category: undefined,
    type: FilterType.All,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Estado para o modal de editar transação
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<TransactionsData | null>(null);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const {
    data: transactionData,
    isLoading,
    isPlaceholderData,
  } = useQuery(
    transactionQueries.list({
      itemsPerPage: itemsPerPage,
      type: filters.type === FilterType.All ? undefined : filters.type,
      category: filters.category,
    })
  );
  const { mutateAsync: editTransaction } = useEditTransactionMutation();
  const { mutateAsync: deleteTransactionById } = useDeleteTransactionMutation();

  const loadMoreTransactions = () => {
    if (!isPlaceholderData) {
      setItemsPerPage((prev) => prev + 5);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setItemsPerPage(10);
  };

  const resetFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      category: "",
      type: FilterType.All,
    });
    setShowFilters(false);
  };

  const openEditTransactionModal = (transaction: TransactionsData) => {
    setCurrentTransaction({ ...transaction });
    setErrors({});
    setModalVisible(true);
  };

  const validateTransactionForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!currentTransaction?.description?.trim()) {
      newErrors.description = "Descrição é obrigatória";
    }

    if (!currentTransaction?.amount || currentTransaction.amount <= 0) {
      newErrors.amount = "Valor deve ser maior que zero";
    }

    if (!currentTransaction?.category) {
      newErrors.category = "Categoria é obrigatória";
    }

    if (!currentTransaction?.date) {
      newErrors.date = "Data é obrigatória";
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
        // Atualização de transação existente
        await editTransaction(currentTransaction);
        Alert.alert("Sucesso", "Transação atualizada com sucesso!");
      }

      setModalVisible(false);
      setCurrentTransaction(null);
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
      Alert.alert("Erro", "Não foi possível salvar a transação.");
    }
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
            Alert.alert("Sucesso", "Transação excluída com sucesso!");
          },
        },
      ]
    );
  };

  const handleAmountChange = (text: string) => {
    const numeric = text.replace(/\D/g, "");
    const numericValue = parseFloat(numeric) / 100;

    setCurrentTransaction((prev) => ({
      ...prev,
      amount: isNaN(numericValue) ? 0 : numericValue,
    }));
  };

  const renderTransaction = ({ item }: { item: TransactionsData }) => (
    <TransactionItem
      item={item}
      openEditTransactionModal={openEditTransactionModal}
      deleteTransaction={deleteTransaction}
    />
  );

  const renderFooter = () => {
    if (!isLoading) return null;

    return <FooterList />;
  };

  const renderEmptyList = () => <EmptyList filters={filters} />;

  return (
    <View className="flex-1 bg-gray-100">
      {/* Painel de filtros */}
      <FilterPanel
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filterType={filterType}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
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
          data={transactionData}
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
        currentTransaction={currentTransaction}
        setCurrentTransaction={setCurrentTransaction}
        errors={errors}
        handleAmountChange={handleAmountChange}
        saveTransaction={saveTransaction}
      />
    </View>
  );
}
