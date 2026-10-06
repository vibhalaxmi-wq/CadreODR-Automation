import {
    Page,
} from '@playwright/test';

import {
    MoreFilterPages,
} from '../pages/MoreFilterPages';

export async function applyMoreFilter(
    page: Page,
): Promise<void> {

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'APPLY MORE FILTER ACTION',
    );
    console.log(
        '======================================================',
    );

    const moreFilterPage =
        new MoreFilterPages(page);

    // ==========================================================
    // STEP 1 - ALL CLAIMS
    // ==========================================================

    await moreFilterPage.openAllClaims();

    // ==========================================================
    // STEP 2 - LIST VIEW
    // ==========================================================

    await moreFilterPage.switchToListView();

    // ==========================================================
    // STEP 3 - MORE FILTERS
    // ==========================================================

    await moreFilterPage.openMoreFilters();

    // ==========================================================
    // STEP 4 - OPEN FILTER DROPDOWN
    // ==========================================================

    await moreFilterPage.openOrganizationFilterDropdown();

    // ==========================================================
    // STEP 5 - SELECT ORGANIZATION FILTER
    // ==========================================================

    await moreFilterPage.selectOrganizationFilter();

    // ==========================================================
    // STEP 6 - OPEN ORGANIZATION VALUE CONTROL
    // ==========================================================

    await moreFilterPage.openOrganizationValueControl();

    // ==========================================================
    // STEP 7 - APPLY
    // ==========================================================

    await moreFilterPage.applyFilter();

    // ==========================================================
    // STEP 8 - VERIFY
    // ==========================================================

    await moreFilterPage.verifyOrganizationFilter();

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'MORE FILTER COMPLETED SUCCESSFULLY',
    );
    console.log(
        'Organization filter applied.',
    );
    console.log(
        'Verified result: 1 Orgs',
    );
    console.log(
        '======================================================',
    );
}