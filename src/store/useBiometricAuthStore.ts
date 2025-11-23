import { create } from "zustand";

type State = {
  hasBiometricsSupport: boolean;
  enableBiometric: boolean;
  isBiometricSetted: boolean;
  showDrawerUnconfiguredBiometrics: boolean;
};

interface Actions {
  setHasBiometricsSupport: (value: boolean) => void;
  setEnableBiometric: (value: boolean) => void;
  setIsBiometricSetted: (value: boolean) => void;
  setShowDrawerUnconfiguredBiometrics: (value: boolean) => void;
}

export const useBiometricAuthStore = create<State & Actions>((set, get) => ({
  hasBiometricsSupport: false,
  enableBiometric: false,
  isBiometricSetted: false,
  showDrawerUnconfiguredBiometrics: false,
  setHasBiometricsSupport: (value: boolean) =>
    set(() => ({ hasBiometricsSupport: value })),
  setEnableBiometric: (value: boolean) =>
    set(() => ({ enableBiometric: value })),
  setIsBiometricSetted: (value: boolean) =>
    set(() => ({ isBiometricSetted: value })),
  setShowDrawerUnconfiguredBiometrics: (value: boolean) =>
    set(() => ({ showDrawerUnconfiguredBiometrics: value })),
}));

