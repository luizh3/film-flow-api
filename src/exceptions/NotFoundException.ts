import { StatusCodes } from "@/enum/StatusCode"
import { ApiExption } from "./ApiException"

export class NotFoundException extends ApiExption {
    constructor( message : string  ) {
        super( StatusCodes.NOT_FOUND, message )
    }
}