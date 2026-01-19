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

## AI Contribution

This entire project was developed by an AI agent following the Ralph Loop pattern:
- Automated implementation of features
- Self-verifying E2E tests after each change
- Git commits with detailed changelog
- Zero human code intervention

See [docs/changelog.md](docs/changelog.md) for the complete development history.

## Test Coverage

All 4 core features have passing E2E tests:
- ✓ Create task
- ✓ View task list
- ✓ Complete task
- ✓ Delete task

## License

ISC
