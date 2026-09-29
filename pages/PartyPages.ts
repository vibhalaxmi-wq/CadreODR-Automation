import { expect, Page } from '@playwright/test';

import {
    PartyLocators,
} from '../locators/PartyLocators';


// ==========================================================
// PARTY PAGES
// ==========================================================

export class PartyPages {

    constructor(
        private readonly page: Page
    ) {}


    // ======================================================
    // CLICK ADD PARTY
    // ======================================================

    async clickAddParty(): Promise<void> {

        console.log('');
        console.log(
            'Looking for + Add Party button...'
        );


        // Always locate the current Add Party button.
        // The page can re-render after each party is added.

        const addParty =
            this.page
                .locator('main')
                .getByText(
                    PartyLocators
                        .addPartyButton.text,
                    {
                        exact: true,
                    }
                )
                .last();


        await expect(
            addParty
        ).toBeVisible({
            timeout: 30000,
        });


        await addParty.scrollIntoViewIfNeeded();


        await this.page.waitForTimeout(
            1000
        );


        await addParty.click({
            timeout: 15000,
        });


        console.log(
            '+ Add Party clicked successfully.'
        );


        // ==================================================
        // VERIFY ADD USER DIALOG
        // ==================================================

        const dialog =
            this.page.getByRole(
                PartyLocators.addUserDialog.role,
                {
                    name:
                        PartyLocators
                            .addUserDialog.name,
                }
            );


        await expect(
            dialog
        ).toBeVisible({
            timeout: 15000,
        });


        console.log(
            'Add User dialog opened successfully.'
        );
    }


    // ======================================================
    // SELECT ROLE
    // ======================================================

    async selectRole(
        role: string
    ): Promise<void> {

        const dialog =
            this.page.getByRole(
                PartyLocators.addUserDialog.role,
                {
                    name:
                        PartyLocators
                            .addUserDialog.name,
                }
            );


        const dropdown =
            dialog.getByRole(
                PartyLocators
                    .chooseRoleDropdown.role,
                {
                    name:
                        PartyLocators
                            .chooseRoleDropdown.name,
                }
            );


        await expect(
            dropdown
        ).toBeVisible({
            timeout: 15000,
        });


        await dropdown.click();


        const option =
            dialog.getByText(
                role,
                {
                    exact: true,
                }
            );


        await expect(
            option
        ).toBeVisible({
            timeout: 15000,
        });


        await option.click();


        console.log(
            `Role selected: ${role}`
        );
    }


    // ======================================================
    // FILL NAME
    // ======================================================

    async fillName(
        name: string
    ): Promise<void> {

        const dialog =
            this.page.getByRole(
                PartyLocators.addUserDialog.role,
                {
                    name:
                        PartyLocators
                            .addUserDialog.name,
                }
            );


        const field =
            dialog.getByRole(
                PartyLocators.nameTextbox.role,
                {
                    name:
                        PartyLocators
                            .nameTextbox.name,
                }
            );


        await expect(
            field
        ).toBeVisible({
            timeout: 15000,
        });


        await field.fill(name);
    }


    // ======================================================
    // FILL EMAIL
    // ======================================================

    async fillEmail(
        email: string
    ): Promise<void> {

        const dialog =
            this.page.getByRole(
                PartyLocators.addUserDialog.role,
                {
                    name:
                        PartyLocators
                            .addUserDialog.name,
                }
            );


        const field =
            dialog.getByRole(
                PartyLocators.emailTextbox.role,
                {
                    name:
                        PartyLocators
                            .emailTextbox.name,
                }
            );


        await expect(
            field
        ).toBeVisible({
            timeout: 15000,
        });


        await field.fill(email);
    }


    // ======================================================
    // FILL PHONE
    // ======================================================

    async fillPhone(
        phone: string
    ): Promise<void> {

        const dialog =
            this.page.getByRole(
                PartyLocators.addUserDialog.role,
                {
                    name:
                        PartyLocators
                            .addUserDialog.name,
                }
            );


        const field =
            dialog.getByRole(
                PartyLocators.phoneTextbox.role,
                {
                    name:
                        PartyLocators
                            .phoneTextbox.name,
                }
            );


        await expect(
            field
        ).toBeVisible({
            timeout: 15000,
        });


        await field.fill(phone);
    }


    // ======================================================
    // FILL ADDRESS
    // ======================================================

    async fillAddress(
        address: string
    ): Promise<void> {

        const dialog =
            this.page.getByRole(
                PartyLocators.addUserDialog.role,
                {
                    name:
                        PartyLocators
                            .addUserDialog.name,
                }
            );


        const field =
            dialog.getByRole(
                PartyLocators.addressTextbox.role,
                {
                    name:
                        PartyLocators
                            .addressTextbox.name,
                }
            );


        await expect(
            field
        ).toBeVisible({
            timeout: 15000,
        });


        await field.fill(address);
    }


    // ======================================================
    // SELECT REPRESENTATIVE FOR
    // ======================================================

    async selectRepresentativeFor(
        partyName: string
    ): Promise<void> {

        const dialog =
            this.page.getByRole(
                PartyLocators.addUserDialog.role,
                {
                    name:
                        PartyLocators
                            .addUserDialog.name,
                }
            );


        const dropdown =
            dialog.getByRole(
                PartyLocators
                    .representativeForDropdown.role,
                {
                    name:
                        PartyLocators
                            .representativeForDropdown.name,
                }
            );


        await expect(
            dropdown
        ).toBeVisible({
            timeout: 15000,
        });


        await dropdown.click();


        const party =
            dialog.getByText(
                partyName,
                {
                    exact: true,
                }
            );


        await expect(
            party
        ).toBeVisible({
            timeout: 15000,
        });


        await party.click();


        console.log(
            `Representative For selected: ${partyName}`
        );
    }


    // ======================================================
    // CLICK ADD IN DIALOG
    // ======================================================

    async clickAdd(): Promise<void> {

        const dialog =
            this.page.getByRole(
                PartyLocators.addUserDialog.role,
                {
                    name:
                        PartyLocators
                            .addUserDialog.name,
                }
            );


        const addButton =
            dialog.getByRole(
                PartyLocators.addButton.role,
                {
                    name:
                        PartyLocators
                            .addButton.name,
                }
            );


        await expect(
            addButton
        ).toBeVisible({
            timeout: 15000,
        });


        await expect(
            addButton
        ).toBeEnabled({
            timeout: 15000,
        });


        await addButton.click();


        console.log(
            'Add button clicked.'
        );


        // Wait for dialog to close.

        await expect(
            dialog
        ).toBeHidden({
            timeout: 15000,
        });
    }


    // ======================================================
    // VERIFY TOAST
    // ======================================================

    async verifyToast(): Promise<void> {

        const toast =
            this.page.getByTestId(
                PartyLocators
                    .toastMessage.testId
            );


        await expect(
            toast
        ).toBeVisible({
            timeout: 30000,
        });


        console.log(
            'Toast:',
            await toast.textContent()
        );
    }


    // ======================================================
    // VERIFY NORMAL PARTY
    // ======================================================

    async verifyPartyName(
        partyName: string
    ): Promise<void> {

        const party =
            this.page
                .locator('main')
                .getByText(
                    partyName,
                    {
                        exact: true,
                    }
                )
                .last();


        await expect(
            party
        ).toBeVisible({
            timeout: 30000,
        });


        console.log(
            `Verified party on UI: ${partyName}`
        );
    }


    // ======================================================
    // VERIFY REPRESENTATIVE
    // ======================================================

    async verifyRepresentative(
        representativeName: string
    ): Promise<void> {

        // ==================================================
        // IMPORTANT
        // ==================================================
        //
        // The UI displays representatives as:
        //
        // Rep: Bruno
        //
        // Rep: Paul
        //
        // Therefore we verify the complete displayed text.
        //
        // ==================================================

        const representativeText =
            `Rep: ${representativeName}`;


        const representative =
            this.page
                .locator('main')
                .getByText(
                    representativeText,
                    {
                        exact: true,
                    }
                )
                .last();


        await expect(
            representative
        ).toBeVisible({
            timeout: 30000,
        });


        console.log(
            `Verified representative on UI: ${representativeText}`
        );
    }


    // ======================================================
    // WAIT FOR PAGE UPDATE
    // ======================================================

    async waitForPartyPageRefresh(): Promise<void> {

        await this.page.waitForTimeout(
            1500
        );
    }
}