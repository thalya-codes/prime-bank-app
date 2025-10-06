import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { userQueries } from "../queries";
import { CreateUserData } from "../types";

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateUserData) => {
      return axios.post(`https://app-fx66cx7g3q-uc.a.run.app/users`, {
        fullName: data.fullName,
        email: data.email,
        telephone: data.telephone,
        password: data.password,
        acceptTermAndPolice: data.acceptTermAndPolice,
      });
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: userQueries.all() }),
  });
};
