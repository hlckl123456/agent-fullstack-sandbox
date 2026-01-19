# Retrospective - Task Inbox AI Agent Experiment

## Project Summary

Successfully built a full-stack Task Inbox application using AI agent-driven development with the Ralph Loop pattern. All 4 core features implemented and verified with E2E tests in a single iteration.

## 3 Most Valuable Engineering Guardrails

### 1. E2E Tests as Source of Truth
- **Value**: Prevented feature drift and ensured all requirements were met
- **Impact**: Caught configuration issues immediately (webServer paths, package dependencies)
- **Learning**: Tests must be executable from the start, not just planned

### 2. Incremental Verification with Automated Testing
- **Value**: Each change was verified before moving forward
- **Impact**: No accumulated technical debt or broken features
- **Learning**: The Ralph Loop's "test before proceed" rule prevented cascading failures

### 3. Clear Requirements Document (docs/requirements.md)
- **Value**: Single source of truth for feature definitions
- **Impact**: Eliminated ambiguity about what "complete" means for each feature
- **Learning**: Requirements should include both functionality AND acceptance criteria

## 3 Most Common Failure Modes

### 1. Path Resolution in Multi-Package Setup
- **Issue**: Playwright webServer commands initially used relative paths incorrectly
- **Root Cause**: Working directory confusion between root, e2e, and app directories
- **Fix**: Used `cwd` property in Playwright config to set proper working directory
- **Prevention**: Always test path-dependent configs with actual execution

### 2. Dependency Installation Scope
- **Issue**: @playwright/test needed to be installed in e2e directory, not just root
- **Root Cause**: Playwright requires dependencies in the directory where tests run
- **Fix**: Ran `pnpm add -D @playwright/test` in e2e directory
- **Prevention**: Each package directory with its own tooling needs its own package.json

### 3. Invalid URL Navigation Error
- **Issue**: Tests failed with "Cannot navigate to invalid URL"
- **Root Cause**: baseURL in Playwright config wasn't being applied (likely due to webServer not starting)
- **Fix**: Fixed webServer configuration and installed proper dependencies
- **Learning**: URL errors often mask deeper configuration problems

## 3 Suggestions for Next Iteration

### 1. Add Workspace Configuration
- **Why**: Simplify multi-package management
- **How**: Use pnpm workspace to link app/web, app/api, and e2e
- **Benefit**: Single `pnpm install` at root installs all dependencies
- **Example**:
  ```yaml
  # pnpm-workspace.yaml
  packages:
    - 'app/*'
    - 'e2e'
  ```

### 2. Add Data Persistence
- **Why**: Current in-memory storage loses tasks on server restart
- **How**: Add SQLite with TypeORM or Prisma for simple file-based persistence
- **Benefit**: More realistic testing of state management
- **Scope**: Keep it simple - no need for PostgreSQL/MySQL for this experiment

### 3. Implement API Error Handling Tests
- **Why**: Current tests only cover happy paths
- **How**: Add negative test cases:
  - Empty task title
  - Invalid task ID
  - Server unavailable scenarios
- **Benefit**: Ensure graceful degradation and user feedback
- **Example Tests**:
  - Should show error when API is down
  - Should prevent adding empty tasks
  - Should handle 404 on delete

## Metrics

- **Time to First Test Pass**: 1 iteration
- **Total Features**: 4/4 implemented
- **Test Pass Rate**: 100% (4/4 tests)
- **Commits**: 1 (Round 1)
- **Lines of Code**:
  - Frontend: ~160 lines (App.tsx + App.css)
  - Backend: ~90 lines (API server)
  - Tests: ~70 lines (E2E tests)

## Key Takeaways

1. **Testing-First Mindset Works**: Having E2E tests from the start forced clear thinking about requirements
2. **Automation Catches Human Errors**: The Ralph Loop's forced verification prevented "it should work" assumptions
3. **Simple Architecture Wins**: In-memory storage, single-file components, and minimal dependencies made the project manageable
4. **Documentation is Code**: README, changelog, and requirements docs were as important as the code itself

## Conclusion

The Ralph Loop pattern successfully delivered a working full-stack application with zero manual verification steps. The key success factor was the tight feedback loop between implementation and automated testing. Future iterations should focus on workspace configuration and expanded test coverage while maintaining the simplicity that made this iteration successful.
