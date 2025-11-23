import { Switch, View } from "react-native";
import { FormFieldLabel } from "../FormField/FormFieldLabel";
import { useBiometricAuthStore } from "@/store/useBiometricAuthStore";

export const BiometricSwitch = () => {
  const { enableBiometric, setEnableBiometric, isBiometricSetted } =
    useBiometricAuthStore();

  const toggleEnableBiometrics = () => {
    setEnableBiometric(!enableBiometric);
  };

  return (
    <View className='flex-row gap-3'>
      <FormFieldLabel>Habilitar biometria</FormFieldLabel>
      <Switch
        value={enableBiometric}
        onChange={toggleEnableBiometrics}
        disabled={!isBiometricSetted}
      />
    </View>
  );
};

