/* eslint-disable react-hooks/exhaustive-deps */
import useAuthStore from "@/store/useAuthStore";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function handleAuthStateChanged(user: any) {
    console.log({ user });
    useAuthStore.setState({ email: user?.email, uid: user?.uid });
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

