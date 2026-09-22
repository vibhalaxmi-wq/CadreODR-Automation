import { Page } from '@playwright/test';

import { BulkActActions } from '../../actions/BulkActActions';

// ==========================================================
// ASSIGN CASE OFFICER SCENARIO
// ==========================================================

export async function assignCaseOfficerScenario(
  page: Page
): Promise<void> {

  console.log('');
  console.log('======================================================');
  console.log(
    'STARTING ASSIGN CASE OFFICER SCENARIO'
  );
  console.log('======================================================');

  const actions =
    new BulkActActions(page);

  // ========================================================
  // EXPECTED CASE OFFICER
  // ========================================================

  const expectedCaseOfficer =
    'Basanagouda';

  // ========================================================
  // ASSIGN CASE OFFICER
  // ========================================================

  await actions.assignCaseOfficer();

  // ========================================================
  // OPEN CLAIM
  // ========================================================

  const claimPage =
    await actions.openAssignedClaim();

  // ========================================================
  // VERIFY CASE OFFICER INSIDE CLAIM
  // ========================================================

  await actions.verifyAssignedCaseOfficer(
    claimPage,
    expectedCaseOfficer
  );

  console.log('');
  console.log('======================================================');
  console.log(
    'ASSIGN CASE OFFICER SCENARIO COMPLETED'
  );
  console.log('======================================================');
}