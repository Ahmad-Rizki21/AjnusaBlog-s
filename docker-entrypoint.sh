#!/bin/bash
set -e

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Run Prisma seed
echo "Running Prisma seed..."
npx prisma db seed || echo "Seed completed with warnings (this is okay)"

# Fix UUID slugs (run once after setup)
if [ "$FIX_SLUGS" = "true" ]; then
  echo "Fixing UUID slugs..."
  npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/fix-slugs.ts
fi

# Start the application
echo "Starting application..."
exec node server.js
