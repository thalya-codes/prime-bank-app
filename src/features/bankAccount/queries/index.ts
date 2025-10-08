import { api } from "@/services/api";

import { useQuery } from "@tanstack/react-query";

interface IBankAccountResponse {
  associatedUser: string;
  balance: number;
  createdAt: string;
  id: string;
  name: string;
  bankAccountNumber: string;
}

export const useGetBankAccount = () => {
  return useQuery({
    queryKey: ["bank-account"],
    queryFn: async (): Promise<IBankAccountResponse> => {
      const user = await api.get(`bankAccount`);
      return user.data;
    },
  });
};

