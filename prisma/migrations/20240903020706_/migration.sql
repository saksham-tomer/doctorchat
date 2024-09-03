/*
  Warnings:

  - A unique constraint covering the columns `[governmentid]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "doctorverified" BOOLEAN DEFAULT false,
ADD COLUMN     "governmentid" TEXT,
ADD COLUMN     "hospitalid" INTEGER;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "patientverified" BOOLEAN DEFAULT false,
ADD CONSTRAINT "Patient_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "hospitals" (
    "id" SERIAL NOT NULL,
    "ambulancecount" INTEGER,
    "bedcount" INTEGER,
    "hospitalname" TEXT,
    "hospitaladdress" TEXT,
    "hospitalphone" BIGINT,
    "hospitalverified" BOOLEAN DEFAULT false,
    "hospitalimage" TEXT,

    CONSTRAINT "hospitals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_governmentid_key" ON "Doctor"("governmentid");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_hospitalid_fkey" FOREIGN KEY ("hospitalid") REFERENCES "hospitals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
