# Agent Work Rules

## Workflow
1. Read docs/requirements.md to confirm current goal
2. Implement/modify code
3. Run scripts/test-e2e.sh (Playwright tests)
4. If tests fail: fix and retest until passing
5. When tests pass:
   - Update docs/changelog.md
   - Commit with message: [Round N] Description
   - Push to remote
6. Continue to next feature

## Testing Rules
- Never skip tests
- Never continue to next feature if tests fail
- All test artifacts go to e2e/artifacts/

## Git Rules
- Never force push
- Never delete existing test cases
- Commit after each successful round

## Completion Criteria
Output PROJECT_DONE only when:
1. All 4 core features implemented
2. All E2E tests passing
3. docs/changelog.md complete
4. docs/retrospective.md complete
5. README.md complete
6. All changes committed and pushed
