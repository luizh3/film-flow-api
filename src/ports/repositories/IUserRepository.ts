import { User } from "@prisma/client";
import { UserType } from "@/types/customer/UserType";

export interface IUserRepository {
    insert(user: UserType): Promise<User>;
    update(user: Partial<UserType>): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
    findOne(userId: string): Promise<User | null>;
    findManyByIds(userIds: string[]): Promise<User[]>;
}
