import { ConfigController } from "@/controllers/config/ConfigController";
import { UserController } from "@/controllers/customer/UserController";
import { MovieController } from "@/controllers/movie/MovieController";
import { MultiController } from "@/controllers/movie/MultiController";
import { SectionController } from "@/controllers/movie/SectionController";
import { TVController } from "@/controllers/movie/TVController";
import { NotificationController } from "@/controllers/notification/NotificationController";
import { ReviewController } from "@/controllers/review/ReviewController";

import { UserRepository } from "@/repositories/customer/UserRepository";
import { LikeReviewRepository } from "@/repositories/like/LikeReviewRepository";
import { NotificationRepository } from "@/repositories/notification/NotificationRepository";
import { ReviewRepository } from "@/repositories/review/ReviewRepository";

import { GenreServiceFactory } from "@/services/movie/factory/GenreServiceFactory";
import { MovieServiceFactory } from "@/services/movie/factory/MovieServiceFactory";
import { MultiServiceFactory } from "@/services/movie/factory/MultiServiceFactory";
import { SectionServiceFactory } from "@/services/movie/factory/SectionServiceFactory";
import { TVServiceFactory } from "@/services/movie/factory/TVServiceFactory";
import LikeReviewService from "@/services/like/LikeReviewService";
import { NotificationService } from "@/services/notification/NotificationService";
import ReviewService from "@/services/review/ReviewService";
import { UserService } from "@/services/customer/UserService";
import ApiConfig from "@/utils/ApiConfig";

export function createContainer() {
    const userRepository = new UserRepository();
    const reviewRepository = new ReviewRepository();
    const likeReviewRepository = new LikeReviewRepository();
    const notificationRepository = new NotificationRepository();

    const userService = new UserService(userRepository);
    const notificationService = new NotificationService(notificationRepository);
    const reviewService = new ReviewService(reviewRepository);
    const likeReviewService = new LikeReviewService(likeReviewRepository);

    const tpProvider = ApiConfig.getTpProvider();
    const genreProviderService = GenreServiceFactory.create(tpProvider);
    const movieProviderService = MovieServiceFactory.create(tpProvider);
    const multiProviderService = MultiServiceFactory.create(tpProvider);
    const sectionService = SectionServiceFactory.create(tpProvider);
    const tvProviderService = TVServiceFactory.create(tpProvider);

    const userController = new UserController(userService);
    const notificationController = new NotificationController(notificationService, userService);
    const reviewController = new ReviewController(reviewService, likeReviewService, notificationService);
    const multiController = new MultiController(reviewService, multiProviderService);
    const configController = new ConfigController(genreProviderService);
    const movieController = new MovieController(movieProviderService);
    const sectionController = new SectionController(sectionService);
    const tvController = new TVController(tvProviderService);

    return {
        userController,
        notificationController,
        reviewController,
        multiController,
        configController,
        movieController,
        sectionController,
        tvController,
    };
}

export type Container = ReturnType<typeof createContainer>;
