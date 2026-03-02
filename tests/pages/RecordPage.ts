import { expect, Locator, Page } from '@playwright/test';

export class RecordPage {
  readonly card: Locator;
  readonly requestButton: Locator;
  readonly disciplineBanner: Locator;
  readonly maintenanceHint: Locator;

  constructor(private page: Page, private recordId: string) {
    this.card = page.locator('article.status-card', { hasText: recordId });
    this.requestButton = this.card.getByRole('button', { name: 'Request verification' });
    this.disciplineBanner = this.card.locator('.discipline-banner');
    this.maintenanceHint = this.card.locator(`#maintenance-${recordId}`);
  }

  async requestVerification() {
    await this.requestButton.click();
  }

  async expectDisciplineBannerVisible() {
    await expect(this.disciplineBanner).toBeVisible();
  }

  async expectDisciplineBannerHidden() {
    await expect(this.disciplineBanner).toHaveCount(0);
  }

  async expectRequestButtonDisabled() {
    await expect(this.requestButton).toBeDisabled();
  }

  async expectMaintenanceHint(message: string) {
    await expect(this.maintenanceHint).toHaveText(message);
  }
}
