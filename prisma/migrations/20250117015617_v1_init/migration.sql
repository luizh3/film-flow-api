-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "avatar_url" TEXT DEFAULT '',

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "review_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "like_reviews" (
    "user_id" TEXT NOT NULL,
    "review_id" TEXT NOT NULL,

    CONSTRAINT "like_reviews_pkey" PRIMARY KEY ("user_id","review_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "notification_id" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "attempts" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_movieId_author_id_key" ON "reviews"("movieId", "author_id");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_reviews" ADD CONSTRAINT "like_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_reviews" ADD CONSTRAINT "like_reviews_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("review_id") ON DELETE RESTRICT ON UPDATE CASCADE;
