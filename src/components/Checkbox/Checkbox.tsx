import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ICheckbox } from "./interface";

export const Checkbox = ({ value, onValueChange, children }: ICheckbox) => {
  const [isChecked, setIsChecked] = useState(value);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        onValueChange(!value);
        setIsChecked((prev) => !prev);
      }}
      className='flex-row gap-2 items-center'
    >
      <View
        className={`p-1 rounded-md w-6 h-6 items-center justify-center ${
          isChecked
            ? "bg-brand-600"
            : "bg-neutral-0 border border-brand-600"
        }`}
      >
        {isChecked && <FontAwesome name='check' size={12} color='white' />}
      </View>

      {children}
    </TouchableOpacity>
  );
};

