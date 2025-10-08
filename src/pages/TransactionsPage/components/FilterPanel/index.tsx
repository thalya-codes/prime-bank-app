import { Text, TextInput, View } from "react-native";

import { BottomSheet, Button } from "@/components";
import { currencyMask } from "@/utils/masks";

function FilterPanel({
  showFilters,
  setShowFilters,
  setApplyFilters,
  filters,
  handleFilters,
  resetFilters,
  errors,
}: any) {
  return (
    <BottomSheet visible={showFilters} setVisible={setShowFilters}>
      <View className="h-[80%]">
        <Text className="text-lg font-bold mb-4 text-gray-800">
          Filtros avançados
        </Text>

        <View className="flex-row gap-2 justify-between">
          <View className="flex-1 mb-6">
            <Text className="text-sm font-medium mb-4 text-gray-600">
              Valor Mínimo(R$)
            </Text>
            <TextInput
              className={`border ${errors.min ? "border-red-500" : "border-gray-300"} p-3 flex-row justify-between items-center bg-white `}
              placeholder="R$ 0,00"
              keyboardType="numeric"
              value={currencyMask(filters?.min)}
              onChangeText={(value) => handleFilters(value, "min")}
            />
            {errors.min && (
              <Text className="text-red-500 text-xs mt-1">{errors.min}</Text>
            )}
          </View>
          <View className="flex-1 mb-6">
            <Text className="text-sm font-medium mb-4 text-gray-600">
              Valor Máximo(R$)
            </Text>
            <TextInput
              className={`border ${errors.max ? "border-red-500" : "border-gray-300"} p-3 flex-row justify-between items-center bg-white `}
              placeholder="R$ 0,00"
              keyboardType="numeric"
              value={currencyMask(filters.max)}
              onChangeText={(value) => handleFilters(value, "max")}
            />
            {errors.max && (
              <Text className="text-red-500 text-xs mt-1">{errors.max}</Text>
            )}
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
            onPress={setApplyFilters}
          />
        </View>
      </View>
    </BottomSheet>
  );
}

export default FilterPanel;
