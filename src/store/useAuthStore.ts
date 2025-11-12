// import { create } from 'zustand'
import { devtools, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
interface Authorization {
  email?: string;
  token?: string;
  uid?: string;
  setCredentials: any;
}

interface AuthStoreState extends Authorization {
  signOut: () => void;
}

const INITIAL_STATE: Authorization = {
  email: undefined,
  token: undefined,
  uid: undefined,
  setCredentials: undefined
};

const useAuthStore = createWithEqualityFn<AuthStoreState>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_STATE,

        signOut: () => {
          set({ ...INITIAL_STATE }, false, "sign-out");
        },
        setCredentials: (credentials) => {
          set(
            { ...credentials, isAuthenticated: !!credentials.token },
            false,
            "set-credentials" // Ação para o DevTools
          );
        },
      }),

      { name: "pb-auth-store" }
    ),
    { name: "pb-auth-store" }
  ),
  shallow
);

export const signOut = useAuthStore.getState().signOut;

export default useAuthStore;

