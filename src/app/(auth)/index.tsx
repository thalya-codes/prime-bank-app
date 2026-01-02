import { useAuth } from "@/presentation/hooks/useAuth";
import { useBiometricAuthStore } from "@/presentation/store/useBiometricAuthStore";
import { getBiometricPreference, getToken } from "@/utils/auth/secureStore";
import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";

export default function AuthIndex() {
  const router = useRouter();
  const isBiometricLoginEnabled = getBiometricPreference();
  const { setEnableBiometric } = useBiometricAuthStore();
  const { verifyIfBiometricIsSetted, verifyDeviceBiometricSupport } = useAuth();

  useEffect(() => {
    verifyDeviceBiometricSupport();
    verifyIfBiometricIsSetted();
  }, []);

  useEffect(() => {
    setEnableBiometric(isBiometricLoginEnabled);
  }, [isBiometricLoginEnabled, setEnableBiometric]);

  const checkIfUserHasAValidToken = useCallback(async () => {
    const token = await getToken(process.env.EXPO_PUBLIC_TOKEN_KEY!);

    if (token && isBiometricLoginEnabled) router.replace("/welcome-back");
    else router.replace("/login");
  }, [isBiometricLoginEnabled, router]);

  useEffect(() => {
    checkIfUserHasAValidToken();
  }, [checkIfUserHasAValidToken]);
}

