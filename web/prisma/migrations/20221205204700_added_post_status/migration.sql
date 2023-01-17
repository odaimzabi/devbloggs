-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('Draft', 'Published');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'Draft';
