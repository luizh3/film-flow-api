import { StatusCodes } from "@/enum/StatusCode"
import { ApiExption } from "./ApiException"

export class InternalErrorException extends ApiExption {
    constructor( message : string  ) {
        super( StatusCodes.INTERNAL_SERVER_ERROR, message )
    }
}