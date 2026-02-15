import { MovieProviderEnum } from "@/enum/MovieProviderEnum";
import { InternalErrorException } from "@/exceptions/InternalErrorException";
import { logger } from "./Logger";

class ApiConfig {

    public getTpProvider = () => {

        const tpProvider: MovieProviderEnum = process.env.TP_PROVIDER as MovieProviderEnum;

        if (tpProvider !== MovieProviderEnum.UNKNOW) {
            return tpProvider;
        }

        logger.error("Provider not found!")

        throw new InternalErrorException("Provider not found!");
    }

}

export default new ApiConfig();