import { test } from '@playwright/test';
import { AuditLogPage } from '../pages/AuditLogPage';
import { RecordPage } from '../pages/RecordPage';
import { SearchPage } from '../pages/SearchPage';
import { VerificationPage } from '../pages/VerificationPage';
import { Records } from '../fixtures/records';

const emailErrorMessage = 'Enter a valid email address.';

test.describe('Regression guardrails', () => {
  test('disciplinary banner logic stays scoped to flagged records @regression', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.searchById(Records.alex.id);
    const alexCard = new RecordPage(page, Records.alex.id);
    await alexCard.expectDisciplineBannerHidden();

    await searchPage.searchById(Records.maya.id);
    const mayaCard = new RecordPage(page, Records.maya.id);
    await mayaCard.expectDisciplineBannerVisible();
  });

  test('verification modal validation gap closes malformed submissions @regression', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    const record = new RecordPage(page, Records.maya.id);
    await record.requestVerification();

    const verificationPage = new VerificationPage(page);
    await verificationPage.submitForm('QA Team', 'qa-team', Records.maya.state);
    await verificationPage.expectValidationError(emailErrorMessage);

    await verificationPage.recipientEmailInput.fill('qa-team@example.com');
    await verificationPage.destinationStateSelect.selectOption('');
    await verificationPage.submitForm('QA Team', 'qa-team@example.com');
    await verificationPage.expectValidationError('Select a destination state.');

    await verificationPage.cancel();
  });

  test('audit log avoids duplicate verification entries @regression', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    const card = new RecordPage(page, Records.alex.id);
    await card.requestVerification();

    const verificationPage = new VerificationPage(page);
    await verificationPage.submitForm('QA Team', 'qa-team@example.com', Records.alex.state);

    const auditLogPage = new AuditLogPage(page);
    await auditLogPage.goto();

    await auditLogPage.expectEventCount('verification request submitted', Records.alex.id, 1);
  });
});
