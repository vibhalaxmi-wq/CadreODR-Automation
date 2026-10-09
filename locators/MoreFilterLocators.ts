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
    // CONTRACT ID FILTER
    // ==========================================================

    get contractIdTextbox(): Locator {
        return this.page.getByRole(
            'textbox',
            {
                name: 'e.g., ID1,ID2 (Max 50)',
            },
        );
    }


    // ==========================================================
    // STATUS FILTER
    // ==========================================================

    get statusValueControl(): Locator {
        return this.page.locator(
            'div:nth-child(4) > ._filter-value-input_1fa0f_179 > ._full-width-wrapper_1fa0f_208 > ._outer-container_uvsvt_1 > ._container_uvsvt_10 > ._value_uvsvt_51',
        );
    }

    get statusSearchOptions(): Locator {
        return this.page.getByRole(
            'combobox',
            {
                name: 'Search options',
            },
        );
    }

    get statusFilterOption(): Locator {
        return this.page.locator(
            '[id$="-option-0"] > div > img',
        );
    }


    // ==========================================================
    // CASE OFFICER FILTER
    // ==========================================================

    get caseOfficerValueControl(): Locator {
        return this.page.locator(
            'div:nth-child(5) > ._filter-value-input_1fa0f_179 > ._full-width-wrapper_1fa0f_208 > ._outer-container_uvsvt_1 > ._container_uvsvt_10 > ._value_uvsvt_51',
        );
    }

    get caseOfficerSearchOptions(): Locator {
        return this.page.getByRole(
            'combobox',
            {
                name: 'Search options',
            },
        );
    }

    get caseOfficerFilterOption(): Locator {
        return this.page.locator(
            '[id$="-option-0"] > div > img',
        );
    }

    get caseOfficerFilterResult(): Locator {
        return this.page.getByText(
            'Vibha Laxmi',
        ).nth(1);
    }


    // ==========================================================
    // ARBITRATOR FILTER
    // ==========================================================

    get arbitratorValueControl(): Locator {
        return this.page.locator(
            'div:nth-child(6) > ._filter-value-input_1fa0f_179 > ._full-width-wrapper_1fa0f_208 > ._outer-container_uvsvt_1 > ._container_uvsvt_10 > ._value_uvsvt_51',
        );
    }

    get arbitratorSearchOptions(): Locator {
        return this.page.getByRole(
            'combobox',
            {
                name: 'Search options',
            },
        );
    }

    get arbitratorFilterOption(): Locator {
        return this.page.locator(
            '[id$="-option-0"] > div > img',
        );
    }

    get arbitratorFilterResult(): Locator {
        return this.page.getByText(
            'Vibha Arbitrator',
        ).first();
    }


    // ==========================================================
    // LOT ID FILTER
    // ==========================================================

    get lotIdValueControl(): Locator {
        return this.page.locator(
            'div:nth-child(7) > ._filter-value-input_1fa0f_179 > ._full-width-wrapper_1fa0f_208 > ._outer-container_uvsvt_1 > ._container_uvsvt_10 > ._value_uvsvt_51',
        );
    }

    get lotIdSearchOptions(): Locator {
        return this.page.getByRole(
            'combobox',
            {
                name: 'Search options',
            },
        );
    }

    get lotIdFilterOption(): Locator {
        return this.page.locator(
            '[id$="-option-0"] > div > img',
        );
    }


    // ==========================================================
    // DISPUTE TYPE FILTER
    // ==========================================================

    get disputeTypeValueControl(): Locator {
        return this.page.locator(
            '._full-width-wrapper_1fa0f_208 > ._outer-container_vjdct_1 > ._container_vjdct_10',
        );
    }

    get disputeTypeOption(): Locator {
        return this.page.getByText(
            'Conciliation',
            {
                exact: true,
            },
        ).first();
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


    // ==========================================================
    // CONTRACT ID FILTER VERIFICATION
    // ==========================================================

    get contractIdFilterResult(): Locator {
        return this.page.getByText(
            'Loan',
        ).nth(1);
    }


    // ==========================================================
    // STATUS FILTER VERIFICATION
    // ==========================================================

    get statusFilterResult(): Locator {
        return this.page.getByText(
            'On Hold',
        ).first();
    }


    // ==========================================================
    // LOT ID FILTER VERIFICATION
    // ==========================================================

    get lotIdFilterResult(): Locator {
        return this.page.getByText(
            'Claim #AUTO0012',
            {
                exact: true,
            },
        );
    }


    // ==========================================================
    // DISPUTE TYPE FILTER VERIFICATION
    // ==========================================================

    get disputeTypeFilterResult(): Locator {
        return this.page.getByText(
            'Conciliation',
        ).nth(1);
    }
}