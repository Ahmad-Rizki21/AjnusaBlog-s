#!/bin/bash
set -e

# Run Prisma migrations
npx prisma migrate deploy

# Start the application
exec node server.js
