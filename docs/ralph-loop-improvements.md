# Ralph Loop 改进建议

基于本次 Task Inbox 项目的实验结果，以下是下次 Ralph Loop 的改进方案。

## 问题总结

### 1. ❌ Completion Promise 配置错误
- **问题**: `completion_promise: null` 导致无法自动退出
- **影响**: 即使输出 PROJECT_DONE 也继续循环
- **浪费**: 第 6-8 轮完全无效

### 2. ❌ Git Push 要求不切实际
- **问题**: 非交互环境无法完成认证
- **影响**: 浪费 3-4 轮尝试各种认证方法
- **教训**: 应只要求 git commit，不要求 push

### 3. ❌ 缺少智能完成检测
- **问题**: 没有自动验证完成条件的机制
- **影响**: Agent 需要反复手动验证
- **建议**: 添加自动检测脚本

## 改进方案

### ✅ 方案 1: 更好的 Prompt 设计

\`\`\`markdown
---
active: true
iteration: 1
max_iterations: 10
completion_promise: "PROJECT_DONE"  # ⚠️ 必须从一开始就设置！
started_at: "2026-01-19T00:00:00Z"
---

# Agent 全栈实验：Task Inbox v2

## 完成条件（Completion Promise: PROJECT_DONE）

**重要**: 当满足以下条件时，你必须在响应末尾单独一行输出: PROJECT_DONE

1. 4 个核心功能全部实现且可用
2. Playwright E2E 全部通过（0 failures）
3. docs/changelog.md 记录了所有变更
4. docs/retrospective.md 完整
5. README.md 完整
6. **所有代码已 commit 到本地仓库** (不要求 push！)

## 自动完成检测

每轮开始时，先运行完成检测脚本：

\`\`\`bash
./scripts/check-completion.sh
\`\`\`

如果脚本返回 "ALL_COMPLETE"，立即输出 PROJECT_DONE 并退出。

## 每轮流程

1. **检查是否已完成**: 运行 ./scripts/check-completion.sh
   - 如果返回 ALL_COMPLETE → 输出 PROJECT_DONE 并退出
   - 否则继续下一步

2. **读取需求**: docs/requirements.md

3. **实现/修改代码**

4. **运行测试**: ./scripts/test-e2e.sh
   - 失败 → 修复并重新测试
   - 通过 → 继续

5. **更新文档**: docs/changelog.md

6. **提交代码**: git add . && git commit -m '[Round N] ...'

7. **重新检查完成条件** (回到步骤 1)

## 禁止事项

- ❌ 不要跳过测试
- ❌ 不要 force push
- ❌ 不要删除测试用例
- ❌ **不要尝试 git push** (只需 commit)
- ❌ 不要在未通过测试时继续
\`\`\`

### ✅ 方案 2: 添加自动完成检测脚本

\`\`\`bash
#!/bin/bash
# scripts/check-completion.sh
# 自动检测是否满足所有完成条件

ERRORS=0

echo "=== 检查完成条件 ==="

# 1. 检查核心功能代码
if [[ ! -f app/web/src/App.tsx ]] || [[ ! -f app/api/src/index.ts ]]; then
  echo "❌ 1. 核心功能代码缺失"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ 1. 核心功能代码存在"
fi

# 2. 检查 E2E 测试
cd e2e
TEST_OUTPUT=$(pnpm exec playwright test --reporter=line 2>&1 | grep -E "passed|failed")
if echo "$TEST_OUTPUT" | grep -q "failed"; then
  echo "❌ 2. E2E 测试失败"
  ERRORS=$((ERRORS + 1))
elif echo "$TEST_OUTPUT" | grep -q "4 passed"; then
  echo "✅ 2. E2E 测试通过 (4/4)"
else
  echo "❌ 2. E2E 测试未运行或不完整"
  ERRORS=$((ERRORS + 1))
fi
cd ..

# 3. 检查文档
for doc in docs/changelog.md docs/retrospective.md README.md; do
  if [[ ! -f $doc ]]; then
    echo "❌ 文档缺失: $doc"
    ERRORS=$((ERRORS + 1))
  fi
done

if [[ -f docs/changelog.md ]] && [[ -f docs/retrospective.md ]] && [[ -f README.md ]]; then
  echo "✅ 3-5. 所有文档存在"
fi

# 4. 检查 retrospective 内容
if grep -q "工程护栏\|Guardrail" docs/retrospective.md && \
   grep -q "失败模式\|Failure" docs/retrospective.md && \
   grep -q "改进建议\|Suggestion" docs/retrospective.md; then
  echo "✅ 4. retrospective.md 内容完整"
else
  echo "❌ 4. retrospective.md 内容不完整"
  ERRORS=$((ERRORS + 1))
fi

# 5. 检查 README 内容
if grep -q "AI Agent\|AI agent" README.md && \
   grep -q "pnpm install" README.md && \
   grep -q "changelog" README.md; then
  echo "✅ 5. README.md 内容完整"
else
  echo "❌ 5. README.md 内容不完整"
  ERRORS=$((ERRORS + 1))
fi

# 6. 检查 git commits
COMMIT_COUNT=$(git log --oneline | wc -l | xargs)
if [[ $COMMIT_COUNT -gt 0 ]]; then
  echo "✅ 6. 代码已提交 ($COMMIT_COUNT commits)"
else
  echo "❌ 6. 没有 git commits"
  ERRORS=$((ERRORS + 1))
fi

# 总结
echo ""
if [[ $ERRORS -eq 0 ]]; then
  echo "🎉 所有完成条件已满足！"
  echo "ALL_COMPLETE"
  exit 0
else
  echo "⚠️  还有 $ERRORS 个条件未满足"
  echo "NOT_COMPLETE"
  exit 1
fi
\`\`\`

### ✅ 方案 3: 简化的完成条件

去掉不必要的复杂度：

**之前** (6 个条件):
1. 4 个核心功能 ✅
2. E2E 测试通过 ✅
3. changelog.md ✅
4. retrospective.md (3个子项) ✅
5. README.md (3个子项) ✅
6. commit **并 push** ❌ (问题!)

**改进后** (4 个条件):
1. **所有功能实现且测试通过** (合并 1+2)
2. **文档完整** (合并 3+4+5)
3. **代码已提交** (只要 commit)
4. **质量检查通过** (新增: lint, type check)

### ✅ 方案 4: 更智能的 Agent 提示

在 prompt 中添加：

\`\`\`markdown
## Agent 自检流程

在每轮开始时，你应该：

1. **运行完成检测**: \`./scripts/check-completion.sh\`
2. **如果返回 ALL_COMPLETE**:
   - 不要再做任何工作
   - 立即输出: PROJECT_DONE
   - 不要解释，不要验证，直接退出
3. **如果返回 NOT_COMPLETE**:
   - 查看哪些条件未满足
   - 专注完成缺失的部分
   - 不要重复已完成的工作

## 避免无效循环

如果你发现自己在第 N 轮 (N > 3):
- 停止并思考: 为什么还没完成？
- 检查是否陷入认证/权限问题
- 如果是环境问题 (如 git push 失败):
  - 记录到 BLOCKER.md
  - 不要继续尝试相同方法
  - 寻求用户帮助或调整完成条件
\`\`\`

## 最佳实践总结

### ✅ DO (应该做的)

1. **从一开始就设置 completion_promise**
2. **添加自动完成检测脚本**
3. **避免需要用户交互的要求** (如 git push)
4. **每轮先检查是否已完成**
5. **明确指示何时输出完成信号**
6. **限制最大轮数** (如 max_iterations: 10)
7. **记录每轮的进展和阻塞**

### ❌ DON'T (不应该做的)

1. **不要留 completion_promise 为 null**
2. **不要要求需要密码/token 的操作**
3. **不要在已完成后继续循环**
4. **不要让 Agent 反复验证相同条件**
5. **不要设置模糊的完成条件**
6. **不要忽略环境限制** (非交互式)
7. **不要让轮数超过 10 轮**

## 理想的 Ralph Loop 流程

\`\`\`
Round 1: 实现所有功能 + 测试 + 文档 → commit
         ↓
         检查完成条件 → 全部满足 → PROJECT_DONE ✅

理想情况: 1-2 轮完成
可接受: 3-5 轮完成
有问题: >5 轮 (需要检查 prompt 设计)
\`\`\`

## 下次实验建议

### 实验 2: 改进版 Task Inbox

使用改进后的配置，目标：
- 1 轮完成所有开发
- 自动检测并退出
- 0 次认证失败
- 总耗时 < 10 分钟

### 实验 3: 多轮迭代项目

测试 Ralph Loop 在需要多轮迭代的场景:
- Round 1: MVP (最小功能)
- Round 2: 添加功能 A
- Round 3: 添加功能 B
- Round 4: 优化和文档
- 每轮明确的完成条件

### 实验 4: 错误恢复

故意引入问题，测试 Ralph Loop 的恢复能力:
- 依赖安装失败
- 测试失败
- 配置错误
- 看 Agent 能否自动修复

## 关键洞察

**Ralph Loop 的价值在于**:
1. 自动化迭代开发
2. 强制测试驱动
3. 完整的变更记录
4. 可重现的构建过程

**但前提是**:
1. 完成条件必须可自动验证
2. 不能依赖外部认证/交互
3. 要有智能的退出机制
4. prompt 设计要考虑环境限制

## 结论

这次实验成功完成了项目开发，但暴露了 Ralph Loop 配置的改进空间。
核心问题是: **completion_promise 配置** 和 **git push 要求**。
下次实验应该使用上述改进方案，预期可以将轮数从 8 轮降到 1-2 轮。
