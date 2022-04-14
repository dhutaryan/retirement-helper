-- CreateTable
CREATE TABLE "refreshTokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refreshTokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refreshTokens_token_key" ON "refreshTokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "refreshTokens_fingerprint_key" ON "refreshTokens"("fingerprint");
