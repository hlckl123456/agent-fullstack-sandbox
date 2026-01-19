#!/bin/bash

# Script to run E2E tests

echo "Running E2E tests..."

cd e2e
pnpm exec playwright test

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  echo "✓ All E2E tests passed!"
else
  echo "✗ E2E tests failed. Check artifacts for details."
fi

exit $EXIT_CODE
