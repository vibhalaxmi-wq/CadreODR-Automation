import { Page, expect } from '@playwright/test';
import { BulkActLocators } from '../locators/BulkActLocators';

export class BulkActPages {
  private locators: BulkActLocators;

  constructor(private page: Page) {
    this.locators = new BulkActLocators(page);
  }

  // ==========================================================
  // OPEN CLAIMS PAGE
  // ==========================================================

  async openClaimsPage(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Opening Claims page');
    console.log('------------------------------------------------------');

    await this.page.goto(
      'https://cadreodr.com/u/claims?showTestClaims=true',
      {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      }
    );

    await this.page.waitForLoadState('domcontentloaded');

    console.log('Claims page opened successfully');
  }

  // ==========================================================
  // FILTER
  // ==========================================================

  async openFilters(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Opening Filters');
    console.log('------------------------------------------------------');

    const filterIcon = this.locators.filterIcon();

    await filterIcon.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await filterIcon.click();

    console.log('Filters opened successfully');
  }

  async openMoreFilters(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Opening MORE FILTERS');
    console.log('------------------------------------------------------');

    const moreFilters = this.locators.moreFiltersTab();

    await moreFilters.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await moreFilters.click();

    console.log('MORE FILTERS opened successfully');
  }

  // ==========================================================
  // ORGANIZATION FILTER
  // ==========================================================

  async selectOrganization(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Selecting Organization');
    console.log('------------------------------------------------------');

    // --------------------------------------------------------
    // OPEN ORGANIZATION DROPDOWN
    // --------------------------------------------------------

    const dropdown = this.locators.organizationDropdown();

    await dropdown.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await dropdown.click();

    console.log('Organization dropdown opened');

    // --------------------------------------------------------
    // SELECT E2E01
    // --------------------------------------------------------

    const e2e01 = this.locators.e2eOption();

    await e2e01.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await e2e01.click();

    console.log('E2E01 selected');

    // --------------------------------------------------------
    // OPEN ORGANIZATION DROPDOWN AGAIN
    // --------------------------------------------------------

    console.log(
      'Clicking Organization dropdown again...'
    );

    await dropdown.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await dropdown.click();

    console.log(
      'Organization dropdown opened again'
    );
    await this.page.waitForTimeout(1000);

    // --------------------------------------------------------
    // CLICK APPLY
    // --------------------------------------------------------

    console.log(
      'Waiting for Apply button...'
    );

    const applyButton = this.locators.applyButton();

    await expect(applyButton).toBeVisible({
      timeout: 10000,
    });
    await expect(applyButton).toBeEnabled({timeout: 10000,});
    await applyButton.click();
    console.log('Apply button clicked');
    // --------------------------------------------------------
    // WAIT FOR FILTER RESULT
    // --------------------------------------------------------
    await this.page.waitForTimeout(1500);
    console.log('Organization filter result loaded');
  }
  // ==========================================================
  // APPLY FILTER
  // ==========================================================

  /*
   * Kept for other scenarios that may need it.
   *
   * DO NOT call this immediately after selectOrganization()
   * because selectOrganization() already clicks Apply.
   */

  async applyFilter(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Applying Filter');
    console.log('------------------------------------------------------');

    const applyButton = this.locators.applyButton();

    await expect(applyButton).toBeVisible({
      timeout: 10000,
    });

    await expect(applyButton).toBeEnabled({
      timeout: 10000,
    });

    await applyButton.click();

    console.log(
      'Apply button clicked'
    );

    await this.page.waitForTimeout(1500);

    console.log(
      'Filter result loaded'
    );
  }

  // ==========================================================
  // SELECT FIRST CLAIM
  // ==========================================================

  async selectFirstClaim(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Selecting First Claim');
    console.log('------------------------------------------------------');

    const checkbox =
      this.locators.firstClaimCheckbox();

    await checkbox.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await checkbox.check();

    console.log(
      'First claim selected'
    );
  }

  // ==========================================================
  // ACTIONS BUTTON
  // ==========================================================

  async verifyActionsButton(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Verifying Actions Button');
    console.log('------------------------------------------------------');

    const actions =
      this.locators.actionsButton();

    await expect(actions).toBeVisible({
      timeout: 10000,
    });

    await expect(actions).toBeEnabled({
      timeout: 10000,
    });

    console.log(
      'Actions button is visible and enabled'
    );
  }

  async openActions(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Opening Actions');
    console.log('------------------------------------------------------');

    const actions =
      this.locators.actionsButton();

    await actions.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await actions.click();

    console.log(
      'Actions menu opened'
    );

    await this.page.waitForTimeout(500);
  }

  // ==========================================================
  // ASSIGN CASE OFFICER
  // ==========================================================

  async selectAssignCaseOfficer(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Selecting Assign Case Officer');
    console.log('------------------------------------------------------');

    const assignCaseOfficer =
      this.locators.assignCaseOfficerButton();

    await assignCaseOfficer.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await assignCaseOfficer.click();

    console.log(
      'Assign Case Officer selected'
    );
  }

  async openCaseOfficerDropdown(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Opening Case Officer Dropdown');
    console.log('------------------------------------------------------');

    const dropdown =
      this.locators.caseOfficerDropdown();

    await dropdown.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await dropdown.click();

    console.log(
      'Case Officer dropdown opened'
    );
  }

  async searchCaseOfficer(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Searching Case Officer');
    console.log('------------------------------------------------------');

    const search =
      this.locators.caseOfficerSearch();

    await search.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await search.fill('bas');

    console.log(
      'Searching Case Officer: bas'
    );
  }

  async selectBasanagouda(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Selecting Basanagouda');
    console.log('------------------------------------------------------');

    const officer =
      this.locators.basanagoudaCaseOfficer();

    await officer.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await officer.click();

    console.log(
      'Basanagouda selected'
    );
  }

  // ==========================================================
  // ASSIGN ARBITRATOR
  // ==========================================================

  async selectAssignArbitrator(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Selecting Assign Arbitrator');
    console.log('------------------------------------------------------');

    const assignArbitrator =
      this.locators.assignArbitratorButton();

    await assignArbitrator.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await assignArbitrator.click();

    console.log(
      'Assign Arbitrator selected'
    );
  }

  async openArbitratorDropdown(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Opening Arbitrator Dropdown');
    console.log('------------------------------------------------------');

    const dropdown =
      this.locators.arbitratorDropdown();

    await dropdown.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await dropdown.click();

    console.log(
      'Arbitrator dropdown opened'
    );
  }

  async searchArbitrator(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Searching Arbitrator');
    console.log('------------------------------------------------------');

    const search =
      this.locators.arbitratorSearch();

    await search.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await search.fill('vibh');

    console.log(
      'Searching Arbitrator: vibh'
    );
  }

  async selectVibhaArbitrator(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Selecting Vibha Arbitrator');
    console.log('------------------------------------------------------');

    const arbitrator =
      this.locators.vibhaArbitrator();

    await arbitrator.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await arbitrator.click();

    console.log(
      'Vibha Arbitrator selected'
    );
  }

  // ==========================================================
  // UPDATE
  // ==========================================================

  async updateAssignment(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Updating Assignment');
    console.log('------------------------------------------------------');

    const update =
      this.locators.updateButton();

    await update.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await expect(update).toBeEnabled({
      timeout: 10000,
    });

    await update.click();

    console.log(
      'Update button clicked'
    );
  }

  async confirmUpdate(): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Confirming Update');
    console.log('------------------------------------------------------');

    const ok =
      this.locators.okButton();

    await ok.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await ok.click();

    console.log(
      'Update confirmed'
    );

    await this.page.waitForTimeout(1000);
  }

  // ==========================================================
  // OPEN E2E01 CLAIM
  // ==========================================================

  async openAuto007Claim(): Promise<Page> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Opening Claim #E2E01');
    console.log('------------------------------------------------------');

    const claim =
      this.locators.e2e01Claim();

    await claim.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    console.log(
      'Claim #E2E01 is visible'
    );

    const popupPromise =
      this.page.waitForEvent('popup', {
        timeout: 10000,
      });

    await claim.click();

    console.log(
      'Claim #E2E01 clicked'
    );

    const popup =
      await popupPromise;

    console.log(
      'Claim opened in popup'
    );

    await popup.waitForLoadState(
      'domcontentloaded'
    );

    console.log(
      'Claim popup loaded'
    );

    await popup.waitForLoadState(
      'networkidle',
      {
        timeout: 15000,
      }
    ).catch(() => {
      console.log(
        'Network did not become completely idle. Continuing...'
      );
    });

    await popup.waitForTimeout(1500);

    console.log(
      'Claim #E2E01 opened successfully'
    );

    return popup;
  }

  // ==========================================================
  // VERIFY CASE OFFICER
  // ==========================================================

  async verifyCaseOfficerInsideClaim(
    claimPage: Page,
    expectedCaseOfficer: string
  ): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Verifying Case Officer inside Claim');
    console.log('------------------------------------------------------');

    console.log(
      `Expected Case Officer: ${expectedCaseOfficer}`
    );

    const caseOfficer =
      claimPage.getByText(
        expectedCaseOfficer,
        {
          exact: false,
        }
      );

    await expect(
      caseOfficer.first()
    ).toBeVisible({
      timeout: 15000,
    });

    const actualCaseOfficer =
      (
        await caseOfficer
          .first()
          .textContent()
      )?.trim() || '';

    console.log(
      `Actual Case Officer: ${actualCaseOfficer}`
    );

    expect(
      actualCaseOfficer
    ).toContain(
      expectedCaseOfficer
    );

    console.log(
      'Case Officer verification PASSED'
    );
  }

  // ==========================================================
  // VERIFY ARBITRATOR
  // ==========================================================

  async verifyArbitratorInsideClaim(
    claimPage: Page,
    expectedArbitrator: string
  ): Promise<void> {
    console.log('');
    console.log('------------------------------------------------------');
    console.log('STEP: Verifying Arbitrator inside Claim');
    console.log('------------------------------------------------------');

    console.log(
      `Expected Arbitrator: ${expectedArbitrator}`
    );

    const arbitrator =
      claimPage.getByText(
        expectedArbitrator,
        {
          exact: false,
        }
      );

    await expect(
      arbitrator.first()
    ).toBeVisible({
      timeout: 15000,
    });

    const actualArbitrator =
      (
        await arbitrator
          .first()
          .textContent()
      )?.trim() || '';

    console.log(
      `Actual Arbitrator: ${actualArbitrator}`
    );

    expect(
      actualArbitrator
    ).toContain(
      expectedArbitrator
    );

    console.log(
      'Arbitrator verification PASSED'
    );
  }
}