import {
    expect,
    Page,
} from '@playwright/test';

import {
    MoreFilterLocators,
} from '../locators/MoreFilterLocators';


export class MoreFilterPages {

    private readonly locators: MoreFilterLocators;

    constructor(
        private readonly page: Page,
    ) {
        this.locators = new MoreFilterLocators(page);
    }


    // ==========================================================
    // OPEN ALL CLAIMS
    // ==========================================================

    async openAllClaims(): Promise<void> {

        const allClaims = this.locators.allClaimsButton;

        await expect(allClaims).toBeVisible({
            timeout: 15000,
        });

        await allClaims.click();

        await this.page.waitForTimeout(1000);
    }


    // ==========================================================
    // SWITCH TO LIST VIEW
    // ==========================================================

    async switchToListView(): Promise<void> {

        const listView = this.locators.listViewButton;

        await expect(listView).toBeVisible({
            timeout: 15000,
        });

        await listView.click();

        await this.page.waitForTimeout(1000);
    }


    // ==========================================================
    // OPEN MORE FILTERS
    // ==========================================================

    async openMoreFilters(): Promise<void> {

        const moreFilters = this.locators.moreFiltersTab;

        await expect(moreFilters).toBeVisible({
            timeout: 15000,
        });

        await moreFilters.click();

        await this.page.waitForTimeout(1000);
    }


    // ==========================================================
    // OPEN ORGANIZATION FILTER DROPDOWN
    // ==========================================================

    async openOrganizationFilterDropdown(): Promise<void> {

        const filterDropdown =
            this.locators.organizationFilterDropdown;

        await expect(filterDropdown).toBeVisible({
            timeout: 15000,
        });

        await filterDropdown.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // SELECT ORGANIZATION FILTER
    // ==========================================================

    async selectOrganizationFilter(): Promise<void> {

        const organizationOption =
            this.locators.organizationFilterOption;

        await expect(organizationOption).toBeVisible({
            timeout: 15000,
        });

        await organizationOption.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // OPEN ORGANIZATION VALUE CONTROL
    // ==========================================================

    async openOrganizationValueControl(): Promise<void> {

        const organizationValue =
            this.locators.organizationValueControl;

        await expect(organizationValue).toBeVisible({
            timeout: 15000,
        });

        await organizationValue.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // APPLY ORGANIZATION FILTER
    // ==========================================================

    async applyFilter(): Promise<void> {

        const applyButton = this.locators.applyButton;

        await expect(applyButton).toBeVisible({
            timeout: 15000,
        });

        await expect(applyButton).toBeEnabled({
            timeout: 15000,
        });

        await applyButton.scrollIntoViewIfNeeded();

        await applyButton.click();

        await this.page.waitForTimeout(1500);
    }


    // ==========================================================
    // VERIFY ORGANIZATION FILTER
    // ==========================================================

    async verifyOrganizationFilter(): Promise<void> {

        const result = this.locators.organizationFilterResult;

        await expect(result).toBeVisible({
            timeout: 15000,
        });
    }


    // ==========================================================
    // REMOVE PREVIOUS FILTER
    // ==========================================================

    async removePreviousFilter(): Promise<void> {

        const removeFilter =
            this.locators.removePreviousFilterButton;

        await expect(removeFilter).toBeVisible({
            timeout: 15000,
        });

        await removeFilter.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // CONTRACT ID - OPEN MORE FILTERS
    // ==========================================================

    async openMoreFiltersForContractId(): Promise<void> {

        const moreFilters = this.locators.moreFiltersTab;

        await expect(moreFilters).toBeVisible({
            timeout: 15000,
        });

        await moreFilters.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // CONTRACT ID - ENTER VALUE
    // ==========================================================

    async enterContractId(
        contractId: string,
    ): Promise<void> {

        const contractIdTextbox =
            this.locators.contractIdTextbox;

        await expect(contractIdTextbox).toBeVisible({
            timeout: 15000,
        });

        await contractIdTextbox.click();

        await contractIdTextbox.fill(contractId);
    }


    // ==========================================================
    // CONTRACT ID - APPLY
    // ==========================================================

    async applyContractIdFilter(): Promise<void> {

        const applyButton = this.locators.applyButton;

        await expect(applyButton).toBeVisible({
            timeout: 15000,
        });

        await expect(applyButton).toBeEnabled({
            timeout: 15000,
        });

        await applyButton.scrollIntoViewIfNeeded();

        await applyButton.click();

        await this.page.waitForTimeout(1500);
    }


    // ==========================================================
    // CONTRACT ID - VERIFY
    // ==========================================================

    async verifyContractIdFilter(): Promise<void> {

        const result = this.locators.contractIdFilterResult;

        await expect(result).toBeVisible({
            timeout: 15000,
        });
    }


    // ==========================================================
    // STATUS - REMOVE PREVIOUS FILTER
    // ==========================================================

    async removePreviousFilterForStatus(): Promise<void> {

        const removeFilter =
            this.locators.removePreviousFilterButton;

        await expect(removeFilter).toBeVisible({
            timeout: 15000,
        });

        await removeFilter.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // STATUS - OPEN MORE FILTERS
    // ==========================================================

    async openMoreFiltersForStatus(): Promise<void> {

        const moreFilters = this.locators.moreFiltersTab;

        await expect(moreFilters).toBeVisible({
            timeout: 15000,
        });

        await moreFilters.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // STATUS - OPEN VALUE CONTROL
    // ==========================================================

    async openStatusValueControl(): Promise<void> {

        const statusValue = this.locators.statusValueControl;

        await expect(statusValue).toBeVisible({
            timeout: 15000,
        });

        await statusValue.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // STATUS - SEARCH
    // ==========================================================

    async searchStatus(
        status: string,
    ): Promise<void> {

        const searchOptions =
            this.locators.statusSearchOptions;

        await expect(searchOptions).toBeVisible({
            timeout: 15000,
        });

        await searchOptions.fill(status);
    }


    // ==========================================================
    // STATUS - SELECT
    // ==========================================================

    async selectStatus(): Promise<void> {

        const statusOption = this.locators.statusFilterOption;

        await expect(statusOption).toBeVisible({
            timeout: 15000,
        });

        await statusOption.click();
    }


    // ==========================================================
    // STATUS - CLOSE DROPDOWN
    // ==========================================================

    async closeStatusDropdown(): Promise<void> {

        await this.locators.statusSearchOptions.press(
            'Escape',
        );
    }


    // ==========================================================
    // STATUS - APPLY
    // ==========================================================

    async applyStatusFilter(): Promise<void> {

        const applyButton = this.locators.applyButton;

        await expect(applyButton).toBeVisible({
            timeout: 15000,
        });

        await expect(applyButton).toBeEnabled({
            timeout: 15000,
        });

        await applyButton.scrollIntoViewIfNeeded();

        await applyButton.click();

        await this.page.waitForTimeout(1500);
    }


    // ==========================================================
    // STATUS - VERIFY
    // ==========================================================

    async verifyStatusFilter(): Promise<void> {

        const result = this.locators.statusFilterResult;

        await expect(result).toBeVisible({
            timeout: 15000,
        });
    }


    // ==========================================================
    // CASE OFFICER - REMOVE PREVIOUS FILTER
    // ==========================================================

    async removePreviousFilterForCaseOfficer(): Promise<void> {

        const removeFilter =
            this.locators.removePreviousFilterButton;

        await expect(removeFilter).toBeVisible({
            timeout: 15000,
        });

        await removeFilter.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // CASE OFFICER - OPEN MORE FILTERS
    // ==========================================================

    async openMoreFiltersForCaseOfficer(): Promise<void> {

        const moreFilters = this.locators.moreFiltersTab;

        await expect(moreFilters).toBeVisible({
            timeout: 15000,
        });

        await moreFilters.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // CASE OFFICER - OPEN VALUE CONTROL
    // ==========================================================

    async openCaseOfficerValueControl(): Promise<void> {

        const caseOfficerValue =
            this.locators.caseOfficerValueControl;

        await expect(caseOfficerValue).toBeVisible({
            timeout: 15000,
        });

        await caseOfficerValue.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // CASE OFFICER - SEARCH
    // ==========================================================

    async searchCaseOfficer(
        caseOfficer: string,
    ): Promise<void> {

        const searchOptions =
            this.locators.caseOfficerSearchOptions;

        await expect(searchOptions).toBeVisible({
            timeout: 15000,
        });

        await searchOptions.fill(caseOfficer);
    }


    // ==========================================================
    // CASE OFFICER - SELECT
    // ==========================================================

    async selectCaseOfficer(): Promise<void> {

        const caseOfficerOption =
            this.locators.caseOfficerFilterOption;

        await expect(caseOfficerOption).toBeVisible({
            timeout: 15000,
        });

        await caseOfficerOption.click();
    }


    // ==========================================================
    // CASE OFFICER - CLOSE DROPDOWN
    // ==========================================================

    async closeCaseOfficerDropdown(): Promise<void> {

        await this.locators.caseOfficerSearchOptions.press(
            'Escape',
        );
    }


    // ==========================================================
    // CASE OFFICER - APPLY
    // ==========================================================

    async applyCaseOfficerFilter(): Promise<void> {

        const applyButton = this.locators.applyButton;

        await expect(applyButton).toBeVisible({
            timeout: 15000,
        });

        await expect(applyButton).toBeEnabled({
            timeout: 15000,
        });

        await applyButton.scrollIntoViewIfNeeded();

        await applyButton.click();

        await this.page.waitForTimeout(1500);
    }


    // ==========================================================
    // CASE OFFICER - VERIFY
    // ==========================================================

    async verifyCaseOfficerFilter(): Promise<void> {

        const result = this.locators.caseOfficerFilterResult;

        await expect(result).toBeVisible({
            timeout: 15000,
        });
    }


    // ==========================================================
    // ARBITRATOR - REMOVE PREVIOUS FILTER
    // ==========================================================

    async removePreviousFilterForArbitrator(): Promise<void> {

        const removeFilter =
            this.locators.removePreviousFilterButton;

        await expect(removeFilter).toBeVisible({
            timeout: 15000,
        });

        await removeFilter.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // ARBITRATOR - OPEN MORE FILTERS
    // ==========================================================

    async openMoreFiltersForArbitrator(): Promise<void> {

        const moreFilters = this.locators.moreFiltersTab;

        await expect(moreFilters).toBeVisible({
            timeout: 15000,
        });

        await moreFilters.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // ARBITRATOR - OPEN VALUE CONTROL
    // ==========================================================

    async openArbitratorValueControl(): Promise<void> {

        const arbitratorValue =
            this.locators.arbitratorValueControl;

        await expect(arbitratorValue).toBeVisible({
            timeout: 15000,
        });

        await arbitratorValue.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // ARBITRATOR - SEARCH
    // ==========================================================

    async searchArbitrator(
        arbitrator: string,
    ): Promise<void> {

        const searchOptions =
            this.locators.arbitratorSearchOptions;

        await expect(searchOptions).toBeVisible({
            timeout: 15000,
        });

        await searchOptions.fill(arbitrator);
    }


    // ==========================================================
    // ARBITRATOR - SELECT
    // ==========================================================

    async selectArbitrator(): Promise<void> {

        const arbitratorOption =
            this.locators.arbitratorFilterOption;

        await expect(arbitratorOption).toBeVisible({
            timeout: 15000,
        });

        await arbitratorOption.click();
    }


    // ==========================================================
    // ARBITRATOR - CLOSE DROPDOWN
    // ==========================================================

    async closeArbitratorDropdown(): Promise<void> {

        await this.locators.arbitratorSearchOptions.press(
            'Escape',
        );
    }


    // ==========================================================
    // ARBITRATOR - APPLY
    // ==========================================================

    async applyArbitratorFilter(): Promise<void> {

        const applyButton = this.locators.applyButton;

        await expect(applyButton).toBeVisible({
            timeout: 15000,
        });

        await expect(applyButton).toBeEnabled({
            timeout: 15000,
        });

        await applyButton.scrollIntoViewIfNeeded();

        await applyButton.click();

        await this.page.waitForTimeout(1500);
    }


    // ==========================================================
    // ARBITRATOR - VERIFY
    // ==========================================================

    async verifyArbitratorFilter(): Promise<void> {

        const result = this.locators.arbitratorFilterResult;

        await expect(result).toBeVisible({
            timeout: 15000,
        });
    }


    // ==========================================================
    // LOT ID - REMOVE PREVIOUS FILTER
    // ==========================================================

    async removePreviousFilterForLotId(): Promise<void> {

        const removeFilter =
            this.locators.removePreviousFilterButton;

        await expect(removeFilter).toBeVisible({
            timeout: 15000,
        });

        await removeFilter.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // LOT ID - OPEN MORE FILTERS
    // ==========================================================

    async openMoreFiltersForLotId(): Promise<void> {

        const moreFilters = this.locators.moreFiltersTab;

        await expect(moreFilters).toBeVisible({
            timeout: 15000,
        });

        await moreFilters.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // LOT ID - OPEN VALUE CONTROL
    // ==========================================================

    async openLotIdValueControl(): Promise<void> {

        const lotIdValue = this.locators.lotIdValueControl;

        await expect(lotIdValue).toBeVisible({
            timeout: 15000,
        });

        await lotIdValue.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // LOT ID - SEARCH
    // ==========================================================

    async searchLotId(
        lotId: string,
    ): Promise<void> {

        const searchOptions = this.locators.lotIdSearchOptions;

        await expect(searchOptions).toBeVisible({
            timeout: 15000,
        });

        await searchOptions.fill(lotId);
    }


    // ==========================================================
    // LOT ID - SELECT
    // ==========================================================

    async selectLotId(): Promise<void> {

        const lotIdOption = this.locators.lotIdFilterOption;

        await expect(lotIdOption).toBeVisible({
            timeout: 15000,
        });

        await lotIdOption.click();
    }


    // ==========================================================
    // LOT ID - CLOSE DROPDOWN
    // ==========================================================

    async closeLotIdDropdown(): Promise<void> {

        await this.locators.lotIdSearchOptions.press(
            'Escape',
        );
    }


    // ==========================================================
    // LOT ID - APPLY
    // ==========================================================

    async applyLotIdFilter(): Promise<void> {

        const applyButton = this.locators.applyButton;

        await expect(applyButton).toBeVisible({
            timeout: 15000,
        });

        await expect(applyButton).toBeEnabled({
            timeout: 15000,
        });

        await applyButton.scrollIntoViewIfNeeded();

        await applyButton.click();

        await this.page.waitForTimeout(1500);
    }


    // ==========================================================
    // LOT ID - VERIFY
    // ==========================================================

    async verifyLotIdFilter(): Promise<void> {

        const result = this.locators.lotIdFilterResult;

        await expect(result).toBeVisible({
            timeout: 15000,
        });
    }


    // ==========================================================
    // DISPUTE TYPE - REMOVE PREVIOUS FILTER
    // ==========================================================

    async removePreviousFilterForDisputeType(): Promise<void> {

        const removeFilter =
            this.locators.removePreviousFilterButton;

        await expect(removeFilter).toBeVisible({
            timeout: 15000,
        });

        await removeFilter.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // DISPUTE TYPE - OPEN MORE FILTERS
    // ==========================================================

    async openMoreFiltersForDisputeType(): Promise<void> {

        const moreFilters = this.locators.moreFiltersTab;

        await expect(moreFilters).toBeVisible({
            timeout: 15000,
        });

        await moreFilters.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // DISPUTE TYPE - OPEN VALUE CONTROL
    // ==========================================================

    async openDisputeTypeValueControl(): Promise<void> {

        const disputeTypeValue =
            this.locators.disputeTypeValueControl;

        await expect(disputeTypeValue).toBeVisible({
            timeout: 15000,
        });

        await disputeTypeValue.click();

        await this.page.waitForTimeout(700);
    }


    // ==========================================================
    // DISPUTE TYPE - SELECT
    // ==========================================================

    async selectDisputeType(
        disputeType: string,
    ): Promise<void> {

        const disputeTypeOption =
            this.page.getByText(disputeType, {
                exact: true,
            }).first();

        await expect(disputeTypeOption).toBeVisible({
            timeout: 15000,
        });

        await disputeTypeOption.click();
    }


    // ==========================================================
    // DISPUTE TYPE - APPLY
    // ==========================================================

    async applyDisputeTypeFilter(): Promise<void> {

        const applyButton = this.locators.applyButton;

        await expect(applyButton).toBeVisible({
            timeout: 15000,
        });

        await expect(applyButton).toBeEnabled({
            timeout: 15000,
        });

        await applyButton.scrollIntoViewIfNeeded();

        await applyButton.click();

        await this.page.waitForTimeout(1500);
    }


    // ==========================================================
    // DISPUTE TYPE - VERIFY
    // ==========================================================

    async verifyDisputeTypeFilter(): Promise<void> {

        const result =
            this.locators.disputeTypeFilterResult;

        await expect(result).toBeVisible({
            timeout: 15000,
        });
    }
}