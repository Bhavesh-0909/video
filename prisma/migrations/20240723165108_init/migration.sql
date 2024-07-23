-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "displayName" TEXT,
    "email" TEXT,
    "photoURL" TEXT,
    "emailVerified" BOOLEAN NOT NULL,
    "phoneNumber" TEXT,
    "providerId" TEXT NOT NULL,
    "additionalData" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);
