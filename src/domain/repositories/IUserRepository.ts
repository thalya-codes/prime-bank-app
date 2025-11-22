
export interface IUserRepository {
  getUser(): Promise<any>;
  create(data: any): Promise<any>;
}

