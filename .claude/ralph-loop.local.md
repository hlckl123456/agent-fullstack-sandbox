---
active: true
iteration: 1
max_iterations: 25
completion_promise: null
started_at: "2026-01-19T04:53:47Z"
---



# Agent 全栈实验：Task Inbox

## 项目目标

创建一个最小完备的全栈 Task Inbox 应用，全程自动化、可验证、有记录。

## 技术栈

- 前端：React + Vite + TypeScript

- 后端：Express + TypeScript

- 测试：Playwright E2E

- 包管理：pnpm

## 项目结构（必须遵守）

agent-fullstack-sandbox/

├── app/

│   ├── web/          # 前端

│   └── api/          # 后端

├── e2e/

│   ├── tests/

│   └── playwright.config.ts

├── docs/

│   ├── requirements.md    # 需求文档

│   ├── changelog.md       # 每轮变更记录

│   └── retrospective.md   # 最终复盘

├── scripts/

│   ├── dev.sh             # 启动开发环境

│   └── test-e2e.sh        # 运行 E2E 测试

├── agent.md               # Agent 工作规则

└── README.md              # 项目说明

## 功能需求（Critical Path）

1. 创建任务：输入标题，点击添加，任务出现在列表

2. 查看任务列表：显示所有任务

3. 完成任务：点击完成，状态变为已完成

4. 删除任务：点击删除，任务从列表消失

## 每轮必须执行的流程

1. 读取 docs/requirements.md 确认当前目标

2. 实现/修改代码

3. 运行 scripts/test-e2e.sh（Playwright 测试）

4. 如果测试失败：修复后重新测试，直到通过

5. 测试通过后：

   - 更新 docs/changelog.md（记录本轮做了什么）

   - git add . && git commit -m '[轮次N] 变更描述'

   - git push origin main

6. 继续下一个功能，直到所有功能完成

## E2E 测试要求

- 必须覆盖 4 个核心功能的 happy path

- 使用 playwright.config.ts 配置 trace 和 screenshot

- 测试产物输出到 e2e/artifacts/

## 完成条件（Completion Promise: PROJECT_DONE）

当以下全部满足时，输出 PROJECT_DONE：

1. 4 个核心功能全部实现且可用

2. Playwright E2E 全部通过（0 failures）

3. docs/changelog.md 记录了所有变更

4. docs/retrospective.md 包含：

   - 3 个最有价值的工程护栏

   - 3 个最常见失败模式

   - 3 个下次改进建议

5. README.md 包含：

   - 项目说明（这是 AI Agent 驱动的实验）

   - 如何运行（pnpm install, pnpm dev, pnpm test:e2e）

   - AI 贡献记录（链接到 changelog.md）

6. 所有代码已 commit 并 push 到 remote

## 禁止事项

- 不要跳过测试

- 不要 force push

- 不要删除已有的测试用例

- 不要在测试失败时继续下一个功能

## 开始

先创建项目结构，然后从 requirements.md 开始，逐步实现功能。


