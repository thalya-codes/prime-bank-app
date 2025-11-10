import { UserService } from "@/data/repositories/userService";
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
  return await UserService.getUser();
}

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
};
