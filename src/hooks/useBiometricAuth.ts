import useAuthStore from "@/store/useAuthStore";
import { useBiometricAuthStore } from "@/store/useBiometricAuthStore";
import { saveBiometricPreference } from "@/utils/auth/secureStore";
import auth from "@react-native-firebase/auth";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

export function useBiometricAuth() {
  const [hasBiometricsSupport, setHasBiometricsSupport] =
    useState<boolean>(false);
  const [
    showDrawerUnconfiguredBiometrics,
    setShowDrawerUnconfiguredBiometrics,
  ] = useState(false);

  const { enableBiometric } = useBiometricAuthStore();
  const [isBiometricSetted, setIsBiometricSetted] = useState(false);

  const router = useRouter();

  const onBiometricLogin = async () => {
    try {
      if (!isBiometricSetted) return setShowDrawerUnconfiguredBiometrics(true);

      const user = auth().currentUser;
      const idTokenResult = await user?.getIdTokenResult(true);

      useAuthStore.getState().setCredentials({
        email: user?.email ?? undefined,
        uid: user?.uid,
        token: idTokenResult?.token,
        isAuthenticated: true,
      });

      await LocalAuthentication.authenticateAsync({
        biometricsSecurityLevel: "strong",
        promptMessage: "Use sua Biometria para entrar",
      });

      router.push("/(private)/home");
    } catch {
      Toast.error(`Falha ao realizar login com biometria.`);
    }
  };

  const verifyDeviceBiometricSupport = async () => {
    const hasSupport = await LocalAuthentication.hasHardwareAsync();
    setHasBiometricsSupport(hasSupport);
  };

  const verifyIfBiometricIsSetted = async () => {
    const isSetted = await LocalAuthentication.isEnrolledAsync();
    setIsBiometricSetted(isSetted);
  };

  useEffect(() => {
    verifyDeviceBiometricSupport();
    verifyIfBiometricIsSetted();
  }, []);

  const defineUserBiometricPreference = () => {
    saveBiometricPreference(enableBiometric);
  };

  return {
    hasBiometricsSupport,
    onBiometricLogin,
    showDrawerUnconfiguredBiometrics,
    setShowDrawerUnconfiguredBiometrics,
    isBiometricSetted,
    defineUserBiometricPreference,
  };
}

