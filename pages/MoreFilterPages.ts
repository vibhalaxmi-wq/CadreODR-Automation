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
    // STEP 1 - OPEN ALL CLAIMS
    // ==========================================================

    async openAllClaims(): Promise<void> {

        console.log('');
        console.log(
            'STEP 1 - NAVIGATE TO ALL CLAIMS',
        );

        const allClaims =
            this.locators.allClaimsButton;

        await expect(
            allClaims,
        ).toBeVisible({
            timeout: 15000,
        });

        await allClaims.click();

        await this.page.waitForTimeout(1000);

        console.log(
            'All Claims opened successfully.',
        );
    }

    // ==========================================================
    // STEP 2 - SWITCH TILE VIEW TO LIST VIEW
    // ==========================================================

    async switchToListView(): Promise<void> {

        console.log('');
        console.log(
            'STEP 2 - SWITCH FROM TILE VIEW TO LIST VIEW',
        );

        const listView =
            this.locators.listViewButton;

        await expect(
            listView,
        ).toBeVisible({
            timeout: 15000,
        });

        await listView.click();

        await this.page.waitForTimeout(1000);

        console.log(
            'List view selected successfully.',
        );
    }

    // ==========================================================
    // STEP 3 - OPEN MORE FILTERS
    // ==========================================================

    async openMoreFilters(): Promise<void> {

        console.log('');
        console.log(
            'STEP 3 - OPEN MORE FILTERS',
        );

        const moreFilters =
            this.locators.moreFiltersTab;

        await expect(
            moreFilters,
        ).toBeVisible({
            timeout: 15000,
        });

        await moreFilters.click();

        await this.page.waitForTimeout(1000);

        console.log(
            'More Filters opened successfully.',
        );
    }

    // ==========================================================
    // STEP 4 - OPEN FILTER DROPDOWN
    // ==========================================================

    async openOrganizationFilterDropdown(): Promise<void> {

        console.log('');
        console.log(
            'STEP 4 - OPEN FILTER DROPDOWN',
        );

        const filterDropdown =
            this.locators.organizationFilterDropdown;

        await expect(
            filterDropdown,
        ).toBeVisible({
            timeout: 15000,
        });

        await filterDropdown.click();

        await this.page.waitForTimeout(700);

        console.log(
            'Filter dropdown opened successfully.',
        );
    }

    // ==========================================================
    // STEP 5 - SELECT ORGANIZATION
    // ==========================================================

    async selectOrganizationFilter(): Promise<void> {

        console.log('');
        console.log(
            'STEP 5 - SELECT ORGANIZATION FILTER',
        );

        const organizationOption =
            this.locators.organizationFilterOption;

        await expect(
            organizationOption,
        ).toBeVisible({
            timeout: 15000,
        });

        await organizationOption.click();

        await this.page.waitForTimeout(700);

        console.log(
            'Organization filter selected successfully.',
        );
    }

    // ==========================================================
    // STEP 6 - OPEN ORGANIZATION VALUE CONTROL
    // ==========================================================

    async openOrganizationValueControl(): Promise<void> {

        console.log('');
        console.log(
            'STEP 6 - OPEN ORGANIZATION VALUE CONTROL',
        );

        const organizationValue =
            this.locators.organizationValueControl;

        await expect(
            organizationValue,
        ).toBeVisible({
            timeout: 15000,
        });

        await organizationValue.click();

        await this.page.waitForTimeout(700);

        console.log(
            'Organization value control opened successfully.',
        );
    }

    // ==========================================================
    // STEP 7 - APPLY FILTER
    // ==========================================================

    async applyFilter(): Promise<void> {

        console.log('');
        console.log(
            'STEP 7 - APPLY FILTER',
        );

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

        console.log(
            'Apply button is visible and enabled.',
        );

        await applyButton.click();

        console.log(
            'Apply button clicked successfully.',
        );

        await this.page.waitForTimeout(1500);
    }

    // ==========================================================
    // STEP 8 - VERIFY FILTER RESULT
    // ==========================================================

    async verifyOrganizationFilter(): Promise<void> {

        console.log('');
        console.log(
            'STEP 8 - VERIFY ORGANIZATION FILTER RESULT',
        );

        const result =
            this.locators.organizationFilterResult;

        await expect(
            result,
        ).toBeVisible({
            timeout: 15000,
        });

        console.log(
            'Organization filter applied successfully.',
        );

        console.log(
            'Verified filter result: 1 Orgs',
        );
    }
}