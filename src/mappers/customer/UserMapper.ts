import { User } from "@prisma/client";
import { UserType } from "@/types/customer/UserType"
import { UserRequest } from "@/types/customer/UserRequest"
import { UserResponse } from "@/types/customer/UserResponse"

export class CustomerMapper {

    static toResponse( model : User ) : UserResponse {
        return {
            id: model.userId,
            email: model.email,
            name: model.name,
            avatarUrl: model.avatarUrl
        }
    }

    static toModel( request : UserRequest ) : UserType {
        return {
            name: request.name,
            email: request.email,
            password: request.password,
            avatarUrl: request.avatarUrl,
        }
    }
}