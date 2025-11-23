import { useCreateUserMutation } from "@/features/user/mutations/create-user-mutation";
import { useBiometricAuthStore } from "@/store/useBiometricAuthStore";
import {
  deleteBiometricPreference,
  deleteToken,
  saveToken,
} from "@/utils/auth/secureStore";
import { handleAuthError } from "@/utils/handleAuthErrors";
import {
  getAuth,
  getIdToken,
  signInWithEmailAndPassword,
  signOut,
} from "@react-native-firebase/auth";

export interface ICredentials {
  email: string;
  password: string;
}

export function useAuth() {
  const { mutateAsync: createNewUser } = useCreateUserMutation();

  const { setEnableBiometric } = useBiometricAuthStore();

  const signIn = async ({ email, password }: ICredentials) => {
    const res = await signInWithEmailAndPassword(getAuth(), email, password);
    const token = await getIdToken(res.user);
    await saveToken(process.env.EXPO_PUBLIC_TOKEN_KEY!, token);
  };

  // const resetPassword = async (newPassword: string) => {
  //   await updatePassword(getAuth().currentUser!, newPassword);
  // };

  const logout = async () => {
    await signOut(getAuth());
    await deleteToken(process.env.EXPO_PUBLIC_TOKEN_KEY!);
    await deleteBiometricPreference();

    setEnableBiometric(false);
  };

  return {
    signIn,
    createNewUser,
    logout,
    // resetPassword,
    handleAuthError,
  };
}

