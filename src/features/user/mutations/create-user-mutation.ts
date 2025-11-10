import { useMutation } from "@tanstack/react-query";

import { ICreateAccountFields } from "@/pages/CreateAccountPage/interfaces";
import { UserService } from "@/services/userService";

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
      return UserService.create(data);
    },
  });
};
