import { StatusCodes } from "@/enum/StatusCode"
import { ApiException } from "./ApiException"

export class NotFoundException extends ApiException {
    constructor( message : string  ) {
        super( StatusCodes.NOT_FOUND, message )
    }
}