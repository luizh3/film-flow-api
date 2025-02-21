import { InternalErrorException } from "@/exceptions/InternalErrorException";
import { FetchWrapper } from "@/utils/FetchWrapper";

export class TMDBEndpoint {

    protected httpClient : FetchWrapper;
    protected token : string | undefined = process.env.ACCESS_TOKEN_TMDB;
    protected baseUrl : string | undefined = process.env.API_URL_TMDB;

    constructor() {

        if( !this.token || !this.baseUrl ) {
            throw new InternalErrorException("TMDB Configurations not found!");
        }

        this.httpClient = new FetchWrapper( this.baseUrl, this.token );
    }

}