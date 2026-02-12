import { StatusCodes } from "@/enum/StatusCode"
import { ApiException } from "./ApiException"

export class InternalErrorException extends ApiException {
    constructor( message : string  ) {
        super( StatusCodes.INTERNAL_SERVER_ERROR, message )
    }
}