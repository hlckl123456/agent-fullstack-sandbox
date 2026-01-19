# Changelog

All notable changes to this project will be documented in this file.

## [Round 1] - Initial Setup

### Created
- Project structure (app/web, app/api, e2e, docs, scripts)
- docs/requirements.md - Feature requirements and technical specifications
- docs/changelog.md - This changelog
- agent.md - Agent workflow rules

### Frontend (React + Vite + TypeScript)
- Initialized React app with Vite
- Implemented Task Inbox UI with:
  - Task input form
  - Task list display
  - Complete/Undo task buttons
  - Delete task buttons
  - Completed state styling (strikethrough)
- API integration for all CRUD operations

### Backend (Express + TypeScript)
- Initialized Express API server
- Implemented RESTful endpoints:
  - GET /tasks - List all tasks
  - POST /tasks - Create new task
  - PATCH /tasks/:id - Update task (complete/uncomplete)
  - DELETE /tasks/:id - Delete task
  - GET /health - Health check
- In-memory task storage

### E2E Tests (Playwright)
- Configured Playwright with trace and screenshot on failure
- Implemented 4 core feature tests:
  1. Create task - Input title, click add, verify task appears
  2. View task list - Add multiple tasks, verify all appear
  3. Complete task - Mark task complete, verify strikethrough styling
  4. Delete task - Remove task, verify disappears from list
- All tests passing (4/4)

### Scripts
- scripts/dev.sh - Start both frontend and backend servers
- scripts/test-e2e.sh - Run Playwright E2E tests

### Status
✓ All 4 core features implemented
✓ All E2E tests passing
