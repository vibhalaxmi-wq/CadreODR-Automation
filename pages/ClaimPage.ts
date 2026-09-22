import { expect, Page } from '@playwright/test';

import { ClaimLocators } from '../locators/ClaimLocators';

export class ClaimPage {

    readonly page: Page;

    constructor(page: Page) {

        this.page = page;

    }

    // ==========================================================
    // NEW CLAIM
    // ==========================================================

    async clickNewClaim(): Promise<void> {

        const button =
            this.page.getByRole(
                ClaimLocators.newClaimButton.role as 'button',
                {
                    name:
                        ClaimLocators.newClaimButton.name,
                }
            );

        await expect(button).toBeVisible({

            timeout: 15000,

        });

        await expect(button).toBeEnabled({

            timeout: 15000,

        });

        await button.click();
    }

    // ==========================================================
    // VERIFY NEW CLAIM FORM
    // ==========================================================

    async verifyNewClaimForm(): Promise<void> {

        const dropdown =
            this.page.getByRole(
                ClaimLocators.organizationDropdown.role as 'combobox',
                {
                    name:
                        ClaimLocators.organizationDropdown.name,
                }
            );

        await expect(dropdown).toBeVisible({

            timeout: 15000,

        });
    }

    // ==========================================================
    // SELECT ORGANIZATION
    // ==========================================================

    async selectOrganization(
        organization: string
    ): Promise<void> {

        const dropdown =
            this.page.getByRole(
                ClaimLocators.organizationDropdown.role as 'combobox',
                {
                    name:
                        ClaimLocators.organizationDropdown.name,
                }
            );

        await expect(dropdown).toBeVisible({

            timeout: 10000,

        });

        await dropdown.click();

        const option =
            this.page.getByText(
                organization,
                {
                    exact: true,
                }
            );

        await expect(option).toBeVisible({

            timeout: 10000,

        });

        await option.click();
    }

    // ==========================================================
    // ADD PARTY
    // ==========================================================

    async addParty(
        name: string,
        email: string,
        phone: string,
        address: string,
        role?: string
    ): Promise<void> {

        const addPartyButton =
            this.page.getByText(
                ClaimLocators.addPartyButton.text,
                {
                    exact: true,
                }
            );

        await expect(addPartyButton).toBeVisible({

            timeout: 10000,

        });

        await addPartyButton.click();

        const dialog =
            this.page.getByRole(
                ClaimLocators.addUserDialog.role as 'dialog',
                {
                    name:
                        ClaimLocators.addUserDialog.name,
                }
            );

        await expect(dialog).toBeVisible({

            timeout: 10000,

        });

        // ======================================================
        // ROLE
        // ======================================================

        if (role) {

            const chooseRoleDropdown =
                dialog.getByRole(
                    ClaimLocators.chooseRoleDropdown.role as 'combobox',
                    {
                        name:
                            ClaimLocators.chooseRoleDropdown.name,
                    }
                );

            await expect(
                chooseRoleDropdown
            ).toBeVisible({

                timeout: 10000,

            });

            await chooseRoleDropdown.click();

            const roleOption =
                dialog.getByText(
                    role,
                    {
                        exact: true,
                    }
                ).last();

            await expect(
                roleOption
            ).toBeVisible({

                timeout: 10000,

            });

            await roleOption.click();

            await expect(
                chooseRoleDropdown
            ).toContainText(
                role,
                {
                    timeout: 10000,
                }
            );
        }

        // ======================================================
        // NAME
        // ======================================================

        const nameTextbox =
            dialog.getByRole(
                ClaimLocators.nameTextbox.role as 'textbox',
                {
                    name:
                        ClaimLocators.nameTextbox.name,
                }
            );

        await expect(nameTextbox).toBeVisible({

            timeout: 10000,

        });

        await nameTextbox.fill(name);

        // ======================================================
        // EMAIL
        // ======================================================

        const emailTextbox =
            dialog.getByRole(
                ClaimLocators.emailTextbox.role as 'textbox',
                {
                    name:
                        ClaimLocators.emailTextbox.name,
                }
            );

        await expect(emailTextbox).toBeVisible({

            timeout: 10000,

        });

        await emailTextbox.fill(email);

        // ======================================================
        // PHONE
        // ======================================================

        const phoneTextbox =
            dialog.getByRole(
                ClaimLocators.phoneTextbox.role as 'textbox',
                {
                    name:
                        ClaimLocators.phoneTextbox.name,
                }
            );

        await expect(phoneTextbox).toBeVisible({

            timeout: 10000,

        });

        await phoneTextbox.fill(phone);

        // ======================================================
        // ADDRESS
        // ======================================================

        const addressTextbox =
            dialog.getByRole(
                ClaimLocators.addressTextbox.role as 'textbox',
                {
                    name:
                        ClaimLocators.addressTextbox.name,
                }
            );

        await expect(addressTextbox).toBeVisible({

            timeout: 10000,

        });

        await addressTextbox.fill(address);

        // ======================================================
        // ADD
        // ======================================================

        const addButton =
            dialog.getByRole(
                ClaimLocators.addButton.role as 'button',
                {
                    name:
                        ClaimLocators.addButton.name,
                }
            );

        await expect(addButton).toBeVisible({

            timeout: 10000,

        });

        await expect(addButton).toBeEnabled({

            timeout: 10000,

        });

        await addButton.click();

        await expect(dialog).toBeHidden({

            timeout: 15000,

        });
    }

    // ==========================================================
    // DISPUTE AMOUNT
    // ==========================================================

    async enterDisputeAmount(
        amount: string
    ): Promise<void> {

        const textbox =
            this.page.getByRole(
                ClaimLocators.disputeAmountTextbox.role as 'textbox',
                {
                    name:
                        ClaimLocators.disputeAmountTextbox.name,
                }
            );

        await expect(textbox).toBeVisible({

            timeout: 10000,

        });

        await textbox.fill(amount);
    }

    // ==========================================================
    // CONTRACT
    // ==========================================================

    async enterContract(
        contract: string
    ): Promise<void> {

        const textbox =
            this.page.getByRole(
                ClaimLocators.contractTextbox.role as 'textbox',
                {
                    name:
                        ClaimLocators.contractTextbox.name,
                }
            );

        await expect(textbox).toBeVisible({

            timeout: 10000,

        });

        await textbox.fill(contract);
    }

    // ==========================================================
    // JURISDICTION
    // ==========================================================

    async enterJurisdiction(
        jurisdiction: string
    ): Promise<void> {

        const textbox =
            this.page.getByRole(
                ClaimLocators.jurisdictionTextbox.role as 'textbox',
                {
                    name:
                        ClaimLocators.jurisdictionTextbox.name,
                }
            );

        await expect(textbox).toBeVisible({

            timeout: 10000,

        });

        await textbox.fill(jurisdiction);
    }

    // ==========================================================
    // DISPUTE TYPE
    // ==========================================================

    async selectDisputeType(
        disputeType: string
    ): Promise<void> {

        const dropdown =
            this.page.locator(
                ClaimLocators.disputeTypeDropdown.css
            ).first();

        await expect(dropdown).toBeVisible({

            timeout: 10000,

        });

        await dropdown.click();

        const option =
            this.page.getByText(
                disputeType,
                {
                    exact: true,
                }
            );

        await expect(option).toBeVisible({

            timeout: 10000,

        });

        await option.click();
    }

    // ==========================================================
    // CLAIM TYPE
    // ==========================================================

    async selectClaimType(
        claimType: string
    ): Promise<void> {

        const textbox =
            this.page.getByRole(
                ClaimLocators.claimTypeTextbox.role as 'textbox',
                {
                    name:
                        ClaimLocators.claimTypeTextbox.name,
                }
            );

        await expect(textbox).toBeVisible({

            timeout: 10000,

        });

        await textbox.click();

        const option =
            this.page.getByText(
                claimType,
                {
                    exact: true,
                }
            );

        await expect(option).toBeVisible({

            timeout: 10000,

        });

        await option.click();
    }

    // ==========================================================
    // SUMMARY
    // ==========================================================

    async enterSummary(
        summary: string
    ): Promise<void> {

        const textbox =
            this.page.getByRole(
                ClaimLocators.summaryTextbox.role as 'textbox',
                {
                    name:
                        ClaimLocators.summaryTextbox.name,
                }
            );

        await expect(textbox).toBeVisible({

            timeout: 10000,

        });

        await textbox.fill(summary);
    }

    // ==========================================================
    // UPLOAD ATTACHMENT
    // ==========================================================

    async uploadAttachment(
        filePath: string
    ): Promise<void> {

        const attachFilesButton =
            this.page.getByRole(
                ClaimLocators.attachFilesButton.role as 'button',
                {
                    name:
                        ClaimLocators.attachFilesButton.name,
                }
            );

        await expect(
            attachFilesButton
        ).toBeVisible({

            timeout: 30000,

        });

        await expect(
            attachFilesButton
        ).toBeEnabled({

            timeout: 30000,

        });

        const [fileChooser] =
            await Promise.all([

                this.page.waitForEvent(
                    'filechooser',
                    {
                        timeout: 30000,
                    }
                ),

                attachFilesButton.click(),

            ]);

        await fileChooser.setFiles(
            filePath
        );

        // Correct Windows/Linux path handling
        const fileName =
            filePath.split(/[\\/]/).pop();

        if (!fileName) {

            throw new Error(
                `Unable to determine file name from: ${filePath}`
            );
        }

        const uploadedFile =
            this.page.getByText(
                fileName,
                {
                    exact: false,
                }
            ).first();

        await expect(
            uploadedFile
        ).toBeVisible({

            timeout: 30000,

        });
    }

    // ==========================================================
    // SELECT TAG
    // ==========================================================

    async selectTag(
        tag: string
    ): Promise<void> {

        const selectTagButton =
            this.page.getByRole(
                ClaimLocators.selectTagButton.role as 'button',
                {
                    name:
                        ClaimLocators.selectTagButton.name,
                }
            );

        await expect(
            selectTagButton
        ).toBeVisible({

            timeout: 30000,

        });

        await expect(
            selectTagButton
        ).toBeEnabled({

            timeout: 30000,

        });

        await selectTagButton.click();

        const selectTagDropdown =
            this.page.getByRole(
                ClaimLocators.selectTagDropdown.role as 'combobox',
                {
                    name:
                        ClaimLocators.selectTagDropdown.name,
                }
            );

        await expect(
            selectTagDropdown
        ).toBeVisible({

            timeout: 15000,

        });

        await selectTagDropdown.click();

        const tagOption =
            this.page.getByText(
                tag,
                {
                    exact: true,
                }
            ).last();

        await expect(
            tagOption
        ).toBeVisible({

            timeout: 15000,

        });

        await tagOption.click();
    }

    // ==========================================================
    // LOG CLAIM
    // ==========================================================

    async logClaim(): Promise<void> {

        const button =
            this.page.getByRole(
                ClaimLocators.logClaimButton.role as 'button',
                {
                    name:
                        ClaimLocators.logClaimButton.name,
                }
            );

        await expect(button).toBeVisible({

            timeout: 10000,

        });

        await expect(button).toBeEnabled({

            timeout: 10000,

        });

        await button.click();
    }

    // ==========================================================
    // VERIFY TOAST
    // ==========================================================

    async verifyToast(): Promise<void> {

        const toast =
            this.page.getByTestId(
                ClaimLocators.toastMessage.testId
            );

        await expect(toast).toBeVisible({

            timeout: 30000,

        });
    }

    // ==========================================================
    // GET CLAIM DISPLAY NAME
    // ==========================================================

    async getClaimDisplayName(): Promise<string> {

        const claim =
            this.page.getByText(
                ClaimLocators.claimDisplayName.regex
            ).first();

        await expect(claim).toBeVisible({

            timeout: 30000,

        });

        const claimText =
            await claim.textContent();

        if (!claimText) {

            throw new Error(
                'Unable to retrieve claim display name.'
            );
        }

        const match =
            claimText.match(
                ClaimLocators.claimDisplayName.regex
            );

        if (!match) {

            throw new Error(
                `Unable to extract claim display name from: ${claimText}`
            );
        }

        return match[0].trim();
    }

    // ==========================================================
    // ADD ASSIGNED USER
    // ==========================================================
    //
    // UI order:
    //
    // index 0 = Case Officer
    // index 1 = Arbitrator
    // index 2 = Observer / Conciliator depending on claim type
    //
    // Flow:
    //
    // Click +Add
    //      ↓
    // Wait 10 seconds
    //      ↓
    // Tab
    //      ↓
    // Tab
    //      ↓
    // Enter
    //      ↓
    // Choose User dropdown opens
    //      ↓
    // Search User
    //      ↓
    // Select User
    //      ↓
    // Click Add
    //
    // ==========================================================

    async addAssignedUser(
        assignmentIndex: number,
        searchText: string,
        userName: string
    ): Promise<void> {

        // ------------------------------------------------------
        // FIND ALL +ADD BUTTONS
        // ------------------------------------------------------

        const addButtons =
            this.page.getByText(
                ClaimLocators.addAssignmentButton.text,
                {
                    exact: true,
                }
            );

        const count =
            await addButtons.count();

        console.log('');

        console.log(
            `Total assignment +Add buttons found: ${count}`
        );

        if (count <= assignmentIndex) {

            throw new Error(
                `Expected at least ${
                    assignmentIndex + 1
                } '+Add' buttons, but found ${count}.`
            );
        }

        // ------------------------------------------------------
        // CLICK REQUIRED +ADD BUTTON
        // ------------------------------------------------------

        console.log('');

        console.log(
            `Clicking assignment +Add button at index ${assignmentIndex}...`
        );

        await addButtons
            .nth(assignmentIndex)
            .click();

        console.log(
            `Assignment +Add button at index ${assignmentIndex} clicked.`
        );

        // ------------------------------------------------------
        // WAIT 10 SECONDS
        // ------------------------------------------------------
        //
        // The Choose User dropdown is not immediately available
        // for keyboard interaction.
        //
        // We intentionally wait 10 seconds before using Tab.
        //
        // ------------------------------------------------------

        console.log('');

        console.log(
            'Waiting 10 seconds before opening Choose User dropdown...'
        );

        await this.page.waitForTimeout(
            10000
        );

        console.log(
            '10 seconds completed.'
        );

        // ------------------------------------------------------
        // TAB - 1
        // ------------------------------------------------------

        console.log(
            'Pressing Tab - 1...'
        );

        await this.page.keyboard.press(
            'Tab'
        );

        // ------------------------------------------------------
        // TAB - 2
        // ------------------------------------------------------

        console.log(
            'Pressing Tab - 2...'
        );

        await this.page.keyboard.press(
            'Tab'
        );

        // ------------------------------------------------------
        // ENTER
        // ------------------------------------------------------

        console.log(
            'Pressing Enter to open Choose User dropdown...'
        );

        await this.page.keyboard.press(
            'Enter'
        );

        console.log(
            'Choose User dropdown opened using keyboard.'
        );

        // ------------------------------------------------------
        // VERIFY CHOOSE USER DROPDOWN
        // ------------------------------------------------------

        const chooseUser =
            this.page.getByRole(
                ClaimLocators.chooseUserDropdown.role as 'combobox',
                {
                    name:
                        ClaimLocators.chooseUserDropdown.name,
                }
            );

        await expect(
            chooseUser
        ).toBeVisible({

            timeout: 15000,

        });

        console.log(
            'Choose User dropdown is visible.'
        );

        // ------------------------------------------------------
        // SEARCH USER
        // ------------------------------------------------------

        const searchTextbox =
            this.page.getByRole(
                ClaimLocators.searchUserTextbox.role as 'textbox',
                {
                    name:
                        ClaimLocators.searchUserTextbox.name,
                }
            );

        await expect(
            searchTextbox
        ).toBeVisible({

            timeout: 15000,

        });

        await searchTextbox.fill(
            searchText
        );

        console.log(
            `Searching for user: ${searchText}`
        );

        // ------------------------------------------------------
        // WAIT FOR SEARCH RESULTS
        // ------------------------------------------------------

        await this.page.waitForTimeout(
            1000
        );

        // ------------------------------------------------------
        // SELECT USER
        // ------------------------------------------------------

        const userOption =
            this.page.getByText(
                userName,
                {
                    exact: false,
                }
            );

        await expect(
            userOption
        ).toBeVisible({

            timeout: 15000,

        });

        console.log(
            `Selecting user: ${userName}`
        );

        await userOption.click();

        // ------------------------------------------------------
        // ADD ASSIGNED USER
        // ------------------------------------------------------

        const addUserButton =
            this.page.getByRole(
                ClaimLocators.assignedUserAddButton.role as 'button',
                {
                    name:
                        ClaimLocators.assignedUserAddButton.name,
                }
            ).last();

        await expect(
            addUserButton
        ).toBeVisible({

            timeout: 15000,

        });

        await expect(
            addUserButton
        ).toBeEnabled({

            timeout: 15000,

        });

        await addUserButton.click();

        console.log('');

        console.log(
            `Assigned user "${userName}" successfully.`
        );
    }

    // ==========================================================
    // VERIFY LOG CLAIM BUTTON IS DISABLED
    // ==========================================================

    async verifyLogClaimButtonDisabled(): Promise<void> {

        const logClaimButton =
            this.page.getByRole(
                ClaimLocators.logClaimButton.role as 'button',
                {
                    name:
                        ClaimLocators.logClaimButton.name,
                }
            );

        await expect(
            logClaimButton
        ).toBeVisible({

            timeout: 15000,

        });

        console.log(
            'Log Claim button is visible.'
        );

        const isEnabled =
            await logClaimButton.isEnabled();

        const isDisabled =
            await logClaimButton.isDisabled();

        console.log(
            `Log Claim enabled status: ${isEnabled}`
        );

        console.log(
            `Log Claim disabled status: ${isDisabled}`
        );

        if (isDisabled) {

            console.log('');

            console.log(
                '======================================================'
            );

            console.log(
                'MANDATORY FIELD VALIDATION PASSED'
            );

            console.log(
                '======================================================'
            );

            console.log('');

            console.log(
                'PASS: Log Claim button is disabled without entering any data.'
            );

        } else {

            console.error('');

            console.error(
                '======================================================'
            );

            console.error(
                'MANDATORY FIELD VALIDATION FAILED'
            );

            console.error(
                '======================================================'
            );

            console.error('');

            console.error(
                'FAIL: Log Claim button is enabled without entering any data.'
            );

            throw new Error(
                'Log Claim button is enabled while all mandatory fields are empty. ' +
                'Expected Log Claim to be disabled.'
            );
        }

        await expect(
            logClaimButton
        ).toBeDisabled({

            timeout: 5000,

        });

        console.log('');

        console.log(
            'Playwright assertion passed: Log Claim button is disabled.'
        );
    }

}