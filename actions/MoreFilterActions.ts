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
    console.log('======================================================');
    console.log('APPLY ORGANIZATION FILTER');
    console.log('======================================================');

    console.log('STEP 01 - OPEN ALL CLAIMS');

    await locators.allClaimsButton.waitFor({
        state: 'visible',
    });

    await locators.allClaimsButton.click();

    console.log('STEP 02 - SWITCH TO LIST VIEW');

    await locators.listViewButton.waitFor({
        state: 'visible',
    });

    await locators.listViewButton.click();

    console.log('STEP 03 - OPEN MORE FILTERS');

    await locators.moreFiltersTab.waitFor({
        state: 'visible',
    });

    await locators.moreFiltersTab.click();

    console.log('STEP 04 - SELECT ORGANIZATION FILTER');

    await locators.organizationFilterDropdown.waitFor({
        state: 'visible',
    });

    await locators.organizationFilterDropdown.click();

    await locators.organizationFilterOption.waitFor({
        state: 'visible',
    });

    await locators.organizationFilterOption.click();

    console.log('STEP 05 - SELECT ORGANIZATION VALUE');

    await locators.organizationValueControl.waitFor({
        state: 'visible',
    });

    await locators.organizationValueControl.click();

    console.log('STEP 06 - APPLY ORGANIZATION FILTER');

    await locators.applyButton.waitFor({
        state: 'visible',
    });

    await expect(locators.applyButton).toBeEnabled();

    await locators.applyButton.click();

    console.log('STEP 07 - VERIFY ORGANIZATION FILTER');

    await expect(
        locators.organizationFilterResult,
    ).toBeVisible();

    console.log('Organization filter applied successfully.');

    console.log('');
    console.log('======================================================');
    console.log('ORGANIZATION FILTER COMPLETED');
    console.log('======================================================');
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
    console.log('======================================================');
    console.log('APPLY DISPLAY NAME FILTER');
    console.log('======================================================');

    console.log(`Display Name received: ${displayName}`);

    console.log('STEP 01 - REMOVE PREVIOUS ORGANIZATION FILTER');

    await locators.removePreviousFilterButton.waitFor({
        state: 'visible',
    });

    await locators.removePreviousFilterButton.click();

    console.log('Previous filter removed successfully.');

    console.log('STEP 02 - OPEN MORE FILTERS AGAIN');

    await locators.moreFiltersTab.waitFor({
        state: 'visible',
    });

    await locators.moreFiltersTab.click();

    console.log('STEP 03 - ENTER DISPLAY NAME');

    await locators.displayNameTextbox.waitFor({
        state: 'visible',
    });

    await locators.displayNameTextbox.click();

    await locators.displayNameTextbox.fill(displayName);

    console.log(`Display Name entered: ${displayName}`);

    console.log('STEP 04 - APPLY DISPLAY NAME FILTER');

    await locators.applyButton.waitFor({
        state: 'visible',
    });

    await expect(locators.applyButton).toBeEnabled();

    await locators.applyButton.click();

    console.log('Display Name filter applied.');

    console.log('STEP 05 - VERIFY SEARCHED CLAIM');

    const searchedClaim =
        locators.getClaimByDisplayName(displayName);

    await expect(searchedClaim).toBeVisible();

    console.log(
        `Claim verified successfully: Claim #${displayName}`,
    );

    console.log('');
    console.log('======================================================');
    console.log('DISPLAY NAME FILTER COMPLETED');
    console.log('======================================================');
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
    console.log('======================================================');
    console.log('APPLY CONTRACT ID FILTER');
    console.log('======================================================');

    console.log(`Contract ID received: ${contractId}`);

    console.log('STEP 01 - REMOVE PREVIOUS FILTER');

    await locators.removePreviousFilterButton.waitFor({
        state: 'visible',
    });

    await locators.removePreviousFilterButton.click();

    console.log('Previous filter removed successfully.');

    console.log('STEP 02 - OPEN MORE FILTERS AGAIN');

    await locators.moreFiltersTab.waitFor({
        state: 'visible',
    });

    await locators.moreFiltersTab.click();

    console.log('STEP 03 - ENTER CONTRACT ID');

    await locators.contractIdTextbox.waitFor({
        state: 'visible',
    });

    await locators.contractIdTextbox.click();

    await locators.contractIdTextbox.fill(contractId);

    console.log(`Contract ID entered: ${contractId}`);

    console.log('STEP 04 - APPLY CONTRACT ID FILTER');

    await locators.applyButton.waitFor({
        state: 'visible',
    });

    await expect(locators.applyButton).toBeEnabled();

    await locators.applyButton.click();

    console.log('Contract ID filter applied.');

    console.log('STEP 05 - VERIFY CONTRACT ID FILTER');

    await expect(
        locators.contractIdFilterResult,
    ).toBeVisible();

    console.log(
        `Contract ID filter verified successfully: ${contractId}`,
    );

    console.log('');
    console.log('======================================================');
    console.log('CONTRACT ID FILTER COMPLETED');
    console.log('======================================================');
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
    console.log('======================================================');
    console.log('APPLY STATUS FILTER');
    console.log('======================================================');

    console.log(`Status received: ${status}`);

    console.log('STEP 01 - REMOVE PREVIOUS FILTER');

    await locators.removePreviousFilterButton.waitFor({
        state: 'visible',
    });

    await locators.removePreviousFilterButton.click();

    console.log('Previous filter removed successfully.');

    console.log('STEP 02 - OPEN MORE FILTERS AGAIN');

    await locators.moreFiltersTab.waitFor({
        state: 'visible',
    });

    await locators.moreFiltersTab.click();

    console.log('MORE FILTERS opened successfully.');

    console.log('STEP 03 - OPEN STATUS VALUE CONTROL');

    await locators.statusValueControl.waitFor({
        state: 'visible',
    });

    await locators.statusValueControl.click();

    console.log('Status value control opened successfully.');

    console.log('STEP 04 - SEARCH STATUS');

    await locators.statusSearchOptions.waitFor({
        state: 'visible',
    });

    await locators.statusSearchOptions.fill(status);

    console.log(`Status searched: ${status}`);

    console.log('STEP 05 - SELECT STATUS');

    await locators.statusFilterOption.waitFor({
        state: 'visible',
    });

    await locators.statusFilterOption.click();

    console.log('STEP 06 - CLOSE STATUS DROPDOWN');

    await locators.statusSearchOptions.press('Escape');

    console.log('STEP 07 - APPLY STATUS FILTER');

    await locators.applyButton.waitFor({
        state: 'visible',
    });

    await expect(locators.applyButton).toBeEnabled();

    await locators.applyButton.click();

    console.log('Status filter applied.');

    console.log('STEP 08 - VERIFY STATUS FILTER RESULT');

    await expect(
        locators.statusFilterResult,
    ).toBeVisible();

    console.log(
        `Status filter verified successfully: ${status}`,
    );

    console.log('');
    console.log('======================================================');
    console.log('STATUS FILTER COMPLETED');
    console.log('======================================================');
}


// ==========================================================
// CASE OFFICER FILTER
// ==========================================================

export async function applyCaseOfficerFilter(
    page: Page,
    caseOfficer: string,
): Promise<void> {

    const locators = new MoreFilterLocators(page);

    console.log('');
    console.log('======================================================');
    console.log('APPLY CASE OFFICER FILTER');
    console.log('======================================================');

    console.log(`Case Officer received: ${caseOfficer}`);

    console.log('STEP 01 - REMOVE PREVIOUS FILTER');

    await locators.removePreviousFilterButton.waitFor({
        state: 'visible',
    });

    await locators.removePreviousFilterButton.click();

    console.log('Previous filter removed successfully.');

    console.log('STEP 02 - OPEN MORE FILTERS');

    await locators.moreFiltersTab.waitFor({
        state: 'visible',
    });

    await locators.moreFiltersTab.click();

    console.log('MORE FILTERS opened successfully.');

    console.log('STEP 03 - OPEN CASE OFFICER VALUE CONTROL');

    await locators.caseOfficerValueControl.waitFor({
        state: 'visible',
    });

    await locators.caseOfficerValueControl.click();

    console.log('Case Officer value control opened successfully.');

    console.log('STEP 04 - SEARCH CASE OFFICER');

    await locators.caseOfficerSearchOptions.waitFor({
        state: 'visible',
    });

    await locators.caseOfficerSearchOptions.fill(caseOfficer);

    console.log(`Case Officer searched: ${caseOfficer}`);

    console.log('STEP 05 - SELECT CASE OFFICER');

    await locators.caseOfficerFilterOption.waitFor({
        state: 'visible',
    });

    await locators.caseOfficerFilterOption.click();

    console.log('Case Officer selected successfully.');

    console.log('STEP 06 - CLOSE CASE OFFICER DROPDOWN');

    await locators.caseOfficerSearchOptions.press('Escape');

    console.log('STEP 07 - APPLY CASE OFFICER FILTER');

    await locators.applyButton.waitFor({
        state: 'visible',
    });

    await expect(locators.applyButton).toBeEnabled();

    await locators.applyButton.click();

    console.log('Case Officer filter applied.');

    console.log('STEP 08 - VERIFY CASE OFFICER FILTER');

    await expect(
        locators.caseOfficerFilterResult,
    ).toBeVisible();

    console.log(
        `Case Officer filter verified successfully: ${caseOfficer}`,
    );

    console.log('');
    console.log('======================================================');
    console.log('CASE OFFICER FILTER COMPLETED');
    console.log('======================================================');
}


// ==========================================================
// ARBITRATOR FILTER
// ==========================================================

export async function applyArbitratorFilter(
    page: Page,
    arbitrator: string,
): Promise<void> {

    const locators = new MoreFilterLocators(page);

    console.log('');
    console.log('======================================================');
    console.log('APPLY ARBITRATOR FILTER');
    console.log('======================================================');

    console.log(`Arbitrator received: ${arbitrator}`);

    console.log('STEP 01 - REMOVE PREVIOUS FILTER');

    await locators.removePreviousFilterButton.waitFor({
        state: 'visible',
    });

    await locators.removePreviousFilterButton.click();

    console.log('Previous filter removed successfully.');

    console.log('STEP 02 - OPEN MORE FILTERS');

    await locators.moreFiltersTab.waitFor({
        state: 'visible',
    });

    await locators.moreFiltersTab.click();

    console.log('MORE FILTERS opened successfully.');

    console.log('STEP 03 - OPEN ARBITRATOR VALUE CONTROL');

    await locators.arbitratorValueControl.waitFor({
        state: 'visible',
    });

    await locators.arbitratorValueControl.click();

    console.log('Arbitrator value control opened successfully.');

    console.log('STEP 04 - SEARCH ARBITRATOR');

    await locators.arbitratorSearchOptions.waitFor({
        state: 'visible',
    });

    await locators.arbitratorSearchOptions.fill(arbitrator);

    console.log(`Arbitrator searched: ${arbitrator}`);

    console.log('STEP 05 - SELECT ARBITRATOR');

    await locators.arbitratorFilterOption.waitFor({
        state: 'visible',
    });

    await locators.arbitratorFilterOption.click();

    console.log('Arbitrator selected successfully.');

    console.log('STEP 06 - CLOSE ARBITRATOR DROPDOWN');

    await locators.arbitratorSearchOptions.press('Escape');

    console.log('Arbitrator dropdown closed successfully.');

    console.log('STEP 07 - APPLY ARBITRATOR FILTER');

    await locators.applyButton.waitFor({
        state: 'visible',
    });

    await expect(locators.applyButton).toBeEnabled();

    await locators.applyButton.scrollIntoViewIfNeeded();

    await locators.applyButton.click();

    console.log('Arbitrator filter applied.');

    console.log('STEP 08 - VERIFY ARBITRATOR FILTER RESULT');

    await expect(
        locators.arbitratorFilterResult,
    ).toBeVisible({
        timeout: 15000,
    });

    console.log(
        `Arbitrator filter verified successfully: ${arbitrator}`,
    );

    console.log('');
    console.log('======================================================');
    console.log('ARBITRATOR FILTER COMPLETED');
    console.log('======================================================');
}


// ==========================================================
// LOT ID FILTER
// ==========================================================

export async function applyLotIdFilter(
    page: Page,
    lotId: string,
): Promise<void> {

    const locators = new MoreFilterLocators(page);

    console.log('');
    console.log('======================================================');
    console.log('APPLY LOT ID FILTER');
    console.log('======================================================');

    console.log(`Lot ID received: ${lotId}`);

    console.log('STEP 01 - REMOVE PREVIOUS FILTER');

    await locators.removePreviousFilterButton.waitFor({
        state: 'visible',
    });

    await locators.removePreviousFilterButton.click();

    console.log('Previous filter removed successfully.');

    console.log('STEP 02 - OPEN MORE FILTERS');

    await locators.moreFiltersTab.waitFor({
        state: 'visible',
    });

    await locators.moreFiltersTab.click();

    console.log('MORE FILTERS opened successfully.');

    console.log('STEP 03 - OPEN LOT ID VALUE CONTROL');

    await locators.lotIdValueControl.waitFor({
        state: 'visible',
        timeout: 15000,
    });

    await locators.lotIdValueControl.click();

    console.log('Lot ID value control opened successfully.');

    console.log('STEP 04 - SEARCH LOT ID');

    await locators.lotIdSearchOptions.waitFor({
        state: 'visible',
        timeout: 15000,
    });

    await locators.lotIdSearchOptions.fill(lotId);

    console.log(`Lot ID searched: ${lotId}`);

    console.log('STEP 05 - SELECT LOT ID');

    await locators.lotIdFilterOption.waitFor({
        state: 'visible',
        timeout: 15000,
    });

    await locators.lotIdFilterOption.click();

    console.log('Lot ID selected successfully.');

    console.log('STEP 06 - CLOSE LOT ID DROPDOWN');

    await locators.lotIdSearchOptions.press('Escape');

    console.log('Lot ID dropdown closed successfully.');

    console.log('STEP 07 - APPLY LOT ID FILTER');

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

    console.log('Lot ID filter applied.');

    console.log('STEP 08 - VERIFY LOT ID FILTER RESULT');

    await expect(
        locators.lotIdFilterResult,
    ).toBeVisible({
        timeout: 15000,
    });

    console.log(
        `Lot ID filter verified successfully: ${lotId}`,
    );

    console.log('');
    console.log('======================================================');
    console.log('LOT ID FILTER COMPLETED');
    console.log('======================================================');
}


// ==========================================================
// DISPUTE TYPE FILTER
// ==========================================================

export async function applyDisputeTypeFilter(
    page: Page,
    disputeType: string,
): Promise<void> {

    const locators = new MoreFilterLocators(page);

    console.log('');
    console.log('======================================================');
    console.log('APPLY DISPUTE TYPE FILTER');
    console.log('======================================================');

    console.log(`Dispute Type received: ${disputeType}`);

    console.log('STEP 01 - REMOVE PREVIOUS FILTER');

    await locators.removePreviousFilterButton.waitFor({
        state: 'visible',
        timeout: 15000,
    });

    await locators.removePreviousFilterButton.click();

    console.log('Previous filter removed successfully.');

    console.log('STEP 02 - OPEN MORE FILTERS');

    await locators.moreFiltersTab.waitFor({
        state: 'visible',
        timeout: 15000,
    });

    await locators.moreFiltersTab.click();

    console.log('MORE FILTERS opened successfully.');

    console.log('STEP 03 - OPEN DISPUTE TYPE VALUE CONTROL');

    await locators.disputeTypeValueControl.waitFor({
        state: 'visible',
        timeout: 15000,
    });

    await locators.disputeTypeValueControl.click();

    console.log('Dispute Type value control opened successfully.');

    console.log('STEP 04 - SELECT DISPUTE TYPE');

    const disputeTypeOption =
        page.getByText(disputeType, {
            exact: true,
        }).first();

    await disputeTypeOption.waitFor({
        state: 'visible',
        timeout: 15000,
    });

    await disputeTypeOption.click();

    console.log(`Dispute Type selected: ${disputeType}`);

    console.log('STEP 05 - APPLY DISPUTE TYPE FILTER');

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

    console.log('Dispute Type filter applied.');

    console.log('STEP 06 - VERIFY DISPUTE TYPE FILTER');

    await expect(
        locators.disputeTypeFilterResult,
    ).toBeVisible({
        timeout: 15000,
    });

    console.log(
        `Dispute Type filter verified successfully: ${disputeType}`,
    );

    console.log('');
    console.log('======================================================');
    console.log('DISPUTE TYPE FILTER COMPLETED');
    console.log('======================================================');
}