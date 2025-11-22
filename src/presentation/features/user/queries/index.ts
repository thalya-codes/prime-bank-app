import { UserService } from "@/data/repositories/userService";
import { User } from "@/domain/entities";
import { useQuery } from "@tanstack/react-query";

export async function fetchUser(): Promise<User> {
  return await UserService.getUser();
}

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
};
