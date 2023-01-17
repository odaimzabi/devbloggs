-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "linkedin" TEXT,
    "facebook" TEXT,
    "description" TEXT,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);
