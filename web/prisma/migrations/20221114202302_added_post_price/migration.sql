-- CreateEnum
CREATE TYPE "PostPrice" AS ENUM ('Paid', 'Free');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "price" "PostPrice" NOT NULL DEFAULT 'Free';
