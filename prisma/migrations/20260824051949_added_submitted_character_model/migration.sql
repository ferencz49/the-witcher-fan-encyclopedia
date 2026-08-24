-- CreateTable
CREATE TABLE "SubmittedCharacter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "race" "Race" NOT NULL DEFAULT 'UNKNOWN',
    "gender" "Gender" NOT NULL DEFAULT 'UNKNOWN',
    "profession" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "SubmittedCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubmittedCharacter_name_key" ON "SubmittedCharacter"("name");
