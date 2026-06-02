/*
  Warnings:

  - You are about to drop the column `password` on the `Task` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Task_title_key";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "password",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
