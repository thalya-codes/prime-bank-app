import { Text, View } from "react-native";

import { BottomSheet, Button, Select } from "@/components";

function FilterPanel({
  showFilters,
  setShowFilters,
  filterType,
  filters,
  setFilters,
  resetFilters,
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
      </View>
    </BottomSheet>
  );
}

export default FilterPanel;
