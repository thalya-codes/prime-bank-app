/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "@/presentation/hooks/useAuth";
import useAuthStore from "@/presentation/store/useAuthStore";
import { useEffect } from "react";
import { Switch, View } from "react-native";
import { FormFieldLabel } from "../FormField/FormFieldLabel";

export const BiometricSwitch = () => {
  const { enableBiometric, setEnableBiometric, isBiometricSetted } =
    useAuthStore();
  const { processBiometricDisableFlow } = useAuth();

  const toggleEnableBiometrics = () => {
    setEnableBiometric(!enableBiometric);
  };

  useEffect(() => {
    processBiometricDisableFlow();
  }, [enableBiometric]);

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

