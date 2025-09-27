import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, Text, TouchableOpacity, View } from "react-native";

import { BottomSheet, Button, Select } from "@/components";
import { formatDate } from "@/utils/masks";

function FilterPanel({
  showFilters,
  setShowFilters,
  filterType,
  filters,
  setFilters,
  filterCategory,
  setSelectedDateField,
  setShowDatePicker,
  resetFilters,
  showDatePicker,
  selectedDateField,
  handleDateChange,
}: any) {
  return (
    <BottomSheet visible={showFilters} setVisible={setShowFilters}>
      <View className="h-[80%]">
        <Text className="text-lg font-bold mb-4 text-gray-800">
          Filtros avançados
        </Text>

        <View className="mb-6">
          <Text className="text-sm font-medium mb-4 text-gray-600">Tipo</Text>
          <Select
            data={filterType}
            onChange={(value) =>
              setFilters((prev: any) => ({ ...prev, type: value }))
            }
            value={filters.type}
            placeholder="Todos os tipos"
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium mb-4 text-gray-600">
            Categoria
          </Text>
          <Select
            data={filterCategory}
            onChange={(value) =>
              setFilters((prev: any) => ({ ...prev, category: value }))
            }
            value={filters.category}
            placeholder="Todos as categorias"
          />
        </View>

        <View className="mb-6 flex-row justify-between">
          <View className="flex-1 mr-2">
            <Text className="text-sm font-medium mb-4 text-gray-600">
              Data inicial
            </Text>
            <TouchableOpacity
              className="p-3 flex-row justify-between items-center bg-white border border-gray-300"
              onPress={() => {
                setSelectedDateField("startDate");
                setShowDatePicker(true);
              }}
            >
              <Text>
                {filters.startDate
                  ? formatDate(filters.startDate)
                  : "Selecionar"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1 ml-2">
            <Text className="text-sm font-medium mb-4 text-gray-600">
              Data final
            </Text>
            <TouchableOpacity
              className="p-3 flex-row justify-between items-center bg-white border border-gray-300"
              onPress={() => {
                setSelectedDateField("endDate");
                setShowDatePicker(true);
              }}
            >
              <Text>
                {filters.endDate ? formatDate(filters.endDate) : "Selecionar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row gap-2 justify-between">
          <Button
            variant="secondary"
            isFullWidth={false}
            text="Limpar filtros"
            onPress={resetFilters}
          />
          <Button
            isFullWidth={false}
            text="Aplicar filtros"
            onPress={() => setShowFilters(false)}
          />
        </View>

        {showDatePicker && selectedDateField && (
          <DateTimePicker
            value={filters[selectedDateField] || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}
      </View>
    </BottomSheet>
  );
}

export default FilterPanel;
