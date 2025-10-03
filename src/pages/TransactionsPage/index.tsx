import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

import { Card } from "@/components";
import {
  EmptyList,
  FilterPanel,
  FooterList,
  TransactionEdit,
  TransactionItem,
} from "./components";
import {
  MOCK_CATEGORIES,
  MOCK_TRANSACTIONS,
  Transaction,
} from "./data";

export enum FilterType {
  All = "all",
  Income = "income",
  Expense = "expense",
}

interface FilterOptions {
  startDate: Date | null;
  endDate: Date | null;
  category: string;
  type: FilterType;
}

const filterType = Object.values(FilterType).map((item) => ({
  label: item.charAt(0).toUpperCase() + item.slice(1),
  value: item,
}));

// Dados mock para testes (substituir pelo Firebase posteriormente)
const filterCategories = MOCK_CATEGORIES.map((item) => ({
  label: item,
  value: item,
}));

export function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Estado para filtragem
  const [filters, setFilters] = useState<FilterOptions>({
    startDate: null,
    endDate: null,
    category: "",
    type: FilterType.All,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState<
    "startDate" | "endDate" | null
  >(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Estado para o modal de editar transação
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<Partial<Transaction> | null>(null);
  const [showTransactionDatePicker, setShowTransactionDatePicker] =
    useState(false);
  const [receiptImage, setReceiptImage] = useState<string | null>(null);

  // Validação
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Carregar transações iniciais
  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Aplicar filtros
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, transactions]);

  const fetchTransactions = async (refresh = false) => {
    try {
      setLoading(true);

      // Simula um tempo de carregamento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (refresh) {
        setTransactions(MOCK_TRANSACTIONS);
        setPage(1);
        setHasMoreData(true);
      } else if (page === 1) {
        setTransactions(MOCK_TRANSACTIONS);
      } else if (page > 1 && hasMoreData) {
        // Simula carregamento de mais dados em paginação
        const moreTransactions = MOCK_TRANSACTIONS.map((t) => ({
          ...t,
          id: `transaction-${page}-${t.id}`,
          description: `${t.description} (Página ${page})`,
        }));

        setTransactions((prev) => [...prev, ...moreTransactions]);
        setHasMoreData(page < 3); // Limita a 3 páginas para o exemplo
      }
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
      Alert.alert("Erro", "Não foi possível carregar as transações.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadMoreTransactions = () => {
    if (!loading && hasMoreData) {
      setPage((prev) => prev + 1);
      fetchTransactions();
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchTransactions(true);
  };

  const applyFilters = useCallback(() => {
    let filtered = [...transactions];

    // Filtro por tipo
    if (filters.type !== FilterType.All) {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    // Filtro por categoria
    if (filters.category) {
      filtered = filtered.filter((t) => t.category === filters.category);
    }

    // Filtro por data inicial
    if (filters.startDate) {
      filtered = filtered.filter((t) => t.date >= filters.startDate!);
    }

    // Filtro por data final
    if (filters.endDate) {
      const endDateTime = new Date(filters.endDate);
      endDateTime.setHours(23, 59, 59, 999);
      filtered = filtered.filter((t) => t.date <= endDateTime);
    }

    setFilteredTransactions(filtered);
  }, [transactions, filters]);

  const resetFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      category: "",
      type: FilterType.All,
    });
    setShowFilters(false);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);

    if (selectedDate && selectedDateField) {
      setFilters((prev) => ({
        ...prev,
        [selectedDateField]: selectedDate,
      }));
    }

    setSelectedDateField(null);
  };

  const handleTransactionDateChange = (event: any, selectedDate?: Date) => {
    setShowTransactionDatePicker(false);

    if (selectedDate && currentTransaction) {
      setCurrentTransaction((prev) => ({
        ...prev,
        date: selectedDate,
      }));
    }
  };

  const openEditTransactionModal = (transaction: Transaction) => {
    setCurrentTransaction({ ...transaction });
    setErrors({});
    setReceiptImage(transaction.receiptUrl || null);
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
      setLoading(true);

      // Simula um tempo de processamento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (currentTransaction?.id) {
        // Atualização de transação existente
        const updatedTransactions = transactions.map((t) =>
          t.id === currentTransaction.id
            ? { ...(currentTransaction as Transaction) }
            : t
        );
        setTransactions(updatedTransactions);
        Alert.alert("Sucesso", "Transação atualizada com sucesso!");
      }

      setModalVisible(false);
      setCurrentTransaction(null);
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
      Alert.alert("Erro", "Não foi possível salvar a transação.");
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = (id: string) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta transação?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setTransactions((prev) => prev.filter((t) => t.id !== id));
            Alert.alert("Sucesso", "Transação excluída com sucesso!");
          },
        },
      ]
    );
  };

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permissão negada",
          "Precisamos de permissão para acessar sua galeria"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setReceiptImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
    }
  };

  const takePicture = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permissão negada",
          "Precisamos de permissão para acessar sua câmera"
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setReceiptImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao tirar foto:", error);
      Alert.alert("Erro", "Não foi possível tirar a foto.");
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        copyToCacheDirectory: true,
      });

      if (result.canceled === false) {
        setReceiptImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar documento:", error);
      Alert.alert("Erro", "Não foi possível selecionar o documento.");
    }
  };

  const handleAmountChange = (text: string) => {
    const numeric = text.replace(/\D/g, "");
    const numericValue = parseFloat(numeric) / 100;

    setCurrentTransaction((prev) => ({
      ...prev,
      amount: isNaN(numericValue) ? 0 : numericValue,
    }));
  };

  const renderCategories = [
    currentTransaction?.category,
    ...MOCK_CATEGORIES.filter((cat) => cat !== currentTransaction?.category),
  ].filter(Boolean);

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TransactionItem
      item={item}
      openEditTransactionModal={openEditTransactionModal}
      deleteTransaction={deleteTransaction}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;

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
        filterCategory={filterCategories}
        setSelectedDateField={setSelectedDateField}
        setShowDatePicker={setShowDatePicker}
        resetFilters={resetFilters}
        showDatePicker={showDatePicker}
        selectedDateField={selectedDateField}
        handleDateChange={handleDateChange}
      />

      {/* Lista de transações */}
      <Card className="border border-gray-300 mx-5 my-3 px-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-xl font-nunito-semi-bold">Extratos</Text>
          <TouchableOpacity
            className="border rounded p-2 border-gray-300"
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="funnel-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredTransactions}
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
        renderCategories={renderCategories}
        receiptImage={receiptImage}
        setReceiptImage={setReceiptImage}
        showTransactionDatePicker={showTransactionDatePicker}
        setShowTransactionDatePicker={setShowTransactionDatePicker}
        pickImage={pickImage}
        takePicture={takePicture}
        pickDocument={pickDocument}
        saveTransaction={saveTransaction}
        handleTransactionDateChange={handleTransactionDateChange}
      />
    </View>
  );
}
