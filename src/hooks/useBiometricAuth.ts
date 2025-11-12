import useAuthStore from "@/store/useAuthStore";
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

  const router = useRouter();

  const onBiometricLogin = async () => {
    try {
      const isBiometricsSetted = await LocalAuthentication.isEnrolledAsync();
      if (!isBiometricsSetted) return setShowDrawerUnconfiguredBiometrics(true);

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

  useEffect(() => {
    verifyDeviceBiometricSupport();
  }, []);

  return {
    hasBiometricsSupport,
    onBiometricLogin,
    showDrawerUnconfiguredBiometrics,
    setShowDrawerUnconfiguredBiometrics,
  };
}

