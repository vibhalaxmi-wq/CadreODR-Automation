import { Page, expect } from '@playwright/test';

// ==========================================================
// OPEN CREATED CLAIM
// ==========================================================

export async function openCreatedClaim(
    page: Page,
    claimDisplayName: string
): Promise<Page> {

    // ======================================================
    // VALIDATE CLAIM DISPLAY NAME
    // ======================================================

    if (!claimDisplayName) {
        throw new Error(
            'Claim display name was not provided to openCreatedClaim().'
        );
    }

    console.log('');
    console.log('==========================================================');
    console.log('SEARCHING FOR CREATED CLAIM');
    console.log('==========================================================');

    console.log(
        `Claim to open: ${claimDisplayName}`
    );

    // ======================================================
    // WAIT FOR CLAIMS PAGE
    // ======================================================

    await expect(page).toHaveURL(
        /\/u\/claims/,
        {
            timeout: 30000
        }
    );

    await page.waitForTimeout(3000);

    // ======================================================
    // FIND THE EXACT CLAIM DISPLAY NAME
    // ======================================================

    console.log(
        `Looking for claim: ${claimDisplayName}`
    );

    const claimName = page.getByText(
        claimDisplayName,
        {
            exact: true
        }
    ).first();

    await expect(claimName).toBeVisible({
        timeout: 30000
    });

    console.log(
        `Claim found successfully: ${claimDisplayName}`
    );

    // ======================================================
    // FIND THE CLAIM CARD
    //
    // Starting from the claim name, move upward to the
    // nearest DIV which contains the View Details button.
    // ======================================================

    const claimCard = claimName.locator(
        'xpath=ancestor::div[.//*[normalize-space()="View Details"]][1]'
    );

    await expect(claimCard).toBeVisible({
        timeout: 10000
    });

    console.log(
        'Correct claim card located successfully.'
    );

    // ======================================================
    // FIND VIEW DETAILS INSIDE THAT CLAIM CARD
    // ======================================================

    const viewDetailsButton = claimCard.getByText(
        'View Details',
        {
            exact: true
        }
    ).first();

    await expect(viewDetailsButton).toBeVisible({
        timeout: 10000
    });

    console.log(
        'View Details button for the created claim found.'
    );

    // ======================================================
    // OPEN CLAIM DETAILS POPUP
    // ======================================================

    console.log(
        `Opening claim: ${claimDisplayName}`
    );

    const popupPromise = page.waitForEvent(
        'popup'
    );

    await viewDetailsButton.click();

    const claimPage = await popupPromise;

    // ======================================================
    // WAIT FOR POPUP
    // ======================================================

    await claimPage.waitForLoadState(
        'domcontentloaded'
    );

    await claimPage.waitForTimeout(2000);

    console.log(
        'Claim Details popup opened successfully.'
    );

    // ======================================================
    // VERIFY CORRECT CLAIM WAS OPENED
    // ======================================================

    const openedClaim = claimPage.getByText(
        claimDisplayName,
        {
            exact: true
        }
    ).first();

    await expect(openedClaim).toBeVisible({
        timeout: 15000
    });

    console.log('');
    console.log('==========================================================');
    console.log('CORRECT CLAIM OPENED SUCCESSFULLY');
    console.log('==========================================================');

    console.log(
        `Opened Claim: ${claimDisplayName}`
    );

    return claimPage;
}