/*
  Warnings:

  - You are about to drop the column `Gender` on the `Character` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "race" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "gender" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "profession" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Character" ("description", "id", "name", "nickname", "profession", "race") SELECT "description", "id", "name", "nickname", "profession", "race" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
