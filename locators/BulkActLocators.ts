import { Page } from '@playwright/test';

export class BulkActLocators {
  constructor(private page: Page) {}

  // ==========================================================
  // CLAIMS PAGE / FILTERS
  // ==========================================================

  filterIcon() {
    return this.page.getByRole('img').nth(4);
  }

  moreFiltersTab() {
    return this.page.getByRole('tab', {
      name: 'MORE FILTERS',
    });
  }

  organizationDropdown() {
    return this.page
      .getByRole('combobox', {
        name: 'Select items',
      })
      .nth(4);
  }

  searchOptions() {
    return this.page.getByRole('combobox', {
      name: 'Search options',
    });
  }

  auto001Option() {
    return this.page.getByRole('option', {
      name: 'AUTO001',
    });
  }

  applyButton() {
    return this.page.getByRole('button', {
      name: 'Apply',
      exact: true,
    });
  }

  firstClaimCheckbox() {
    return this.page.getByRole('checkbox').first();
  }

  // ==========================================================
  // ACTIONS
  // ==========================================================

  actionsButton() {
    return this.page.getByRole('button', {
      name: 'Actions',
      exact: true,
    });
  }

  assignCaseOfficerButton() {
    return this.page
      .locator('div')
      .filter({
        hasText: /^Assign Case Officer$/,
      });
  }

  assignArbitratorButton() {
    return this.page
      .locator('div')
      .filter({
        hasText: /^Assign Arbitrator$/,
      });
  }

  // ==========================================================
  // CASE OFFICER
  // ==========================================================

  caseOfficerDropdown() {
    return this.page.getByRole('combobox', {
      name: 'Select Case Officer',
    });
  }

  caseOfficerSearch() {
    return this.page.getByRole('textbox', {
      name: 'Search',
    });
  }

  basanagoudaCaseOfficer() {
    return this.page.getByText(
      'Basanagouda Case officer (',
      {
        exact: false,
      }
    );
  }

  // ==========================================================
  // ARBITRATOR
  // ==========================================================

  arbitratorDropdown() {
    return this.page.getByText(
      '--Select--Select Arbitrator',
      {
        exact: true,
      }
    );
  }

  arbitratorSearch() {
    return this.page.getByRole('textbox', {
      name: 'Search',
    });
  }

  vibhaArbitrator() {
    return this.page.getByText(
      'Vibha Arbitrator (45644)',
      {
        exact: true,
      }
    );
  }

  // ==========================================================
  // COMMON UPDATE
  // ==========================================================

  updateButton() {
    return this.page.getByRole('button', {
      name: 'Update',
      exact: true,
    });
  }

  okButton() {
    return this.page.getByRole('button', {
      name: 'OK',
      exact: true,
    });
  }

  // ==========================================================
  // CLAIMS
  // ==========================================================

  auto007Claim() {
    return this.page.getByText(
      'Claim #AUTO007',
      {
        exact: true,
      }
    );
  }

  // ==========================================================
  // CASE OFFICER VERIFICATION
  // ==========================================================

  caseOfficerInsideClaim(expectedCaseOfficer: string) {
    return this.page.getByText(
      expectedCaseOfficer,
      {
        exact: false,
      }
    );
  }

  // ==========================================================
  // ARBITRATOR VERIFICATION
  // ==========================================================

  arbitratorInsideClaim(expectedArbitrator: string) {
    return this.page.getByText(
      expectedArbitrator,
      {
        exact: false,
      }
    );
  }
}