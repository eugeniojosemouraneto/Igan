/*
  Warnings:

  - Added the required column `userId` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "slug" TEXT NOT NULL,
    "isStatus" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    CONSTRAINT "task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_task" ("description", "id", "isStatus", "slug", "title") SELECT "description", "id", "isStatus", "slug", "title" FROM "task";
DROP TABLE "task";
ALTER TABLE "new_task" RENAME TO "task";
CREATE UNIQUE INDEX "task_slug_key" ON "task"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
