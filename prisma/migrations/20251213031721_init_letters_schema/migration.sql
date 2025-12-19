-- CreateTable
CREATE TABLE "Letter" (
    "id" SERIAL NOT NULL,
    "people_id" INTEGER NOT NULL,
    "letter_type" TEXT NOT NULL,
    "needs" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "submission_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
);
