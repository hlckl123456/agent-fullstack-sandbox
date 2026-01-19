import { test, expect } from '@playwright/test';

test.describe('Task Inbox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should create a new task', async ({ page }) => {
    const taskTitle = 'Buy groceries';

    await page.getByTestId('task-input').fill(taskTitle);
    await page.getByTestId('add-button').click();

    const taskItem = page.getByTestId('task-item').filter({ hasText: taskTitle });
    await expect(taskItem).toBeVisible();

    const input = page.getByTestId('task-input');
    await expect(input).toHaveValue('');
  });

  test('should view task list', async ({ page }) => {
    const task1 = 'Task 1';
    const task2 = 'Task 2';

    await page.getByTestId('task-input').fill(task1);
    await page.getByTestId('add-button').click();

    await page.getByTestId('task-input').fill(task2);
    await page.getByTestId('add-button').click();

    const taskItems = page.getByTestId('task-item');
    await expect(taskItems).toHaveCount(2);

    await expect(taskItems.filter({ hasText: task1 })).toBeVisible();
    await expect(taskItems.filter({ hasText: task2 })).toBeVisible();
  });

  test('should complete a task', async ({ page }) => {
    const taskTitle = 'Complete this task';

    await page.getByTestId('task-input').fill(taskTitle);
    await page.getByTestId('add-button').click();

    const taskItem = page.getByTestId('task-item').filter({ hasText: taskTitle });
    await expect(taskItem).not.toHaveClass(/completed/);

    await taskItem.getByTestId('complete-button').click();

    await expect(taskItem).toHaveClass(/completed/);
    const taskTitle_element = taskItem.locator('.task-title');
    await expect(taskTitle_element).toHaveCSS('text-decoration', /line-through/);
  });

  test('should delete a task', async ({ page }) => {
    const taskTitle = 'Delete this task';

    await page.getByTestId('task-input').fill(taskTitle);
    await page.getByTestId('add-button').click();

    const taskItem = page.getByTestId('task-item').filter({ hasText: taskTitle });
    await expect(taskItem).toBeVisible();

    await taskItem.getByTestId('delete-button').click();

    await expect(taskItem).not.toBeVisible();
  });
});
