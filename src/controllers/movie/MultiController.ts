import { StatusCodes } from "@/enum/StatusCode";
import { MultiProviderService } from "@/services/movie/MultiProviderService";
import { MultiFiltersParams } from "@/types/api/multi/MultiFiltersParams";
import { SearchMoviesResult } from "@/types/api/SearchMoviesResult";
import { FastifyReply, FastifyRequest } from "fastify";

import { MultiParams } from "@/types/api/multi/MultiParams";
import { MovieInformation } from "@/types/api/MovieInformation";
import { ReviewMapper } from "@/mappers/review/ReviewMapper";
import ReviewService from "@/services/review/ReviewService";
import { FindAllParamsRequest } from "@/types/review/FindAllParamsRequest";

export class MultiController {

    constructor(
        private readonly reviewService: ReviewService,
        private readonly multiProviderService: MultiProviderService
    ) { }

    public delay = async (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public findByName = async (request: FastifyRequest, reply: FastifyReply) => {

        const filters = request.query as MultiFiltersParams;

        const response: SearchMoviesResult = await this.multiProviderService.findByName(filters);

        await new Promise(resolve => setTimeout(resolve, 10000));

        reply.status(StatusCodes.OK).send(response)
    }

    public findById = async (request: FastifyRequest, reply: FastifyReply) => {

        const params = request.params as MultiParams;

        const filters = request.query as MultiFiltersParams;

        const userId = request.user.id;

        const movieResponse: MovieInformation = await this.multiProviderService.findById(params.id, filters);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const myReview = await this.reviewService.findOneByUserIdAndMovieId(userId, params.id.toString());

        const response = {
            ...movieResponse,
            ...(myReview && { myReview: ReviewMapper.toResponse(myReview) })
        }

        reply.status(StatusCodes.OK).send(response)
    }


    async findAllReviewsByIdMovie(request: FastifyRequest, reply: FastifyReply) {

        const params = request.params as MultiParams;
        const filters = request.query as FindAllParamsRequest;
        const userId = request.user.id;

        const reviewResult = await this.reviewService.findAllByIdMovie(userId, params.id.toString(), filters.page);

        const reviewResponse = reviewResult[0]?.map((review) => {
            return ReviewMapper.toResponseWithLikes(review)
        }) ?? [];

        await new Promise(resolve => setTimeout(resolve, 1000));

        reply.status(StatusCodes.OK).send({
            reviews: reviewResponse,
            ...reviewResult[1]
        });

    }


}