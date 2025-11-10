import { BankAccountService } from "@/services/bankAccountService";
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
    queryFn: (): Promise<IBankAccountResponse> => BankAccountService.getBankAccount(),
  });
};

