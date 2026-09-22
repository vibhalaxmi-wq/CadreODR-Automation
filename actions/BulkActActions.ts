import { Page } from '@playwright/test';
import { BulkActPages } from '../pages/BulkActPages';

export class BulkActActions {
  private pages: BulkActPages;

  constructor(private page: Page) {
    this.pages = new BulkActPages(page);
  }

  // ==========================================================
  // FILTER ORGANIZATION
  // ==========================================================

  async filterByOrganization(): Promise<void> {
    console.log('');
    console.log('======================================================');
    console.log('FILTERING CLAIMS BY ORGANIZATION');
    console.log('======================================================');

    await this.pages.openFilters();
    await this.pages.openMoreFilters();
    await this.pages.selectOrganization();
    await this.pages.applyFilter();

    console.log('');
    console.log(
      'Organization filter completed successfully'
    );
  }

  // ==========================================================
  // SELECT CLAIM
  // ==========================================================

  async selectClaim(): Promise<void> {
    console.log('');
    console.log('======================================================');
    console.log('SELECTING CLAIM');
    console.log('======================================================');

    await this.pages.selectFirstClaim();

    console.log('');
    console.log('Claim selected successfully');
  }

  // ==========================================================
  // VERIFY ACTIONS
  // ==========================================================

  async verifyActionsButtonVisible(): Promise<void> {
    console.log('');
    console.log('======================================================');
    console.log('VERIFYING ACTIONS BUTTON');
    console.log('======================================================');

    await this.pages.verifyActionsButton();

    console.log('');
    console.log(
      'Actions button is visible and enabled'
    );
  }

  // ==========================================================
  // ASSIGN CASE OFFICER
  // ==========================================================

  async assignCaseOfficer(): Promise<void> {
    console.log('');
    console.log('======================================================');
    console.log(
      'ASSIGNING CASE OFFICER THROUGH BULK ACTIONS'
    );
    console.log('======================================================');

    await this.pages.openActions();

    await this.pages.selectAssignCaseOfficer();

    await this.pages.openCaseOfficerDropdown();

    await this.pages.searchCaseOfficer();

    await this.pages.selectBasanagouda();

    await this.pages.updateAssignment();

    await this.pages.confirmUpdate();

    console.log('');
    console.log(
      'Case Officer assigned successfully'
    );
  }

  // ==========================================================
  // OPEN ASSIGNED CLAIM
  // ==========================================================

  async openAssignedClaim(): Promise<Page> {
    console.log('');
    console.log('======================================================');
    console.log('OPENING ASSIGNED CLAIM');
    console.log('======================================================');

    const claimPage =
      await this.pages.openAuto007Claim();

    console.log('');
    console.log(
      'Assigned claim opened successfully'
    );

    return claimPage;
  }

  // ==========================================================
  // VERIFY CASE OFFICER
  // ==========================================================

  async verifyAssignedCaseOfficer(
    claimPage: Page,
    expectedCaseOfficer: string
  ): Promise<void> {
    console.log('');
    console.log('======================================================');
    console.log(
      'VERIFYING ASSIGNED CASE OFFICER'
    );
    console.log('======================================================');

    await this.pages.verifyCaseOfficerInsideClaim(
      claimPage,
      expectedCaseOfficer
    );

    console.log('');
    console.log(
      `Case Officer "${expectedCaseOfficer}" verified successfully`
    );
  }

  // ==========================================================
  // ASSIGN ARBITRATOR
  // ==========================================================

  async assignArbitrator(): Promise<void> {
    console.log('');
    console.log('======================================================');
    console.log(
      'ASSIGNING ARBITRATOR THROUGH BULK ACTIONS'
    );
    console.log('======================================================');

    await this.pages.openActions();

    await this.pages.selectAssignArbitrator();

    await this.pages.openArbitratorDropdown();

    await this.pages.searchArbitrator();

    await this.pages.selectVibhaArbitrator();

    await this.pages.updateAssignment();

    await this.pages.confirmUpdate();

    console.log('');
    console.log(
      'Arbitrator assigned successfully'
    );
  }

  // ==========================================================
  // VERIFY ARBITRATOR
  // ==========================================================

  async verifyAssignedArbitrator(
    claimPage: Page,
    expectedArbitrator: string
  ): Promise<void> {
    console.log('');
    console.log('======================================================');
    console.log(
      'VERIFYING ASSIGNED ARBITRATOR'
    );
    console.log('======================================================');

    await this.pages.verifyArbitratorInsideClaim(
      claimPage,
      expectedArbitrator
    );

    console.log('');
    console.log(
      `Arbitrator "${expectedArbitrator}" verified successfully`
    );
  }
}