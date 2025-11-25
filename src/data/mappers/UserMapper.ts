import { User } from '@/domain/entities';

export class UserMapper {
  static toDomain(dto: any): User {
    return new User(
      dto.id,
      dto.fullName,
      dto.email,
      dto.telephone,
      dto.acceptTermAndPolice,
      dto.createdAt,
      dto.fileName,
      dto.fileUrl
    );
  }

  static toDTO(user: User): any {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      telephone: user.telephone,
      acceptTermAndPolice: user.acceptTermAndPolice,
      createdAt: user.createdAt,
      fileName: user.fileName,
      fileUrl: user.fileUrl,
    };
  }
}

