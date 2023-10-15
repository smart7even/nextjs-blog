-- CreateTable
CREATE TABLE "QRCode" (
    "id" TEXT NOT NULL,

    CONSTRAINT "QRCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceCodes" (
    "codeId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,

    CONSTRAINT "ResourceCodes_pkey" PRIMARY KEY ("codeId","resourceId")
);

-- AddForeignKey
ALTER TABLE "ResourceCodes" ADD CONSTRAINT "ResourceCodes_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "QRCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceCodes" ADD CONSTRAINT "ResourceCodes_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
