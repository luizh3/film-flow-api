import { User } from "@prisma/client";
import { UserType } from "@/types/customer/UserType";
import { IUserRepository } from "@/ports/repositories/IUserRepository";
import { NotFoundException } from "@/exceptions/NotFoundException";
import { InternalErrorException } from "@/exceptions/InternalErrorException";
import { LoginRequest } from "@/types/login/LoginRequest";

import bcrypt from 'bcrypt'

export class UserService {

    constructor(private readonly repository: IUserRepository) {}

    async insert(newUser: UserType): Promise<User> {

        const SALT_ROUNDS: number = 10

        const userRegister = await this.repository.findOneByEmail(newUser.email);

        if (userRegister) {
            throw new InternalErrorException("E-mail already registered!");
        }

        newUser.password = await bcrypt.hash(newUser.password, SALT_ROUNDS)

        return await this.repository.insert(newUser)
    }

    async update(user: Partial<UserType>): Promise<User> {
        return await this.repository.update(user);
    }

    async findOne(userId: string): Promise<User> {

        const user = await this.repository.findOne(userId);

        if (!user) {
            throw new NotFoundException("User not found!");
        }

        return user;
    }

    async login(loginRequest: LoginRequest): Promise<User> {

        const userRegister = await this.repository.findOneByEmail(loginRequest.email);

        const isValidUser = userRegister && await bcrypt.compare(loginRequest.password, userRegister.password);

        if (!isValidUser) {
            throw new InternalErrorException("Invalid email or password!");
        }

        return userRegister;
    }

    async findManyByIds(userIds: string[]): Promise<User[]> {
        return await this.repository.findManyByIds(userIds);
    }
}