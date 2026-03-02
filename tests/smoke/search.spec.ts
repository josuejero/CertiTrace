import { expect, test } from '@playwright/test';
import { RecordPage } from '../pages/RecordPage';
import { SearchPage } from '../pages/SearchPage';
import { VerificationPage } from '../pages/VerificationPage';
import { Records } from '../fixtures/records';

const summaryText = {
  single: '1 record found',
  none: '0 records found'
};

const maintenanceMessage = 'Automation maintenance banner';

test.describe('Smoke coverage', () => {
  test('search by ID returns the correct entry @smoke', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.searchById(Records.alex.id);
    await searchPage.expectRecordCount(1);
    await expect(searchPage.getResultCard(Records.alex.id)).toContainText(Records.alex.name);
    await searchPage.expectSummaryText(summaryText.single);
  });

  test('combined first/last/state filters surface a single record @smoke', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.searchByNameAndState('Maya', 'Patel', Records.maya.state);
    await searchPage.expectRecordCount(1);
    await expect(searchPage.getResultCard(Records.maya.id)).toContainText(Records.maya.name);
    await searchPage.expectSummaryText(summaryText.single);
  });

  test('invalid lookup surfaces the empty state @smoke', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.searchById('CT-9999');
    await searchPage.expectNoResults();
    await searchPage.expectSummaryText(summaryText.none);
  });

  test('verification modal enforces required fields @smoke', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    const record = new RecordPage(page, Records.alex.id);
    await record.requestVerification();

    const verificationPage = new VerificationPage(page);
    await verificationPage.submitForm('', '');
    await verificationPage.expectValidationError('Recipient name and email are required.');
  });

  test('disciplinary banners only show for flagged practitioners @smoke', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    const mayaCard = new RecordPage(page, Records.maya.id);
    await mayaCard.expectDisciplineBannerVisible();

    const alexCard = new RecordPage(page, Records.alex.id);
    await alexCard.expectDisciplineBannerHidden();
  });

  test('maintenance banner shows when the configuration overrides the UI @smoke', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const encodedMessage = encodeURIComponent(maintenanceMessage);
    await searchPage.goto(`/?maintenance=true&maintenanceMessage=${encodedMessage}`);

    const banner = page.locator('.maintenance-banner');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText(/Maintenance mode/i);
    await expect(banner).toContainText(maintenanceMessage);

    const record = new RecordPage(page, Records.alex.id);
    await record.expectRequestButtonDisabled();
    await record.expectMaintenanceHint(maintenanceMessage);
  });
});
