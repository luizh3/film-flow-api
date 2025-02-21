import { UserType } from "@/types/customer/UserType"
import { UserRequestType } from "@/types/customer/UserRequestType"
import { UserResponseType } from "@/types/customer/UserResponseType"

export class CustomerMapper {

    static toResponse( model : UserType ) : UserResponseType {
        return {
            email: model.email,
            name: model.name,
            id: model.userId,
            avatarUrl: model.avatarUrl
        }
    }

    static toModel( request : UserRequestType ) : UserType {
        return {
            name: request.name,
            email: request.email,
            password: request.password,
            avatarUrl: request.avatarUrl,
        }
    }
}