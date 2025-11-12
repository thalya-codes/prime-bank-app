import { BankAccountService } from "@/data/repositories/bankAccountService";
import { BankAccount } from "@/domain/entities";
import { useQuery } from "@tanstack/react-query";

export const useGetBankAccount = () => {
  return useQuery({
    queryKey: ["bank-account"],
    queryFn: (): Promise<BankAccount> => BankAccountService.getBankAccount(),
  });
};

