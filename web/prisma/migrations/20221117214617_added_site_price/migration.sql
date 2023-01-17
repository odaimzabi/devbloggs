/*
  Warnings:

  - A unique constraint covering the columns `[siteId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "price" TEXT NOT NULL DEFAULT '10';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "siteId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_siteId_key" ON "User"("siteId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;
