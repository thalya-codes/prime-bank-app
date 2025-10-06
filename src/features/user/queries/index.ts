import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

interface IUser {
  acceptTermAndPolice: boolean;
  createdAt: string;
  email: string;
  fileName: string;
  fileUrl: string;
  fullName: string;
  telephone: string;
  updatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

export async function fetchUser(): Promise<IUser> {
  const user = await api.get(`user`);
  return user.data;
}

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await api.get(`user`);
      return user.data;
    },
  });
};

