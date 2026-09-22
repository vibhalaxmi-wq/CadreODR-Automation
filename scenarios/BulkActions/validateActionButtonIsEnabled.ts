import { Page } from '@playwright/test';

import { BulkActPages } from '../../pages/BulkActPages';

import { BulkActActions } from '../../actions/BulkActActions';

// ==========================================================
// VERIFY ACTIONS BUTTON SCENARIO
// ==========================================================

export async function bulkActionsScenario(
  page: Page
): Promise<void> {

  console.log('');
  console.log('======================================================');
  console.log(
    'STARTING VERIFY ACTIONS BUTTON SCENARIO'
  );
  console.log('======================================================');

  const pages =
    new BulkActPages(page);

  const actions =
    new BulkActActions(page);

  // ========================================================
  // OPEN CLAIMS PAGE
  // ========================================================

  await pages.openClaimsPage();

  // ========================================================
  // FILTER BY ORGANIZATION
  // ========================================================

  await actions.filterByOrganization();

  // ========================================================
  // SELECT CLAIM
  // ========================================================

  await actions.selectClaim();

  // ========================================================
  // VERIFY ACTIONS BUTTON
  // ========================================================

  await actions.verifyActionsButtonVisible();

  console.log('');
  console.log('======================================================');
  console.log(
    'VERIFY ACTIONS BUTTON SCENARIO COMPLETED'
  );
  console.log('======================================================');
}