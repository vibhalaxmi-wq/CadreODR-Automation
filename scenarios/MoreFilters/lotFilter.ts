import {
    Page,
    expect,
} from '@playwright/test';

import {
    MoreFilterLocators,
} from '../../locators/MoreFilterLocators';

import {
    moreFilterData,
} from '../../testData/moreFilterData';


// ==========================================================
// LOT ID FILTER
// ==========================================================

export async function lotFilter(
    page: Page,
): Promise<void> {

    const locators = new MoreFilterLocators(page);
    const filterData = moreFilterData.lotId;

    console.log('');

    console.log(
        '======================================================',
    );

    console.log(
        'APPLY LOT ID FILTER',
    );

    console.log(
        '======================================================',
    );


    // ======================================================
    // STEP 01 - REMOVE PREVIOUS FILTER
    // ======================================================

    console.log(
        'STEP 01 - REMOVE PREVIOUS FILTER',
    );

    await locators.removePreviousFilterButton.waitFor({
        state: 'visible',
        timeout: 15000,
    });

    await locators.removePreviousFilterButton.click();

    console.log(
        'Previous filter removed successfully.',
    );


    // ======================================================
    // STEP 02 - OPEN MORE FILTERS
    // ======================================================

    console.log(
        'STEP 02 - OPEN MORE FILTERS',
    );

    await locators.moreFiltersTab.waitFor({
        state: 'visible',
        timeout: 15000,
    });

    await locators.moreFiltersTab.click();

    console.log(
        'MORE FILTERS opened successfully.',
    );


    // ======================================================
    // STEP 03 - OPEN LOT ID VALUE CONTROL
    // ======================================================

    console.log(
        'STEP 03 - OPEN LOT ID VALUE CONTROL',
    );

    await locators.lotIdValueControl.waitFor({
        state: 'visible',
        timeout: 15000,
    });

    await locators.lotIdValueControl.click();


    // ======================================================
    // STEP 04 - SEARCH LOT ID
    // ======================================================

    console.log(
        'STEP 04 - SEARCH LOT ID',
    );

    await locators.lotIdSearchOptions.waitFor({
        state: 'visible',
        timeout: 15000,
    });

    await locators.lotIdSearchOptions.fill(
        filterData.value,
    );


    // ======================================================
    // STEP 05 - SELECT LOT ID OPTION
    // ======================================================

    console.log(
        'STEP 05 - SELECT LOT ID OPTION',
    );

    await locators.lotIdFilterOption.waitFor({
        state: 'visible',
        timeout: 15000,
    });

    await locators.lotIdFilterOption.click();


    // ======================================================
    // STEP 06 - CLOSE LOT ID DROPDOWN
    // ======================================================

    console.log(
        'STEP 06 - CLOSE LOT ID DROPDOWN',
    );

    await locators.lotIdSearchOptions.press(
        'Escape',
    );


    // ======================================================
    // STEP 07 - APPLY LOT ID FILTER
    // ======================================================

    console.log(
        'STEP 07 - APPLY LOT ID FILTER',
    );

    await locators.applyButton.waitFor({
        state: 'visible',
        timeout: 15000,
    });

    await expect(
        locators.applyButton,
    ).toBeEnabled({
        timeout: 15000,
    });

    await locators.applyButton.scrollIntoViewIfNeeded();

    await locators.applyButton.click();

    console.log(
        'Lot ID filter applied successfully.',
    );


    // ======================================================
    // STEP 08 - VERIFY LOT ID FILTER RESULT
    // ======================================================

    console.log(
        'STEP 08 - VERIFY LOT ID FILTER RESULT',
    );

    await expect(
        locators.lotIdFilterResult,
    ).toBeVisible({
        timeout: 15000,
    });

    console.log(
        `Lot ID filter verified successfully: ${filterData.expectedResult}`,
    );

    console.log('');

    console.log(
        '======================================================',
    );

    console.log(
        'LOT ID FILTER COMPLETED SUCCESSFULLY',
    );

    console.log(
        '======================================================',
    );
}
