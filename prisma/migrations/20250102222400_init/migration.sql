-- CreateTable
CREATE TABLE "Seeker" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "sexuality" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seeker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Giver" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "sexuality" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Giver_pkey" PRIMARY KEY ("id")
);
