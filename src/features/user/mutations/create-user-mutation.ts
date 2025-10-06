import { useMutation } from "@tanstack/react-query";

import { ICreateAccountFields } from "@/pages/CreateAccountPage/interfaces";
import { api } from "@/services/api";

export type TCreateUser = Omit<ICreateAccountFields, "confirmPassword">;

export interface ICreateUserResponse {
  message: string;
  userId: string;
  bankAccountId: string;
  bankAccountNumber: string;
}

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: async (data: TCreateUser): Promise<ICreateUserResponse[]> => {
      return api.post(`users`, data);
    },
  });
};
