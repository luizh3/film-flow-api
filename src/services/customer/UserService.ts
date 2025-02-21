import { UserType } from "@/types/customer/UserType";
import { UserRepository } from "@/repositorys/costumer/UserRepository"
import { NotFoundException } from "@/exceptions/NotFoundException";
import { InternalErrorException } from "@/exceptions/InternalErrorException";
import { LoginRequestType } from "@/types/login/LoginRequestType";

import bcrypt from 'bcrypt'

export class UserService {

    async insert( newUser : UserType ) : Promise<UserType> {

        const SALT_ROUNDS : number = 10

        const repository = new UserRepository()

        const userRegister = await repository.findOneByEmail( newUser.email );

        if( userRegister ) {
            throw new InternalErrorException("E-mail already registered!");
        }

        newUser.password = await bcrypt.hash( newUser.password , SALT_ROUNDS)

        return await repository.insert( newUser )
    }

    async update( user : Partial<UserType> ) : Promise<UserType> {
        return await new UserRepository().update( user );
    }

    async findOne( userId: string ) : Promise<UserType> {

        const repository = new UserRepository();
        const user = await repository.findOne( userId );

        if( !user ) {
            throw new NotFoundException("User not found!");
        }

        return user;
    }

    async login( loginRequest: LoginRequestType ) : Promise<UserType> {

        const repository = new UserRepository();

        const userRegister = await repository.findOneByEmail( loginRequest.email );

        const isValidUser = userRegister && await bcrypt.compare( loginRequest.password, userRegister.password );

        if( !isValidUser ) {
            throw new InternalErrorException("Invalid email or password!");
        }

        return userRegister;
    }
}