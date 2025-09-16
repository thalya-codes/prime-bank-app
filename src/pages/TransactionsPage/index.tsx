import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Tipos
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
  receiptUrl?: string;
  notes?: string;
}

interface FilterOptions {
  startDate: Date | null;
  endDate: Date | null;
  category: string;
  type: 'all' | 'income' | 'expense';
  searchTerm: string;
}

// Dados mock para testes (substituir pelo Firebase posteriormente)
const MOCK_CATEGORIES = [
  'Alimentação', 'Transporte', 'Lazer', 'Saúde',
  'Educação', 'Moradia', 'Vestuário', 'Outros',
  'Salário', 'Investimentos', 'Presentes', 'Freelance'
];

const MOCK_TRANSACTIONS: Transaction[] = Array(20).fill(0).map((_, index) => ({
  id: `transaction-${index}`,
  description: `Transação ${index + 1}`,
  amount: Math.random() * 1000,
  type: Math.random() > 0.5 ? 'income' : 'expense',
  category: MOCK_CATEGORIES[Math.floor(Math.random() * MOCK_CATEGORIES.length)],
  date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
  notes: Math.random() > 0.7 ? 'Alguma observação sobre esta transação' : undefined
}));

export function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Estado para filtragem
  const [filters, setFilters] = useState<FilterOptions>({
    startDate: null,
    endDate: null,
    category: '',
    type: 'all',
    searchTerm: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState<'startDate' | 'endDate' | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Estado para o modal de adicionar/editar transação
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Partial<Transaction> | null>(null);
  const [showTransactionDatePicker, setShowTransactionDatePicker] = useState(false);
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
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (refresh) {
        setTransactions(MOCK_TRANSACTIONS);
        setPage(1);
        setHasMoreData(true);
      } else if (page === 1) {
        setTransactions(MOCK_TRANSACTIONS);
      } else if (page > 1 && hasMoreData) {
        // Simula carregamento de mais dados em paginação
        const moreTransactions = MOCK_TRANSACTIONS.map(t => ({
          ...t,
          id: `transaction-${page}-${t.id}`,
          description: `${t.description} (Página ${page})`
        }));

        setTransactions(prev => [...prev, ...moreTransactions]);
        setHasMoreData(page < 3); // Limita a 3 páginas para o exemplo
      }
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
      Alert.alert('Erro', 'Não foi possível carregar as transações.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadMoreTransactions = () => {
    if (!loading && hasMoreData) {
      setPage(prev => prev + 1);
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

    // Filtro por termo de busca
    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(searchTermLower) ||
        t.category.toLowerCase().includes(searchTermLower) ||
        (t.notes && t.notes.toLowerCase().includes(searchTermLower))
      );
    }

    // Filtro por tipo
    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    // Filtro por categoria
    if (filters.category) {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    // Filtro por data inicial
    if (filters.startDate) {
      filtered = filtered.filter(t => t.date >= filters.startDate!);
    }

    // Filtro por data final
    if (filters.endDate) {
      const endDateTime = new Date(filters.endDate);
      endDateTime.setHours(23, 59, 59, 999);
      filtered = filtered.filter(t => t.date <= endDateTime);
    }

    setFilteredTransactions(filtered);
  }, [transactions, filters]);

  const resetFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      category: '',
      type: 'all',
      searchTerm: '',
    });
    setShowFilters(false);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);

    if (selectedDate && selectedDateField) {
      setFilters(prev => ({
        ...prev,
        [selectedDateField]: selectedDate
      }));
    }

    setSelectedDateField(null);
  };

  const handleTransactionDateChange = (event: any, selectedDate?: Date) => {
    setShowTransactionDatePicker(false);

    if (selectedDate && currentTransaction) {
      setCurrentTransaction(prev => ({
        ...prev,
        date: selectedDate
      }));
    }
  };

  const openAddTransactionModal = () => {
    setCurrentTransaction({
      type: 'expense',
      date: new Date(),
      amount: 0
    });
    setErrors({});
    setReceiptImage(null);
    setModalVisible(true);
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
      newErrors.description = 'Descrição é obrigatória';
    }

    if (!currentTransaction?.amount || currentTransaction.amount <= 0) {
      newErrors.amount = 'Valor deve ser maior que zero';
    }

    if (!currentTransaction?.category) {
      newErrors.category = 'Categoria é obrigatória';
    }

    if (!currentTransaction?.date) {
      newErrors.date = 'Data é obrigatória';
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
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (currentTransaction?.id) {
        // Atualização de transação existente
        const updatedTransactions = transactions.map(t =>
          t.id === currentTransaction.id ? { ...currentTransaction as Transaction } : t
        );
        setTransactions(updatedTransactions);
        Alert.alert('Sucesso', 'Transação atualizada com sucesso!');
      } else {
        // Nova transação
        const newTransaction = {
          ...currentTransaction,
          id: `transaction-new-${Date.now()}`,
        } as Transaction;

        setTransactions(prev => [newTransaction, ...prev]);
        Alert.alert('Sucesso', 'Transação adicionada com sucesso!');
      }

      setModalVisible(false);
      setCurrentTransaction(null);
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
      Alert.alert('Erro', 'Não foi possível salvar a transação.');
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta transação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setTransactions(prev => prev.filter(t => t.id !== id));
            Alert.alert('Sucesso', 'Transação excluída com sucesso!');
          }
        }
      ]
    );
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permissão negada', 'Precisamos de permissão para acessar sua galeria');
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
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  const takePicture = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permissão negada', 'Precisamos de permissão para acessar sua câmera');
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
      console.error('Erro ao tirar foto:', error);
      Alert.alert('Erro', 'Não foi possível tirar a foto.');
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (result.canceled === false) {
        setReceiptImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao selecionar documento:', error);
      Alert.alert('Erro', 'Não foi possível selecionar o documento.');
    }
  };

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TouchableOpacity
      className="bg-white rounded-lg p-4 mb-3 shadow-sm"
      onPress={() => openEditTransactionModal(item)}
    >
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-lg font-semibold flex-1">{item.description}</Text>
        <Text
          className={`text-lg font-bold ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}
        >
          {item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
        </Text>
      </View>

      <View className="flex-row justify-between items-center mb-1">
        <View className="flex-row items-center">
          <Text className="text-sm text-gray-600 mr-2">Categoria:</Text>
          <View className="bg-gray-200 px-2 py-1 rounded-full">
            <Text className="text-xs">{item.category}</Text>
          </View>
        </View>
        <Text className="text-sm text-gray-600">{formatDate(item.date)}</Text>
      </View>

      {item.notes && (
        <Text className="text-sm text-gray-500 mt-1" numberOfLines={1}>
          {item.notes}
        </Text>
      )}

      {item.receiptUrl && (
        <View className="flex-row items-center mt-2">
          <Ionicons name="receipt-outline" size={16} color="#666" />
          <Text className="text-xs text-gray-600 ml-1">Comprovante anexado</Text>
        </View>
      )}

      <TouchableOpacity
        className="absolute top-2 right-2"
        onPress={() => deleteTransaction(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#F87171" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View className="py-4">
        <ActivityIndicator size="small" color="#3B82F6" />
      </View>
    );
  };

  const renderEmptyList = () => (
    <View className="flex-1 justify-center items-center py-12">
      <Ionicons name="receipt-outline" size={64} color="#CBD5E1" />
      <Text className="text-lg text-gray-400 mt-4 text-center">
        Nenhuma transação encontrada
      </Text>
      <Text className="text-sm text-gray-400 mt-2 text-center">
        {filters.searchTerm || filters.category || filters.type !== 'all' || filters.startDate || filters.endDate
          ? 'Tente ajustar os filtros'
          : 'Adicione sua primeira transação tocando no botão +'}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
      {/* Cabeçalho */}
      <View className="bg-blue-600 pt-12 pb-4 px-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-2xl font-bold">Transações</Text>
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
            <Ionicons name="options-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-full px-4 py-2 flex-row items-center">
          <Ionicons name="search-outline" size={20} color="#94A3B8" />
          <TextInput
            className="flex-1 ml-2 text-gray-800"
            placeholder="Buscar transações..."
            value={filters.searchTerm}
            onChangeText={(text) => setFilters(prev => ({ ...prev, searchTerm: text }))}
          />
          {filters.searchTerm ? (
            <TouchableOpacity onPress={() => setFilters(prev => ({ ...prev, searchTerm: '' }))}>
              <Ionicons name="close-circle-outline" size={20} color="#94A3B8" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Painel de filtros */}
      {showFilters && (
        <View className="bg-white p-4 mb-2 shadow-sm">
          <Text className="text-lg font-bold mb-3 text-gray-800">Filtros</Text>

          <View className="mb-3">
            <Text className="text-sm font-medium mb-1 text-gray-600">Tipo</Text>
            <View className="flex-row">
              <TouchableOpacity
                className={`py-2 px-4 rounded-full mr-2 ${filters.type === 'all' ? 'bg-blue-100 border border-blue-500' : 'bg-gray-200'}`}
                onPress={() => setFilters(prev => ({ ...prev, type: 'all' }))}
              >
                <Text className={filters.type === 'all' ? 'text-blue-700' : 'text-gray-800'}>Todos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`py-2 px-4 rounded-full mr-2 ${filters.type === 'income' ? 'bg-green-100 border border-green-500' : 'bg-gray-200'}`}
                onPress={() => setFilters(prev => ({ ...prev, type: 'income' }))}
              >
                <Text className={filters.type === 'income' ? 'text-green-700' : 'text-gray-800'}>Receitas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`py-2 px-4 rounded-full ${filters.type === 'expense' ? 'bg-red-100 border border-red-500' : 'bg-gray-200'}`}
                onPress={() => setFilters(prev => ({ ...prev, type: 'expense' }))}
              >
                <Text className={filters.type === 'expense' ? 'text-red-700' : 'text-gray-800'}>Despesas</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-3">
            <Text className="text-sm font-medium mb-1 text-gray-600">Categoria</Text>
            <View className="flex-row flex-wrap">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                  className={`py-2 px-4 rounded-full mr-2 mb-2 ${!filters.category ? 'bg-blue-100 border border-blue-500' : 'bg-gray-200'}`}
                  onPress={() => setFilters(prev => ({ ...prev, category: '' }))}
                >
                  <Text className={!filters.category ? 'text-blue-700' : 'text-gray-800'}>Todas</Text>
                </TouchableOpacity>
                {MOCK_CATEGORIES.map(category => (
                  <TouchableOpacity
                    key={category}
                    className={`py-2 px-4 rounded-full mr-2 mb-2 ${filters.category === category ? 'bg-blue-100 border border-blue-500' : 'bg-gray-200'}`}
                    onPress={() => setFilters(prev => ({ ...prev, category }))}
                  >
                    <Text className={filters.category === category ? 'text-blue-700' : 'text-gray-800'}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <View className="mb-4 flex-row justify-between">
            <View className="flex-1 mr-2">
              <Text className="text-sm font-medium mb-1 text-gray-600">Data inicial</Text>
              <TouchableOpacity
                className="py-2 px-4 border border-gray-300 rounded-lg"
                onPress={() => {
                  setSelectedDateField('startDate');
                  setShowDatePicker(true);
                }}
              >
                <Text>
                  {filters.startDate ? formatDate(filters.startDate) : 'Selecionar'}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-1 ml-2">
              <Text className="text-sm font-medium mb-1 text-gray-600">Data final</Text>
              <TouchableOpacity
                className="py-2 px-4 border border-gray-300 rounded-lg"
                onPress={() => {
                  setSelectedDateField('endDate');
                  setShowDatePicker(true);
                }}
              >
                <Text>
                  {filters.endDate ? formatDate(filters.endDate) : 'Selecionar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row justify-end">
            <TouchableOpacity
              className="py-2 px-4 mr-2"
              onPress={resetFilters}
            >
              <Text className="text-blue-600">Limpar filtros</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-2 px-4 bg-blue-600 rounded-lg"
              onPress={() => setShowFilters(false)}
            >
              <Text className="text-white">Aplicar</Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && selectedDateField && (
            <DateTimePicker
              value={filters[selectedDateField] || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
            />
          )}
        </View>
      )}

      {/* Lista de transações */}
      <FlatList
        data={filteredTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
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

      {/* Botão Adicionar */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 w-16 h-16 rounded-full justify-center items-center shadow-lg"
        onPress={openAddTransactionModal}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Modal de Adicionar/Editar Transação */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black bg-opacity-50">
          <View className="bg-white rounded-t-3xl p-5 h-5/6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">
                {currentTransaction?.id ? 'Editar Transação' : 'Nova Transação'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="mb-4">
                <Text className="text-sm font-medium mb-1 text-gray-600">Tipo</Text>
                <View className="flex-row">
                  <TouchableOpacity
                    className={`flex-1 py-3 ${currentTransaction?.type === 'income' ? 'bg-green-100 border border-green-500' : 'bg-gray-200'} rounded-l-lg justify-center items-center`}
                    onPress={() => setCurrentTransaction(prev => ({ ...prev, type: 'income' }))}
                  >
                    <Text className={`font-medium ${currentTransaction?.type === 'income' ? 'text-green-700' : 'text-gray-800'}`}>Receita</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`flex-1 py-3 ${currentTransaction?.type === 'expense' ? 'bg-red-100 border border-red-500' : 'bg-gray-200'} rounded-r-lg justify-center items-center`}
                    onPress={() => setCurrentTransaction(prev => ({ ...prev, type: 'expense' }))}
                  >
                    <Text className={`font-medium ${currentTransaction?.type === 'expense' ? 'text-red-700' : 'text-gray-800'}`}>Despesa</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-sm font-medium mb-1 text-gray-600">Descrição</Text>
                <TextInput
                  className={`border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3`}
                  placeholder="Ex: Supermercado, Salário..."
                  value={currentTransaction?.description || ''}
                  onChangeText={(text) => setCurrentTransaction(prev => ({ ...prev, description: text }))}
                />
                {errors.description && (
                  <Text className="text-red-500 text-xs mt-1">{errors.description}</Text>
                )}
              </View>

              <View className="mb-4">
                <Text className="text-sm font-medium mb-1 text-gray-600">Valor (R$)</Text>
                <TextInput
                  className={`border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3`}
                  placeholder="0,00"
                  keyboardType="numeric"
                  value={currentTransaction?.amount ? String(currentTransaction.amount) : ''}
                  onChangeText={(text) => {
                    const numericValue = parseFloat(text.replace(',', '.'));
                    setCurrentTransaction(prev => ({
                      ...prev,
                      amount: isNaN(numericValue) ? 0 : numericValue
                    }));
                  }}
                />
                {errors.amount && (
                  <Text className="text-red-500 text-xs mt-1">{errors.amount}</Text>
                )}
              </View>

              <View className="mb-4">
                <Text className="text-sm font-medium mb-1 text-gray-600">Categoria</Text>
                <View className="border border-gray-300 rounded-lg p-2">
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {MOCK_CATEGORIES.filter(cat =>
                      currentTransaction?.type === 'income'
                        ? ['Salário', 'Investimentos', 'Presentes', 'Freelance', 'Outros'].includes(cat)
                        : !['Salário', 'Investimentos', 'Presentes', 'Freelance'].includes(cat)
                    ).map(category => (
                      <TouchableOpacity
                        key={category}
                        className={`py-2 px-4 rounded-full mr-2 ${currentTransaction?.category === category ? 'bg-blue-100 border border-blue-500' : 'bg-gray-200'}`}
                        onPress={() => setCurrentTransaction(prev => ({ ...prev, category }))}
                      >
                        <Text className={currentTransaction?.category === category ? 'text-blue-700' : 'text-gray-800'}>{category}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                {errors.category && (
                  <Text className="text-red-500 text-xs mt-1">{errors.category}</Text>
                )}
              </View>

              <View className="mb-4">
                <Text className="text-sm font-medium mb-1 text-gray-600">Data</Text>
                <TouchableOpacity
                  className={`border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3`}
                  onPress={() => setShowTransactionDatePicker(true)}
                >
                  <Text>
                    {currentTransaction?.date ? formatDate(currentTransaction.date) : 'Selecionar data'}
                  </Text>
                </TouchableOpacity>
                {errors.date && (
                  <Text className="text-red-500 text-xs mt-1">{errors.date}</Text>
                )}
              </View>

              <View className="mb-4">
                <Text className="text-sm font-medium mb-1 text-gray-600">Observações (opcional)</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="Alguma informação adicional..."
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  value={currentTransaction?.notes || ''}
                  onChangeText={(text) => setCurrentTransaction(prev => ({ ...prev, notes: text }))}
                />
              </View>

              <View className="mb-6">
                <Text className="text-sm font-medium mb-1 text-gray-600">Comprovante (opcional)</Text>

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
                      <Ionicons name="image-outline" size={18} color="#666" className="mr-1" />
                      <Text className="text-gray-800">Galeria</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="flex-1 mx-1 py-2 px-3 bg-gray-200 rounded-lg justify-center items-center flex-row"
                      onPress={takePicture}
                    >
                      <Ionicons name="camera-outline" size={18} color="#666" className="mr-1" />
                      <Text className="text-gray-800">Câmera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="flex-1 ml-2 py-2 px-3 bg-gray-200 rounded-lg justify-center items-center flex-row"
                      onPress={pickDocument}
                    >
                      <Ionicons name="document-outline" size={18} color="#666" className="mr-1" />
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
                  {currentTransaction?.id ? 'Atualizar' : 'Adicionar'} Transação
                </Text>
              </TouchableOpacity>
            </ScrollView>

            {showTransactionDatePicker && (
              <DateTimePicker
                value={currentTransaction?.date || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleTransactionDateChange}
                maximumDate={new Date()}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
