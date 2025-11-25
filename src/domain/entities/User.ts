export class User {
  constructor(
    public readonly id: string,
    public readonly fullName: string,
    public readonly email: string,
    public readonly telephone: string,
    public readonly acceptTermAndPolice: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date,
    public readonly fileName?: string,
    public readonly fileUrl?: string,
  ) {}

  get firstName(): string {
    return this.fullName.split(' ')[0];
  }

  get lastName(): string {
    const parts = this.fullName.split(' ');
    return parts.length > 1 ? parts[parts.length - 1] : '';
  }

  get initials(): string {
    const names = this.fullName.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
  }

  hasProfilePicture(): boolean {
    return !!this.fileUrl;
  }

  isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
}

