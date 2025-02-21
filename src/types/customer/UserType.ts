
export interface UserType {
    name: string;
    userId?: string;
    email: string;
    password: string;
    createdAt?: Date | null;
    avatarUrl: string | null;
}