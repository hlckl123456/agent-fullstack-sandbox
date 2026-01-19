#!/bin/bash

# Script to start both frontend and backend in development mode

echo "Starting Task Inbox development servers..."

# Start API server in background
cd app/api
pnpm dev &
API_PID=$!

# Start web server in background
cd ../web
pnpm dev &
WEB_PID=$!

# Wait for Ctrl+C
trap "kill $API_PID $WEB_PID; exit" INT

echo "API running on http://localhost:3001"
echo "Web running on http://localhost:5173"
echo "Press Ctrl+C to stop both servers"

wait
