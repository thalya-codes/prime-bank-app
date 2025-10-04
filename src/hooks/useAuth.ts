import { handleAuthError } from "@/utils/handleAuthErrors";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "@react-native-firebase/auth";
import * as SecureStore from "expo-secure-store";

export interface ICredentials {
  email: string;
  password: string;
}

export function useAuth() {
  const createAccount = async ({ email, password }: ICredentials) => {
    await createUserWithEmailAndPassword(getAuth(), email, password);
  };

  const signIn = async ({ email, password }: ICredentials) => {
    const res = await signInWithEmailAndPassword(getAuth(), email, password);
    const token = await getIdToken(res.user);
    SecureStore.setItem(process.env.EXPO_PUBLIC_TOKEN_KEY!, token);
  };

  const resetPassword = async (newPassword: string) => {
    await updatePassword(getAuth().currentUser!, newPassword);
  };

  const logout = async () => {
    await signOut(getAuth());
    await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_TOKEN_KEY!);
  };

  return {
    signIn,
    createAccount,
    logout,
    resetPassword,
    handleAuthError,
  };
}

