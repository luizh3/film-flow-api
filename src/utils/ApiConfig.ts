import { MovieProviderEnum } from "@/enum/MovieProviderEnum";
import { InternalErrorException } from "@/exceptions/InternalErrorException";
import { logger } from "./Logger";

class ApiConfig {

    private readonly tpProvider : MovieProviderEnum = process.env.TP_PROVIDER as MovieProviderEnum;

    public getTpProvider = () => {
        
        if( this.tpProvider !== MovieProviderEnum.UNKNOW ) {
            return this.tpProvider;
        }

        logger.error("Provider not found!")
        throw new InternalErrorException( "Provider not found!" );
    }

}

export default new ApiConfig();