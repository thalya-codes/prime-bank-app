import { useCreateUserMutation } from "@/presentation/features/user/mutations/create-user-mutation";
import useAuthStore from "@/presentation/store/useAuthStore";
import {
  deleteBiometricPreference,
  deleteToken,
  saveToken,
} from "@/utils/auth/secureStore";
import { handleAuthError } from "@/utils/handleAuthErrors";
import auth, {
  getAuth,
  getIdToken,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "@react-native-firebase/auth";
import * as LocalAuthentication from "expo-local-authentication";
import { usePathname, useRouter } from "expo-router";
import { Toast } from "toastify-react-native";
export interface ICredentials {
  email: string;
  password: string;
}

export function useAuth() {
  const { mutateAsync: createNewUser } = useCreateUserMutation();

  const {
    enableBiometric,
    setEnableBiometric,
    isBiometricSetted,
    setShowDrawerUnconfiguredBiometrics,
    setHasBiometricsSupport,
    setIsBiometricSetted,
  } = useAuthStore();

  const router = useRouter();

  const pathname = usePathname();

  const signIn = async ({ email, password }: ICredentials) => {
    const res = await signInWithEmailAndPassword(getAuth(), email, password);
    const token = await getIdToken(res.user);
    await saveToken(process.env.EXPO_PUBLIC_TOKEN_KEY!, token);
  };

  const resetPassword = async (newPassword: string) => {
    await updatePassword(getAuth().currentUser!, newPassword);
  };

  const logout = async () => {
    await signOut(getAuth());
    await deleteToken(process.env.EXPO_PUBLIC_TOKEN_KEY!);
    await deleteBiometricPreference();

    setEnableBiometric(false);
  };

  const onBiometricLogin = async () => {
    try {
      if (!isBiometricSetted) return setShowDrawerUnconfiguredBiometrics(true);

      const authResult = await LocalAuthentication.authenticateAsync({
        biometricsSecurityLevel: "strong",
        promptMessage: "Use sua Biometria para entrar",
      });

      if (authResult.success) {
        const user = auth().currentUser;
        const idTokenResult = await user?.getIdTokenResult(true);

        useAuthStore.getState().setCredentials({
          email: user?.email ?? undefined,
          uid: user?.uid,
          token: idTokenResult?.token,
        });

        router.replace("/(private)/home");
      }
    } catch {
      Toast.error(`Falha ao realizar login com biometria.`);
    }
  };

  const processBiometricDisableFlow = async () => {
    if (pathname !== "/welcome-back") return;
    if (enableBiometric) return;
    Toast.info(
      "Biometria desativada. Você precisará fazer login com email e senha."
    );

    setTimeout(() => {
      Toast.hide();
      router.push("/login");
    }, 3000);
  };

  const verifyDeviceBiometricSupport = async () => {
    const hasSupport = await LocalAuthentication.hasHardwareAsync();
    setHasBiometricsSupport(hasSupport);
  };

  const verifyIfBiometricIsSetted = async () => {
    const isSetted = await LocalAuthentication.isEnrolledAsync();
    console.log("isSetted", isSetted);
    setIsBiometricSetted(isSetted);
  };

  return {
    signIn,
    createNewUser,
    logout,
    resetPassword,
    handleAuthError,
    onBiometricLogin,
    verifyIfBiometricIsSetted,
    verifyDeviceBiometricSupport,
    processBiometricDisableFlow,
  };
}

