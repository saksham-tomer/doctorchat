-- CreateEnum
CREATE TYPE "Role" AS ENUM ('patient', 'doctor', 'admin');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT,
    "role" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "sessions" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Patient" (
    "firstname" TEXT,
    "lastname" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "doctorassigned" INTEGER,
    "patientid" BIGINT,
    "role" "Role" DEFAULT 'patient'
);

-- CreateTable
CREATE TABLE "Doctor" (
    "doctorid" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "lastname" TEXT,
    "sex" "Sex" NOT NULL DEFAULT 'Male',
    "phone" BIGINT,
    "address" TEXT,
    "about" TEXT,
    "patient_id" BIGINT,
    "specialization" TEXT,
    "image" TEXT,
    "dob" TIMESTAMP(3),

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("doctorid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_password_key" ON "users"("password");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_username_key" ON "Patient"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_password_key" ON "Patient"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_patientid_key" ON "Patient"("patientid");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_doctorid_key" ON "Doctor"("doctorid");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_doctorassigned_fkey" FOREIGN KEY ("doctorassigned") REFERENCES "Doctor"("doctorid") ON DELETE SET NULL ON UPDATE CASCADE;
