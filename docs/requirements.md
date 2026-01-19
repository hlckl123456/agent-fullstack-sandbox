# Task Inbox - Requirements

## Overview
A minimal full-stack Task Inbox application to demonstrate AI agent-driven development.

## Core Features

### 1. Create Task
- User can input task title in a text field
- User clicks "Add" button
- Task appears in the task list
- Input field clears after adding

### 2. View Task List
- Display all tasks in a list
- Each task shows:
  - Title
  - Status (pending/completed)
  - Action buttons (Complete, Delete)

### 3. Complete Task
- User clicks "Complete" button on a task
- Task status changes to "completed"
- Visual indication of completed state (e.g., strikethrough, different color)

### 4. Delete Task
- User clicks "Delete" button on a task
- Task is removed from the list
- List updates immediately

## Technical Requirements

### Frontend
- React with TypeScript
- Vite for build tooling
- Clean, minimal UI
- API integration for all CRUD operations

### Backend
- Express with TypeScript
- RESTful API endpoints:
  - GET /tasks - List all tasks
  - POST /tasks - Create new task
  - PATCH /tasks/:id - Update task (complete)
  - DELETE /tasks/:id - Delete task
- In-memory storage (no database required)

### Testing
- Playwright E2E tests for all 4 core features
- Tests must pass before moving to next feature
- Trace and screenshot on failure

## Success Criteria
- All 4 features working end-to-end
- All E2E tests passing
- Code committed to git with clear messages
- Documentation updated
