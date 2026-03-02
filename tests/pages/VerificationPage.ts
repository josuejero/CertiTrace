import { expect, Page } from '@playwright/test';

export class VerificationPage {
  readonly dialog = this.page.getByRole('dialog', { name: 'Request verification letter' });
  readonly recipientNameInput = this.dialog.getByLabel('Recipient name');
  readonly recipientEmailInput = this.dialog.getByLabel('Recipient email');
  readonly submitButton = this.dialog.getByRole('button', { name: 'Submit request' });
  readonly cancelButton = this.dialog.getByRole('button', { name: 'Cancel' });
  readonly validationAlert = this.dialog.getByRole('alert');
  readonly destinationStateSelect = this.dialog.getByLabel('Destination state');

  constructor(private page: Page) {}

  async submitForm(recipientName: string, recipientEmail: string, destinationState?: string) {
    await this.recipientNameInput.fill(recipientName);
    await this.recipientEmailInput.fill(recipientEmail);
    if (destinationState !== undefined) {
      await this.destinationStateSelect.selectOption(destinationState);
    }
    await this.submitButton.click();
  }

  async expectValidationError(message: string) {
    await expect(this.validationAlert).toHaveText(message);
  }

  async cancel() {
    await this.cancelButton.click();
  }
}
