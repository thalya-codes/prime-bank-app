import * as SecureStore from "expo-secure-store";
import { createJSONStorage, devtools, persist, StateStorage } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type States = {
  email?: string;
  token?: string;
  uid?: string;
  isAuthenticated: boolean;
  hasBiometricsSupport: boolean;
  enableBiometric: boolean;
  isBiometricSetted: boolean;
  showDrawerUnconfiguredBiometrics: boolean;
  showOverlayPrivacyScreen: boolean;
};

interface Actions {
  setHasBiometricsSupport: (value: boolean) => void;
  setEnableBiometric: (value: boolean) => void;
  setIsBiometricSetted: (value: boolean) => void;
  setIsAuthenticated: (value: boolean) => void;
  setShowDrawerUnconfiguredBiometrics: (value: boolean) => void;
  setCredentials: any;
  signOut: () => void;
  setShowOverlayPrivacyScreen: (value: boolean) => void;
}

const INITIAL_STATE: States = {
  email: undefined,
  token: undefined,
  uid: undefined,
  hasBiometricsSupport: false,
  enableBiometric: false,
  isBiometricSetted: false,
  showDrawerUnconfiguredBiometrics: false,
  showOverlayPrivacyScreen: false,
  isAuthenticated: false,
};

const secureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await SecureStore.getItemAsync(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

const useAuthStore = createWithEqualityFn<States & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_STATE,

        signOut: () => {
          set({ ...INITIAL_STATE }, false, "sign-out");
        },
        setCredentials: (credentials: any) => {
          set(
            { ...credentials },
            false,
            "set-credentials" // Ação para o DevTools
          );

          set(
            { isAuthenticated: !!credentials?.token },
            false,
            "set-credentials" // Ação para o DevTools
          );
        },
        setIsBiometricSetted: (value: boolean) => {
          set({ isBiometricSetted: value }, false, "set-biometric-setted");
        },
        setShowDrawerUnconfiguredBiometrics: (value: boolean) => {
          set(
            { showDrawerUnconfiguredBiometrics: value },
            false,
            "set-show-drawer-unconfigured-biometrics"
          );
        },
        setHasBiometricsSupport: (value: boolean) => {
          set(
            { hasBiometricsSupport: value },
            false,
            "set-has-biometrics-support"
          );
        },
        setEnableBiometric: (value: boolean) => {
          set({ enableBiometric: value }, false, "set-enable-biometric");
        },
        setShowOverlayPrivacyScreen: (value: boolean) => {
          set(
            { showOverlayPrivacyScreen: value },
            false,
            "set-enable-biometric"
          );
        },

        setIsAuthenticated: (value: boolean) => {
          set({ isAuthenticated: value }, false, "setIsAuthenticated");
        },
      }),

      {
        name: "pb-auth-store",
        storage: createJSONStorage(() => secureStorage),
      }
    ),
    { name: "pb-auth-store" }
  ),
  shallow
);

export const signOut = useAuthStore.getState().signOut;

export default useAuthStore;

