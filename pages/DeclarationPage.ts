import { expect, Page } from '@playwright/test';

import { DeclarationLocators } from '../locators/DeclarationLocators';

// ==========================================================
// DECLARATION PAGE
// ==========================================================

export class DeclarationPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ======================================================
    // OPEN MORE FILTERS
    // ======================================================

    async openMoreFilters(): Promise<void> {

        console.log('');
        console.log('Opening MORE FILTERS...');

        const moreFiltersTab =
            this.page.getByRole(
                DeclarationLocators.moreFiltersTab.role as 'tab',
                {
                    name: DeclarationLocators.moreFiltersTab.name,
                    exact: DeclarationLocators.moreFiltersTab.exact,
                }
            );

        await expect(
            moreFiltersTab
        ).toBeVisible({
            timeout: 15000,
        });

        await expect(
            moreFiltersTab
        ).toBeEnabled({
            timeout: 10000,
        });

        await moreFiltersTab.click();

        await this.page.waitForTimeout(1000);

        console.log(
            'MORE FILTERS opened successfully.'
        );
    }

    // ======================================================
    // SEARCH CLAIM BY DISPLAY NAME
    // ======================================================

    async searchClaimByDisplayName(
        claimDisplayName: string
    ): Promise<void> {

        if (!claimDisplayName) {
            throw new Error(
                'Claim display name was not provided.'
            );
        }

        console.log('');
        console.log(
            `Searching claim: ${claimDisplayName}`
        );

        const displayNameTextbox =
            this.page.getByRole(
                DeclarationLocators.displayNameTextbox.role as 'textbox',
                {
                    name: DeclarationLocators.displayNameTextbox.name,
                    exact: DeclarationLocators.displayNameTextbox.exact,
                }
            );

        await expect(
            displayNameTextbox
        ).toBeVisible({
            timeout: 15000,
        });

        await displayNameTextbox.fill(
            claimDisplayName
        );

        console.log(
            'Claim display name entered successfully.'
        );
    }

    // ======================================================
    // APPLY FILTER
    // ======================================================

    async applyClaimFilter(): Promise<void> {

        console.log(
            'Applying claim filter...'
        );

        const applyButton =
            this.page.getByRole(
                DeclarationLocators.applyButton.role as 'button',
                {
                    name: DeclarationLocators.applyButton.name,
                    exact: DeclarationLocators.applyButton.exact,
                }
            );

        await expect(
            applyButton
        ).toBeVisible({
            timeout: 10000,
        });

        await expect(
            applyButton
        ).toBeEnabled({
            timeout: 10000,
        });

        await applyButton.click();

        await this.page.waitForTimeout(3000);

        console.log(
            'Claim filter applied successfully.'
        );
    }

    // ======================================================
    // VERIFY CLAIM
    // ======================================================

    async verifySingleClaimFound(): Promise<void> {

        console.log(
            'Verifying filtered claim...'
        );

        const totalClaimsText =
            this.page.getByText(
                DeclarationLocators.totalClaimsText.text,
                {
                    exact:
                        DeclarationLocators.totalClaimsText.exact,
                }
            );

        await expect(
            totalClaimsText
        ).toBeVisible({
            timeout: 15000,
        });

        console.log(
            'Total Claims: 1 verified successfully.'
        );
    }

    // ======================================================
    // CLICK VIEW DETAILS
    // ======================================================

    async clickViewDetails(): Promise<Page> {

        console.log(
            'Searching for View Details...'
        );

        const viewDetailsButton =
            this.page.getByText(
                DeclarationLocators.viewDetailsButton.text,
                {
                    exact:
                        DeclarationLocators.viewDetailsButton.exact,
                }
            );

        await expect(
            viewDetailsButton
        ).toHaveCount(
            1,
            {
                timeout: 15000,
            }
        );

        await expect(
            viewDetailsButton
        ).toBeVisible({
            timeout: 10000,
        });

        console.log(
            'View Details found successfully.'
        );

        const popupPromise =
            this.page.waitForEvent(
                'popup'
            );

        await viewDetailsButton.click();

        console.log(
            'View Details clicked.'
        );

        const claimPage =
            await popupPromise;

        await claimPage.waitForLoadState(
            'domcontentloaded'
        );

        await claimPage.waitForTimeout(
            3000
        );

        console.log('');
        console.log(
            `Claim Details URL: ${claimPage.url()}`
        );

        console.log(
            'Claim Details popup opened successfully.'
        );

        return claimPage;
    }

    // ======================================================
    // OPEN CREATED CLAIM
    // ======================================================

    async openCreatedClaim(
        claimDisplayName: string
    ): Promise<Page> {

        await this.openMoreFilters();

        await this.searchClaimByDisplayName(
            claimDisplayName
        );

        await this.applyClaimFilter();

        await this.verifySingleClaimFound();

        return await this.clickViewDetails();
    }

    // ======================================================
    // ENTER CONTACT DETAILS
    // ======================================================

    async enterContactDetails(
        contactDetails: string
    ): Promise<void> {

        console.log('');
        console.log(
            'Entering Contact Details...'
        );

        const textbox =
            this.page.getByRole(
                'textbox',
                {
                    name: 'Contact Details *',
                }
            );

        await expect(
            textbox
        ).toBeVisible({
            timeout: 15000,
        });

        await expect(
            textbox
        ).toBeEnabled({
            timeout: 10000,
        });

        await textbox.fill(
            contactDetails
        );

        await expect(
            textbox
        ).toHaveValue(
            contactDetails
        );

        console.log(
            `Contact Details entered: ${contactDetails}`
        );
    }

    // ======================================================
    // ENTER PAN NUMBER
    // ======================================================

    async enterPanNumber(
        panNumber: string
    ): Promise<void> {

        console.log('');
        console.log(
            'Entering PAN Number...'
        );

        const textbox =
            this.page.getByRole(
                'textbox',
                {
                    name: 'PAN Number *',
                }
            );

        await expect(
            textbox
        ).toBeVisible({
            timeout: 15000,
        });

        await expect(
            textbox
        ).toBeEnabled({
            timeout: 10000,
        });

        await textbox.fill(
            panNumber
        );

        await expect(
            textbox
        ).toHaveValue(
            panNumber
        );

        console.log(
            `PAN Number entered: ${panNumber}`
        );
    }

    // ======================================================
    // SELECT I AGREE CHECKBOXES
    // ======================================================

    async selectIAgreeCheckboxes(): Promise<void> {

        console.log('');
        console.log(
            'Selecting I Agree checkboxes...'
        );

        const checkboxes =
            this.page.getByRole(
                'checkbox',
                {
                    name: 'I Agree',
                    exact: true,
                }
            );

        const count =
            await checkboxes.count();

        console.log(
            `I Agree checkbox count: ${count}`
        );

        if (count < 3) {
            throw new Error(
                `Expected 3 I Agree checkboxes for Arbitrator/Conciliator declaration, but found ${count}.`
            );
        }

        for (
            let index = 0;
            index < 3;
            index++
        ) {

            const checkbox =
                checkboxes.nth(index);

            await expect(
                checkbox
            ).toBeVisible({
                timeout: 10000,
            });

            await expect(
                checkbox
            ).toBeEnabled({
                timeout: 10000,
            });

            if (
                !(await checkbox.isChecked())
            ) {
                await checkbox.check();
            }

            await expect(
                checkbox
            ).toBeChecked();
        }

        console.log(
            'All 3 I Agree checkboxes selected successfully.'
        );
    }

    // ======================================================
    // ENTER TOTAL NUMBER OF ARBITRATION
    // ======================================================

    async enterTotalNumberOfArbitration(
        value: string
    ): Promise<void> {

        console.log('');
        console.log(
            'Entering Total Number of Arbitration...'
        );

        const textbox =
            this.page.getByRole(
                'textbox',
                {
                    name:
                        'Total number of arbitration',
                }
            );

        await expect(
            textbox
        ).toBeVisible({
            timeout: 15000,
        });

        await expect(
            textbox
        ).toBeEnabled({
            timeout: 10000,
        });

        await textbox.fill(
            value
        );

        await expect(
            textbox
        ).toHaveValue(
            value
        );

        console.log(
            `Total number of arbitration entered: ${value}`
        );
    }

    // ======================================================
    // ENTER TOTAL NUMBER OF MEDIATION
    // ======================================================

    async enterTotalNumberOfMediation(
        value: string
    ): Promise<void> {

        console.log('');
        console.log(
            'Entering Total Number of Mediation...'
        );

        const textbox =
            this.page.getByRole(
                'textbox',
                {
                    name:
                        'Total number of mediation/',
                }
            );

        await expect(
            textbox
        ).toBeVisible({
            timeout: 15000,
        });

        await expect(
            textbox
        ).toBeEnabled({
            timeout: 10000,
        });

        await textbox.fill(
            value
        );

        await expect(
            textbox
        ).toHaveValue(
            value
        );

        console.log(
            `Total number of mediation entered: ${value}`
        );
    }

    // ======================================================
    // CLICK SUBMIT
    // ======================================================

    async clickSubmit(): Promise<void> {

        console.log('');
        console.log(
            'Clicking Submit...'
        );

        const submitButton =
            this.page.getByRole(
                'button',
                {
                    name: 'Submit',
                    exact: true,
                }
            );

        await expect(
            submitButton
        ).toBeVisible({
            timeout: 15000,
        });

        await expect(
            submitButton
        ).toBeEnabled({
            timeout: 10000,
        });

        await submitButton.click();

        console.log(
            'Submit button clicked successfully.'
        );
    }

    // ======================================================
    // ACCEPT PARTY DECLARATION
    // ======================================================

    async acceptPartyDeclaration(): Promise<void> {

        console.log('');
        console.log(
            'Starting Party Declaration...'
        );

        for (
            const checkboxName
            of DeclarationLocators.partyDeclarationCheckboxes
        ) {

            const checkbox =
                this.page.getByRole(
                    'checkbox',
                    {
                        name: checkboxName,
                    }
                );

            await expect(
                checkbox
            ).toBeVisible({
                timeout: 10000,
            });

            await checkbox.check();

            await expect(
                checkbox
            ).toBeChecked();
        }

        console.log(
            'All Party Declaration checkboxes selected.'
        );

        const iAgreeButton =
            this.page.getByRole(
                'button',
                {
                    name: 'I Agree',
                    exact: true,
                }
            );

        await expect(
            iAgreeButton
        ).toBeVisible({
            timeout: 10000,
        });

        await expect(
            iAgreeButton
        ).toBeEnabled({
            timeout: 10000,
        });

        await iAgreeButton.click();

        console.log(
            'Party Declaration accepted successfully.'
        );

        await this.page.waitForTimeout(
            2000
        );

        const proceedingsTab =
            this.page.getByRole(
                'tab',
                {
                    name: 'Proceedings',
                    exact: true,
                }
            );

        await expect(
            proceedingsTab
        ).toBeVisible({
            timeout: 10000,
        });

        await proceedingsTab.click();

        console.log(
            'Proceedings tab opened successfully.'
        );
    }
}