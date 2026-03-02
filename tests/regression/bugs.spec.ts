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

  test('verification modal continues to validate email addresses @regression', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    const record = new RecordPage(page, Records.maya.id);
    await record.requestVerification();

    const verificationPage = new VerificationPage(page);
    await verificationPage.submitForm('QA Team', 'qa-team');
    await verificationPage.expectValidationError(emailErrorMessage);
  });

  test('audit log avoids duplicate returned-record entries @regression', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.searchById(Records.maya.id);

    const auditLogPage = new AuditLogPage(page);
    await auditLogPage.goto();

    await auditLogPage.expectEventCount('search submitted', Records.maya.id, 1);
    await auditLogPage.expectEventCount('search returned record', Records.maya.id, 1);
  });
});
