// import { create } from 'zustand'
import { create } from "zustand";

interface State {
  name?: string | null;
  accountNumber?: string | null;
  balance: number | null;
}

interface Action {
  setName: (name: string) => void;
  setAccountNumber: (accountNumber: string) => void;
  setBalance: (balance: number) => void;
}

const INITIAL_STATE: State = {
  name: null,
  accountNumber: null,
  balance: null,
};

const useGeneralInfos = create<State & Action>((set) => ({
  name: INITIAL_STATE.name,
  accountNumber: INITIAL_STATE.accountNumber,
  balance: INITIAL_STATE.balance,
  setName: (name) => set(() => ({ name })),
  setAccountNumber: (accountNumber) => set(() => ({ accountNumber })),
  setBalance: (balance) => set(() => ({ balance })),
}));

export default useGeneralInfos;

