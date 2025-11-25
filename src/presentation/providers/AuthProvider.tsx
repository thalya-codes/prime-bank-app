/* eslint-disable react-hooks/exhaustive-deps */
import useAuthStore from "@/presentation/store/useAuthStore";
import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  user: FirebaseAuthTypes.User | undefined;
  setUser: Dispatch<SetStateAction<FirebaseAuthTypes.User | undefined>>;
  initializing: boolean;
}
export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  const queryClient = new QueryClient();

  // Handle user state changes
  async function handleAuthStateChanged(user: any) {
    useAuthStore.setState({ email: user?.email!, uid: user?.uid });
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, setUser, initializing }}>
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

