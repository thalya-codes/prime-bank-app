import { User } from "@/domain/entities";
import { IUserRepository } from "@/domain/repositories";
import { api } from "@/infrastructure/http/api";
import auth from "@react-native-firebase/auth";
import { UserMapper } from "../mappers";

export class UserService {
  static async getUser(): Promise<User> {
    const user = auth().currentUser;
    const response = await api.get(`user/${user?.uid}`);
    return UserMapper.toDomain(response.data);
  }

  static async create(data: any): Promise<any> {
    return api.post(`users`, data);
  }
}

const _: IUserRepository = UserService;

