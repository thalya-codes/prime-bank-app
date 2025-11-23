import { useBiometricAuth } from "@/hooks/useBiometricAuth";
import { useBiometricAuthStore } from "@/store/useBiometricAuthStore";
import { saveBiometricPreference } from "@/utils/auth/secureStore";
import { Switch, View } from "react-native";
import { FormFieldLabel } from "../FormField/FormFieldLabel";

export const BiometricSwitch = () => {
  const { enableBiometric, setEnableBiometric } = useBiometricAuthStore();

  const { isBiometricSetted } = useBiometricAuth();
  const toggleEnableBiometrics = () => {
    setEnableBiometric(!enableBiometric);
    saveBiometricPreference(!enableBiometric);
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

