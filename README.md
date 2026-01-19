# Task Inbox - AI Agent Fullstack Experiment

This is a minimal full-stack Task Inbox application built entirely by an AI agent (Claude) using the Ralph Loop pattern. The project demonstrates AI-driven development with automated testing and continuous verification.

## Features

1. **Create Task** - Input a task title and add it to the list
2. **View Tasks** - See all tasks in a clean list view
3. **Complete Task** - Mark tasks as complete with visual strikethrough
4. **Delete Task** - Remove tasks from the list

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Backend**: Express + TypeScript
- **Testing**: Playwright E2E
- **Package Manager**: pnpm

## Project Structure

```
agent-fullstack-sandbox/
├── app/
│   ├── web/          # React frontend
│   └── api/          # Express backend
├── e2e/
│   ├── tests/        # Playwright E2E tests
│   └── playwright.config.ts
├── docs/
│   ├── requirements.md    # Feature requirements
│   ├── changelog.md       # Development history
│   └── retrospective.md   # Post-project analysis
├── scripts/
│   ├── dev.sh            # Start dev servers
│   └── test-e2e.sh       # Run E2E tests
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm

### Installation

```bash
# Install dependencies for all packages
pnpm install

# Install frontend dependencies
cd app/web && pnpm install

# Install backend dependencies
cd app/api && pnpm install

# Install E2E test dependencies
cd e2e && pnpm install
```

### Running the Application

#### Option 1: Use the dev script (starts both servers)
```bash
./scripts/dev.sh
```

#### Option 2: Start servers individually

Terminal 1 - Backend:
```bash
cd app/api
pnpm dev
```

Terminal 2 - Frontend:
```bash
cd app/web
pnpm dev
```

Then visit http://localhost:5173

### Running Tests

```bash
# Run all E2E tests
./scripts/test-e2e.sh

# Or run from e2e directory
cd e2e
pnpm exec playwright test
```

## Ralph Loop Experiment

**⚠️ Primary Goal: This project is primarily an experiment to test the Ralph Loop pattern for AI-driven development.**

### What is Ralph Loop?

Ralph Loop is an iterative AI development pattern where the agent:
1. Implements features
2. Runs tests to verify
3. Commits changes with documentation
4. Repeats until completion criteria are met
5. Outputs a completion signal to exit

### Experiment Results

**Total Iterations**: 8 rounds
**Effective Rounds**: 1 (all features completed in first round)
**Wasted Rounds**: 7 (attempting git push authentication and exit detection)

#### ✅ What Worked Well

1. **Test-Driven Development**: E2E tests provided clear success criteria
2. **Automated Verification**: All 4 features passed tests on first try
3. **Documentation**: Automatic changelog and retrospective generation
4. **Zero Human Intervention**: Agent completed all development autonomously

#### ❌ What Didn't Work

1. **Completion Promise Configuration**
   - Started with `completion_promise: null`
   - Agent outputted "PROJECT_DONE" but loop didn't exit
   - Required manual fix in round 5

2. **Git Push Requirement**
   - Original spec required `git push origin main`
   - Non-interactive environment cannot authenticate
   - Wasted 3-4 rounds trying SSH/HTTPS/GitHub CLI
   - **Solution**: Changed requirement to only `git commit` (no push)

3. **Loop Exit Detection**
   - No automatic completion verification
   - Agent repeated same checks 6-8 times
   - **Solution**: Need a `check-completion.sh` script

### Key Learnings

📊 **Efficiency**: Should complete in 1-2 rounds, not 8
🔧 **Configuration**: `completion_promise` must be set from start
🚫 **Constraints**: Avoid requirements needing user credentials
✅ **Automation**: Add auto-completion detection scripts

### Improvements for Next Ralph Loop

See [docs/ralph-loop-improvements.md](docs/ralph-loop-improvements.md) for detailed recommendations:

1. **Set completion_promise from the start**
   ```yaml
   completion_promise: "PROJECT_DONE"  # Don't leave as null!
   ```

2. **Add automatic completion checker**
   ```bash
   ./scripts/check-completion.sh  # Returns ALL_COMPLETE or NOT_COMPLETE
   ```

3. **Avoid interactive requirements**
   - ✅ `git commit` (works)
   - ❌ `git push` (needs auth)
   - ❌ Database migrations (needs credentials)

4. **Clear exit instructions**
   ```markdown
   When ALL conditions met, output exactly: PROJECT_DONE
   Then stop. Do not continue.
   ```

### AI Contribution

This entire project was developed by an AI agent (Claude) following the Ralph Loop pattern:
- Automated implementation of features
- Self-verifying E2E tests after each change
- Git commits with detailed changelog
- Zero human code intervention
- Complete in ~15 minutes of actual development time

**Development Timeline**:
- Round 1 (5 min): Full implementation + tests passing ✅
- Round 2-4 (10 min): Git push authentication attempts ❌
- Round 5-8 (5 min): Configuration fixes and exit detection ⚠️

See [docs/changelog.md](docs/changelog.md) for the complete development history.

## Test Coverage

All 4 core features have passing E2E tests:
- ✓ Create task
- ✓ View task list
- ✓ Complete task
- ✓ Delete task

## License

ISC
