import { expect, Locator, Page } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly stateSelect: Locator;
  readonly certificationIdInput: Locator;
  readonly searchButton: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByLabel('First name');
    this.lastNameInput = page.getByLabel('Last name');
    this.stateSelect = page.getByLabel('State');
    this.certificationIdInput = page.getByLabel('Certification ID');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.emptyState = page.locator('.empty-state');
  }

  async goto(path = '/') {
    const normalizedPath = path === '/' ? './' : path.startsWith('/') ? `.${path}` : path;
    await this.page.goto(normalizedPath);
  }

  async submitSearch() {
    await this.searchButton.click();
  }

  async searchById(id: string) {
    await this.certificationIdInput.fill(id);
    await this.submitSearch();
  }

  async searchByNameAndState(firstName: string, lastName: string, state: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.stateSelect.selectOption(state);
    await this.submitSearch();
  }

  getResultCard(recordId: string) {
    return this.page.locator('article.status-card', { hasText: recordId });
  }

  async expectRecordCount(count: number) {
    await expect(this.page.locator('article.status-card')).toHaveCount(count);
  }

  async expectSummaryText(expected: string) {
    await expect(this.page.locator('.summary-bar > span').first()).toHaveText(expected);
  }

  async expectNoResults() {
    await expect(this.emptyState).toBeVisible();
  }

  async resetFilters() {
    await this.firstNameInput.fill('');
    await this.lastNameInput.fill('');
    await this.stateSelect.selectOption('');
    await this.certificationIdInput.fill('');
  }
}
