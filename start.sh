#!/bin/sh

set -e

echo "Current directory: $(pwd)"
echo "Contents of current directory:"
ls -la

echo "Building Tailwind CSS..."
npm run build:css

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Building Next.js app..."
#npm run build

echo "Starting Next.js production server..."
exec npm run dev