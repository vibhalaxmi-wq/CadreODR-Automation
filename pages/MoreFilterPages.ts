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
        this.locators =
            new MoreFilterLocators(page);
    }

    // ==========================================================
    // OPEN ALL CLAIMS
    // ==========================================================

    async openAllClaims(): Promise<void> {

        const allClaims =
            this.locators.allClaimsButton;

        await expect(
            allClaims,
        ).toBeVisible({
            timeout: 15000,
        });

        await allClaims.click();

        await this.page.waitForTimeout(1000);
    }

    // ==========================================================
    // SWITCH TO LIST VIEW
    // ==========================================================

    async switchToListView(): Promise<void> {

        const listView =
            this.locators.listViewButton;

        await expect(
            listView,
        ).toBeVisible({
            timeout: 15000,
        });

        await listView.click();

        await this.page.waitForTimeout(1000);
    }

    // ==========================================================
    // OPEN MORE FILTERS
    // ==========================================================

    async openMoreFilters(): Promise<void> {

        const moreFilters =
            this.locators.moreFiltersTab;

        await expect(
            moreFilters,
        ).toBeVisible({
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

        await expect(
            filterDropdown,
        ).toBeVisible({
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

        await expect(
            organizationOption,
        ).toBeVisible({
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

        await expect(
            organizationValue,
        ).toBeVisible({
            timeout: 15000,
        });

        await organizationValue.click();

        await this.page.waitForTimeout(700);
    }

    // ==========================================================
    // APPLY FILTER
    // ==========================================================

    async applyFilter(): Promise<void> {

        const applyButton =
            this.locators.applyButton;

        await expect(
            applyButton,
        ).toBeVisible({
            timeout: 15000,
        });

        await expect(
            applyButton,
        ).toBeEnabled({
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

        const result =
            this.locators.organizationFilterResult;

        await expect(
            result,
        ).toBeVisible({
            timeout: 15000,
        });
    }

    // ==========================================================
    // REMOVE PREVIOUS FILTER
    // ==========================================================

    async removePreviousFilter(): Promise<void> {

        const removeFilter =
            this.locators.removePreviousFilterButton;

        await expect(
            removeFilter,
        ).toBeVisible({
            timeout: 15000,
        });

        await removeFilter.click();

        await this.page.waitForTimeout(700);
    }

    // ==========================================================
    // CONTRACT ID - OPEN MORE FILTERS
    // ==========================================================

    async openMoreFiltersForContractId(): Promise<void> {

        const moreFilters =
            this.locators.moreFiltersTab;

        await expect(
            moreFilters,
        ).toBeVisible({
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

        await expect(
            contractIdTextbox,
        ).toBeVisible({
            timeout: 15000,
        });

        await contractIdTextbox.click();

        await contractIdTextbox.fill(
            contractId,
        );
    }

    // ==========================================================
    // CONTRACT ID - APPLY
    // ==========================================================

    async applyContractIdFilter(): Promise<void> {

        const applyButton =
            this.locators.applyButton;

        await expect(
            applyButton,
        ).toBeVisible({
            timeout: 15000,
        });

        await expect(
            applyButton,
        ).toBeEnabled({
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

        const result =
            this.locators.contractIdFilterResult;

        await expect(
            result,
        ).toBeVisible({
            timeout: 15000,
        });
    }

    // ==========================================================
    // STATUS - REMOVE PREVIOUS FILTER
    // ==========================================================

    async removePreviousFilterForStatus(): Promise<void> {

        const removeFilter =
            this.locators.removePreviousFilterButton;

        await expect(
            removeFilter,
        ).toBeVisible({
            timeout: 15000,
        });

        await removeFilter.click();

        await this.page.waitForTimeout(700);
    }

    // ==========================================================
    // STATUS - OPEN MORE FILTERS
    // ==========================================================

    async openMoreFiltersForStatus(): Promise<void> {

        const moreFilters =
            this.locators.moreFiltersTab;

        await expect(
            moreFilters,
        ).toBeVisible({
            timeout: 15000,
        });

        await moreFilters.click();

        await this.page.waitForTimeout(700);
    }

    // ==========================================================
    // STATUS - OPEN VALUE CONTROL
    // ==========================================================

    async openStatusValueControl(): Promise<void> {

        const statusValue =
            this.locators.statusValueControl;

        await expect(
            statusValue,
        ).toBeVisible({
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

        await expect(
            searchOptions,
        ).toBeVisible({
            timeout: 15000,
        });

        await searchOptions.fill(
            status,
        );
    }

    // ==========================================================
    // STATUS - SELECT
    // ==========================================================

    async selectStatus(): Promise<void> {

        const statusOption =
            this.locators.statusFilterOption;

        await expect(
            statusOption,
        ).toBeVisible({
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

        const applyButton =
            this.locators.applyButton;

        await expect(
            applyButton,
        ).toBeVisible({
            timeout: 15000,
        });

        await expect(
            applyButton,
        ).toBeEnabled({
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

        const result =
            this.locators.statusFilterResult;

        await expect(
            result,
        ).toBeVisible({
            timeout: 15000,
        });
    }
}