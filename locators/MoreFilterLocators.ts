import {
    Page,
    Locator,
} from '@playwright/test';

export class MoreFilterLocators {

    constructor(
        private readonly page: Page,
    ) {}

    // ==========================================================
    // ALL CLAIMS
    // ==========================================================

    get allClaimsButton(): Locator {
        return this.page.getByText(
            'All Claims',
            {
                exact: true,
            },
        ).nth(1);
    }

    // ==========================================================
    // LIST VIEW
    // ==========================================================

    get listViewButton(): Locator {
        return this.page.getByRole('img').nth(4);
    }

    // ==========================================================
    // MORE FILTERS TAB
    // ==========================================================

    get moreFiltersTab(): Locator {
        return this.page.getByRole(
            'tab',
            {
                name: 'MORE FILTERS',
                exact: true,
            },
        );
    }

    // ==========================================================
    // CLOSE / REMOVE PREVIOUS FILTER
    // ==========================================================

    get removePreviousFilterButton(): Locator {
        return this.page.getByRole('img').nth(2);
    }

    // ==========================================================
    // ORGANIZATION FILTER
    // ==========================================================

    get organizationFilterDropdown(): Locator {
        return this.page.getByRole(
            'combobox',
            {
                name: 'Select items',
            },
        ).first();
    }

    get organizationFilterOption(): Locator {
        return this.page
            .locator(
                '[id$="-option-0"] > div > img',
            )
            .first();
    }

    get organizationValueControl(): Locator {
        return this.page
            .locator(
                '._filter-row_1fa0f_107 > div:nth-child(5)',
            )
            .first();
    }

    // ==========================================================
    // DISPLAY NAME FILTER
    // ==========================================================

    get displayNameTextbox(): Locator {
        return this.page.getByRole(
            'textbox',
            {
                name: 'e.g., ABC,DEF (Max 50)',
            },
        );
    }

    // ==========================================================
    // APPLY BUTTON
    // ==========================================================

    get applyButton(): Locator {
        return this.page.getByRole(
            'button',
            {
                name: 'Apply',
                exact: true,
            },
        );
    }

    // ==========================================================
    // ORGANIZATION FILTER VERIFICATION
    // ==========================================================

    get organizationFilterResult(): Locator {
        return this.page
            .locator('div')
            .filter({
                hasText: /^1 Orgs$/,
            })
            .nth(3);
    }

    // ==========================================================
    // DISPLAY NAME CLAIM VERIFICATION
    // ==========================================================

    getClaimByDisplayName(
        displayName: string,
    ): Locator {
        return this.page.getByText(
            `Claim #${displayName}`,
            {
                exact: false,
            },
        );
    }
}