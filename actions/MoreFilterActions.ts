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

    console.log(
        'STEP 01 - OPEN ALL CLAIMS',
    );

    await locators.allClaimsButton.waitFor({
        state: 'visible',
    });

    await locators.allClaimsButton.click();

    console.log(
        'STEP 02 - SWITCH TO LIST VIEW',
    );

    await locators.listViewButton.waitFor({
        state: 'visible',
    });

    await locators.listViewButton.click();

    console.log(
        'STEP 03 - OPEN MORE FILTERS',
    );

    await locators.moreFiltersTab.waitFor({
        state: 'visible',
    });

    await locators.moreFiltersTab.click();

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

    console.log(
        'STEP 05 - SELECT ORGANIZATION VALUE',
    );

    await locators.organizationValueControl.waitFor({
        state: 'visible',
    });

    await locators.organizationValueControl.click();

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

    console.log(
        'STEP 02 - OPEN MORE FILTERS AGAIN',
    );

    await locators.moreFiltersTab.waitFor({
        state: 'visible',
    });

    await locators.moreFiltersTab.click();

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


// ==========================================================
// CONTRACT ID FILTER
// ==========================================================

export async function applyContractIdFilter(
    page: Page,
    contractId: string,
): Promise<void> {

    const locators = new MoreFilterLocators(page);

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'APPLY CONTRACT ID FILTER',
    );
    console.log(
        '======================================================',
    );

    console.log(
        `Contract ID received: ${contractId}`,
    );

    console.log(
        'STEP 01 - REMOVE PREVIOUS FILTER',
    );

    await locators.removePreviousFilterButton.waitFor({
        state: 'visible',
    });

    await locators.removePreviousFilterButton.click();

    console.log(
        'Previous filter removed successfully.',
    );

    console.log(
        'STEP 02 - OPEN MORE FILTERS AGAIN',
    );

    await locators.moreFiltersTab.waitFor({
        state: 'visible',
    });

    await locators.moreFiltersTab.click();

    console.log(
        'STEP 03 - ENTER CONTRACT ID',
    );

    await locators.contractIdTextbox.waitFor({
        state: 'visible',
    });

    await locators.contractIdTextbox.click();

    await locators.contractIdTextbox.fill(
        contractId,
    );

    console.log(
        `Contract ID entered: ${contractId}`,
    );

    console.log(
        'STEP 04 - APPLY CONTRACT ID FILTER',
    );

    await locators.applyButton.waitFor({
        state: 'visible',
    });

    await expect(
        locators.applyButton,
    ).toBeEnabled();

    await locators.applyButton.click();

    console.log(
        'Contract ID filter applied.',
    );

    console.log(
        'STEP 05 - VERIFY CONTRACT ID FILTER',
    );

    await expect(
        locators.contractIdFilterResult,
    ).toBeVisible();

    console.log(
        `Contract ID filter verified successfully: ${contractId}`,
    );

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'CONTRACT ID FILTER COMPLETED',
    );
    console.log(
        '======================================================',
    );
}


// ==========================================================
// STATUS FILTER
// ==========================================================

export async function applyStatusFilter(
    page: Page,
    status: string,
): Promise<void> {

    const locators = new MoreFilterLocators(page);

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'APPLY STATUS FILTER',
    );
    console.log(
        '======================================================',
    );

    console.log(
        `Status received: ${status}`,
    );

    // ======================================================
    // STEP 01 - REMOVE PREVIOUS FILTER
    // ======================================================

    console.log(
        'STEP 01 - REMOVE PREVIOUS FILTER',
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
    // STEP 03 - OPEN STATUS VALUE CONTROL
    // ======================================================

    console.log(
        'STEP 03 - OPEN STATUS VALUE CONTROL',
    );

    await locators.statusValueControl.waitFor({
        state: 'visible',
    });

    await locators.statusValueControl.click();

    console.log(
        'Status value control opened successfully.',
    );

    // ======================================================
    // STEP 04 - SEARCH STATUS
    // ======================================================

    console.log(
        'STEP 04 - SEARCH STATUS',
    );

    await locators.statusSearchOptions.waitFor({
        state: 'visible',
    });

    await locators.statusSearchOptions.fill(
        status,
    );

    console.log(
        `Status searched: ${status}`,
    );

    // ======================================================
    // STEP 05 - SELECT STATUS
    // ======================================================

    console.log(
        'STEP 05 - SELECT STATUS',
    );

    await locators.statusFilterOption.waitFor({
        state: 'visible',
    });

    await locators.statusFilterOption.click();

    // ======================================================
    // STEP 06 - CLOSE STATUS DROPDOWN
    // ======================================================

    console.log(
        'STEP 06 - CLOSE STATUS DROPDOWN',
    );

    await locators.statusSearchOptions.press(
        'Escape',
    );

    // ======================================================
    // STEP 07 - APPLY STATUS FILTER
    // ======================================================

    console.log(
        'STEP 07 - APPLY STATUS FILTER',
    );

    await locators.applyButton.waitFor({
        state: 'visible',
    });

    await expect(
        locators.applyButton,
    ).toBeEnabled();

    await locators.applyButton.click();

    console.log(
        'Status filter applied.',
    );

    // ======================================================
    // STEP 08 - VERIFY STATUS FILTER
    // ======================================================

    console.log(
        'STEP 08 - VERIFY STATUS FILTER RESULT',
    );

    await expect(
        locators.statusFilterResult,
    ).toBeVisible();

    console.log(
        `Status filter verified successfully: ${status}`,
    );

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'STATUS FILTER COMPLETED',
    );
    console.log(
        '======================================================',
    );
}