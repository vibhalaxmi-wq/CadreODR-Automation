import {
    Page,
    expect,
} from '@playwright/test';

import {
    MoreFilterLocators,
} from '../locators/MoreFilterLocators';

// ==========================================================
// ORGANIZATION FILTER
// ==========================================================

export async function applyMoreFilter(
    page: Page,
): Promise<void> {

    const locators = new MoreFilterLocators(page);

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'APPLY ORGANIZATION FILTER',
    );
    console.log(
        '======================================================',
    );

    // ======================================================
    // STEP 01 - OPEN ALL CLAIMS
    // ======================================================

    console.log(
        'STEP 01 - OPEN ALL CLAIMS',
    );

    await locators.allClaimsButton.waitFor({
        state: 'visible',
    });

    await locators.allClaimsButton.click();

    // ======================================================
    // STEP 02 - SWITCH TO LIST VIEW
    // ======================================================

    console.log(
        'STEP 02 - SWITCH TO LIST VIEW',
    );

    await locators.listViewButton.waitFor({
        state: 'visible',
    });

    await locators.listViewButton.click();

    // ======================================================
    // STEP 03 - OPEN MORE FILTERS
    // ======================================================

    console.log(
        'STEP 03 - OPEN MORE FILTERS',
    );

    await locators.moreFiltersTab.waitFor({
        state: 'visible',
    });

    await locators.moreFiltersTab.click();

    // ======================================================
    // STEP 04 - SELECT ORGANIZATION FILTER
    // ======================================================

    console.log(
        'STEP 04 - SELECT ORGANIZATION FILTER',
    );

    await locators.organizationFilterDropdown.waitFor({
        state: 'visible',
    });

    await locators.organizationFilterDropdown.click();

    await locators.organizationFilterOption.waitFor({
        state: 'visible',
    });

    await locators.organizationFilterOption.click();

    // ======================================================
    // STEP 05 - SELECT ORGANIZATION VALUE
    // ======================================================

    console.log(
        'STEP 05 - SELECT ORGANIZATION VALUE',
    );

    await locators.organizationValueControl.waitFor({
        state: 'visible',
    });

    await locators.organizationValueControl.click();

    // ======================================================
    // STEP 06 - APPLY ORGANIZATION FILTER
    // ======================================================

    console.log(
        'STEP 06 - APPLY ORGANIZATION FILTER',
    );

    await locators.applyButton.waitFor({
        state: 'visible',
    });

    await expect(
        locators.applyButton,
    ).toBeEnabled();

    await locators.applyButton.click();

    // ======================================================
    // STEP 07 - VERIFY ORGANIZATION FILTER
    // ======================================================

    console.log(
        'STEP 07 - VERIFY ORGANIZATION FILTER',
    );

    await expect(
        locators.organizationFilterResult,
    ).toBeVisible();

    console.log(
        'Organization filter applied successfully.',
    );

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'ORGANIZATION FILTER COMPLETED',
    );
    console.log(
        '======================================================',
    );
}


// ==========================================================
// DISPLAY NAME FILTER
// ==========================================================

export async function applyDisplayNameFilter(
    page: Page,
    displayName: string,
): Promise<void> {

    const locators = new MoreFilterLocators(page);

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'APPLY DISPLAY NAME FILTER',
    );
    console.log(
        '======================================================',
    );

    console.log(
        `Display Name received: ${displayName}`,
    );

    // ======================================================
    // STEP 01 - REMOVE PREVIOUS FILTER
    // ======================================================

    console.log(
        'STEP 01 - REMOVE PREVIOUS ORGANIZATION FILTER',
    );

    await locators.removePreviousFilterButton.waitFor({
        state: 'visible',
    });

    await locators.removePreviousFilterButton.click();

    console.log(
        'Previous filter removed successfully.',
    );

    // ======================================================
    // STEP 02 - OPEN MORE FILTERS AGAIN
    // ======================================================

    console.log(
        'STEP 02 - OPEN MORE FILTERS AGAIN',
    );

    await locators.moreFiltersTab.waitFor({
        state: 'visible',
    });

    await locators.moreFiltersTab.click();

    console.log(
        'MORE FILTERS opened successfully.',
    );

    // ======================================================
    // STEP 03 - ENTER DISPLAY NAME
    // ======================================================

    console.log(
        'STEP 03 - ENTER DISPLAY NAME',
    );

    await locators.displayNameTextbox.waitFor({
        state: 'visible',
    });

    await locators.displayNameTextbox.click();

    await locators.displayNameTextbox.fill(
        displayName,
    );

    console.log(
        `Display Name entered: ${displayName}`,
    );

    // ======================================================
    // STEP 04 - APPLY DISPLAY NAME FILTER
    // ======================================================

    console.log(
        'STEP 04 - APPLY DISPLAY NAME FILTER',
    );

    await locators.applyButton.waitFor({
        state: 'visible',
    });

    await expect(
        locators.applyButton,
    ).toBeEnabled();

    await locators.applyButton.click();

    console.log(
        'Display Name filter applied.',
    );

    // ======================================================
    // STEP 05 - VERIFY SEARCHED CLAIM
    // ======================================================

    console.log(
        'STEP 05 - VERIFY SEARCHED CLAIM',
    );

    const searchedClaim =
        locators.getClaimByDisplayName(
            displayName,
        );

    await expect(
        searchedClaim,
    ).toBeVisible();

    console.log(
        `Claim verified successfully: Claim #${displayName}`,
    );

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'DISPLAY NAME FILTER COMPLETED',
    );
    console.log(
        '======================================================',
    );
}