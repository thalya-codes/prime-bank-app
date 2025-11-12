import { getBiometricPreference, saveBiometricPreference } from "@/utils/auth/secureStore";
import { useEffect, useState } from "react";
import { Switch, View } from "react-native";
import { FormFieldLabel } from "../FormField/FormFieldLabel";

export const BiometricSwitch = () => {
  const [enableBiometric, setEnableBiometric] = useState(false);
  const toggleEnableBiometrics = () =>
    setEnableBiometric((previousState) => !previousState);

  useEffect(() => {
    const biometricPreference = getBiometricPreference();

    if (biometricPreference) {
      return setEnableBiometric(Boolean(biometricPreference));
    } 

    if(enableBiometric) saveBiometricPreference(enableBiometric)
  }, [enableBiometric]);

  return (
    <View className='flex-row gap-3'>
      <FormFieldLabel>Habilitar biometria</FormFieldLabel>
      <Switch value={enableBiometric} onChange={toggleEnableBiometrics} />
    </View>
  );
};

