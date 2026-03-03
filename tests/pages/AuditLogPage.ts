import { expect, Locator, Page } from '@playwright/test';

export class AuditLogPage {
  readonly page: Page;
  readonly table: Locator;

  constructor(page: Page) {
    this.page = page;
    this.table = page.locator('table.audit-table');
  }

  async goto() {
    await this.page.goto('./staff-audit');
    await expect(this.table).toBeVisible();
  }

  getRows() {
    return this.table.locator('tbody tr');
  }

  getEventRows(action: string, recordId: string) {
    return this.getRows().filter({ hasText: action }).filter({ hasText: recordId });
  }

  async expectEventCount(action: string, recordId: string, expected: number) {
    await expect(this.getEventRows(action, recordId)).toHaveCount(expected);
  }
}
