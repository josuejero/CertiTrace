import { expect, Page } from '@playwright/test';

export class VerificationPage {
  readonly dialog = this.page.getByRole('dialog', { name: 'Request verification letter' });
  readonly recipientNameInput = this.dialog.getByLabel('Recipient name');
  readonly recipientEmailInput = this.dialog.getByLabel('Recipient email');
  readonly submitButton = this.dialog.getByRole('button', { name: 'Submit request' });
  readonly cancelButton = this.dialog.getByRole('button', { name: 'Cancel' });
  readonly validationAlert = this.dialog.getByRole('alert');

  constructor(private page: Page) {}

  async submitForm(recipientName: string, recipientEmail: string) {
    await this.recipientNameInput.fill(recipientName);
    await this.recipientEmailInput.fill(recipientEmail);
    await this.submitButton.click();
  }

  async expectValidationError(message: string) {
    await expect(this.validationAlert).toHaveText(message);
  }

  async cancel() {
    await this.cancelButton.click();
  }
}
