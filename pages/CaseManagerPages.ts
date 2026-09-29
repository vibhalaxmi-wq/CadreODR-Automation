import { expect, Page } from '@playwright/test';
import { AssignCaseManagersLocators } from '../locators/CaseManagerLocators';

// ==========================================================
// CASE MANAGER PAGES
// ==========================================================

export class AssignCaseManagersPages {

    constructor(
        private readonly page: Page
    ) {}


    // ==========================================================
    // 1. CLICK +ADD BUTTON
    // ==========================================================

    async clickAddButton(
        addButtonIndex: number
    ): Promise<void> {

        console.log('');
        console.log(
            `Clicking +Add button. Index: ${addButtonIndex}`
        );

        const addButtons =
            this.page.getByText(
                AssignCaseManagersLocators.addButton.name,
                {
                    exact: true,
                }
            );

        const addButton =
            addButtons.nth(addButtonIndex);

        await expect(
            addButton
        ).toBeVisible({
            timeout: 15000,
        });

        await addButton.scrollIntoViewIfNeeded();

        await addButton.click();

        console.log(
            `+Add button clicked. Index: ${addButtonIndex}`
        );

        // ------------------------------------------------------
        // WAIT FOR ADD USER DIALOG
        // ------------------------------------------------------

        const dialog =
            this.page.getByRole(
                'dialog',
                {
                    name: 'Add User',
                }
            ).last();

        await expect(
            dialog
        ).toBeVisible({
            timeout: 15000,
        });

        console.log(
            'Add User dialog opened successfully.'
        );
    }


    // ==========================================================
    // 2. OPEN CHOOSE USER
    // ==========================================================

    async openChooseUser(): Promise<void> {

        console.log('');
        console.log(
            'Opening Choose User dropdown...'
        );

        // ------------------------------------------------------
        // GET CURRENT ADD USER DIALOG
        // ------------------------------------------------------

        const dialog =
            this.page.getByRole(
                'dialog',
                {
                    name: 'Add User',
                }
            ).last();

        await expect(
            dialog
        ).toBeVisible({
            timeout: 15000,
        });

        // ------------------------------------------------------
        // GET CHOOSE USER
        // ------------------------------------------------------

        const chooseUser =
            dialog.getByRole(
                'combobox',
                {
                    name: 'Choose User',
                }
            );

        await expect(
            chooseUser
        ).toBeVisible({
            timeout: 15000,
        });

        console.log(
            'Choose User control is visible.'
        );

        await chooseUser.scrollIntoViewIfNeeded();

        // ------------------------------------------------------
        // FIRST ATTEMPT - NORMAL CLICK
        // ------------------------------------------------------

        await chooseUser.click();

        console.log(
            'Choose User clicked.'
        );

        // ------------------------------------------------------
        // SEARCH BOX
        // ------------------------------------------------------

        const searchBox =
            this.page.getByRole(
                'textbox',
                {
                    name: 'Search',
                }
            ).last();

        // ------------------------------------------------------
        // CHECK IF OPENED
        // ------------------------------------------------------

        if (
            await searchBox.isVisible().catch(
                () => false
            )
        ) {

            console.log(
                'Choose User dropdown opened.'
            );

            return;
        }

        // ------------------------------------------------------
        // FALLBACK - TAB TAB ENTER
        // ------------------------------------------------------

        console.log(
            'Choose User did not open with click.'
        );

        console.log(
            'Trying Tab + Tab + Enter...'
        );

        await chooseUser.focus();

        await this.page.keyboard.press(
            'Tab'
        );

        await this.page.waitForTimeout(
            300
        );

        await this.page.keyboard.press(
            'Tab'
        );

        await this.page.waitForTimeout(
            300
        );

        await this.page.keyboard.press(
            'Enter'
        );

        // ------------------------------------------------------
        // FINAL WAIT
        // ------------------------------------------------------

        await expect(
            searchBox
        ).toBeVisible({
            timeout: 15000,
        });

        console.log(
            'Choose User dropdown opened using keyboard.'
        );
    }


    // ==========================================================
    // 3. SEARCH USER
    // ==========================================================

    async searchUser(
        searchText: string
    ): Promise<void> {

        console.log('');
        console.log(
            `Searching user: ${searchText}`
        );

        const searchBox =
            this.page.getByRole(
                'textbox',
                {
                    name: 'Search',
                }
            ).last();

        await expect(
            searchBox
        ).toBeVisible({
            timeout: 15000,
        });

        await searchBox.fill(
            searchText
        );

        console.log(
            `Search entered: ${searchText}`
        );

        // ------------------------------------------------------
        // WAIT FOR SEARCH RESULTS
        // ------------------------------------------------------

        await this.page.waitForTimeout(
            1000
        );
    }


    // ==========================================================
    // 4. SELECT USER
    // ==========================================================

    async selectUser(
        userText: string
    ): Promise<void> {

        console.log('');
        console.log(
            `Selecting user: ${userText}`
        );

        // ------------------------------------------------------
        // IMPORTANT:
        // Search result can be rendered outside Add User dialog.
        // Therefore DO NOT scope the result inside dialog.
        // ------------------------------------------------------

        const option =
            this.page
                .locator('[role="option"]')
                .filter({
                    hasText: userText,
                })
                .last();

        // ------------------------------------------------------
        // IF ROLE=OPTION EXISTS
        // ------------------------------------------------------

        if (
            await option.count() > 0
        ) {

            await expect(
                option
            ).toBeVisible({
                timeout: 15000,
            });

            console.log(
                `User option found: ${userText}`
            );

            await option.scrollIntoViewIfNeeded();

            await option.click();

            console.log(
                `User selected: ${userText}`
            );

            return;
        }

        // ------------------------------------------------------
        // FALLBACK:
        // USE TEXT LOCATOR
        // ------------------------------------------------------

        console.log(
            'Role option not found. Using text locator fallback.'
        );

        const user =
            this.page
                .getByText(
                    userText,
                    {
                        exact: true,
                    }
                )
                .last();

        await expect(
            user
        ).toBeVisible({
            timeout: 15000,
        });

        await user.scrollIntoViewIfNeeded();

        await user.click();

        console.log(
            `User selected using text locator: ${userText}`
        );
    }


    // ==========================================================
    // 5. CLICK DIALOG ADD
    // ==========================================================

    async clickDialogAdd(): Promise<void> {

        console.log('');
        console.log(
            'Clicking Add button in Add User dialog...'
        );

        // ------------------------------------------------------
        // GET CURRENT VISIBLE DIALOG
        // ------------------------------------------------------

        const dialog =
            this.page
                .getByRole(
                    'dialog',
                    {
                        name: 'Add User',
                    }
                )
                .last();

        await expect(
            dialog
        ).toBeVisible({
            timeout: 15000,
        });

        // ------------------------------------------------------
        // GET ADD BUTTON INSIDE CURRENT DIALOG
        // ------------------------------------------------------

        const addButton =
            dialog.getByRole(
                'button',
                {
                    name: 'Add',
                    exact: true,
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

        await addButton.scrollIntoViewIfNeeded();

        // ------------------------------------------------------
        // CLICK ADD
        // ------------------------------------------------------

        await addButton.click();

        console.log(
            'User added successfully.'
        );

        // ------------------------------------------------------
        // IMPORTANT:
        //
        // DO NOT USE:
        //
        // await expect(dialog).toBeHidden()
        //
        // Because the next Add User dialog can open immediately
        // and Playwright may resolve the generic dialog locator
        // to that new dialog.
        // ------------------------------------------------------

        await this.page.waitForTimeout(
            3000
        );

        console.log(
            'Assignment processing completed.'
        );
    }


    // ==========================================================
    // 6. COMPLETE ADD USER FLOW
    // ==========================================================

    async addUser(
        addButtonIndex: number,
        searchText: string,
        userText: string
    ): Promise<void> {

        console.log('');
        console.log(
            '======================================================'
        );

        console.log(
            `ADDING USER: ${userText}`
        );

        console.log(
            '======================================================'
        );

        // ------------------------------------------------------
        // CLICK +ADD
        // ------------------------------------------------------

        await this.clickAddButton(
            addButtonIndex
        );

        // ------------------------------------------------------
        // IMPORTANT UI INITIALIZATION WAIT
        // ------------------------------------------------------

        console.log(
            'Waiting 10 seconds for Choose User control to initialize...'
        );

        await this.page.waitForTimeout(
            10000
        );

        console.log(
            'Choose User initialization wait completed.'
        );

        // ------------------------------------------------------
        // OPEN CHOOSE USER
        // ------------------------------------------------------

        await this.openChooseUser();

        // ------------------------------------------------------
        // SEARCH
        // ------------------------------------------------------

        await this.searchUser(
            searchText
        );

        // ------------------------------------------------------
        // SELECT USER
        // ------------------------------------------------------

        await this.selectUser(
            userText
        );

        // ------------------------------------------------------
        // CLICK ADD
        // ------------------------------------------------------

        await this.clickDialogAdd();

        // ------------------------------------------------------
        // BACKEND WAIT
        // ------------------------------------------------------

        console.log(
            'Waiting for assignment to complete...'
        );

        await this.page.waitForTimeout(
            3000
        );

        console.log(
            `User added successfully: ${userText}`
        );
    }


    // ==========================================================
    // 7. OPEN PROCEEDINGS
    // ==========================================================

    async openProceedings(): Promise<void> {

        console.log('');
        console.log(
            'Opening Proceedings tab...'
        );

        const proceedingsTab =
            this.page.getByRole(
                'tab',
                {
                    name:
                        AssignCaseManagersLocators
                            .proceedingsTab
                            .name,
                }
            );

        await expect(
            proceedingsTab
        ).toBeVisible({
            timeout: 15000,
        });

        await proceedingsTab.click();

        console.log(
            'Proceedings tab opened.'
        );
    }


    // ==========================================================
    // 8. VERIFY ASSIGNMENT MESSAGE
    // ==========================================================

    async verifyAssignmentMessage(
        assignedBy: string,
        assignedUser: string,
        roleName: string
    ): Promise<void> {

        const expectedMessage =
            `${assignedBy} assigned ${assignedUser} as a ${roleName}`;

        console.log('');
        console.log(
            'Verifying assignment message:'
        );

        console.log(
            expectedMessage
        );

        const message =
            this.page.getByText(
                expectedMessage,
                {
                    exact: true,
                }
            ).last();

        await expect(
            message
        ).toBeVisible({
            timeout: 30000,
        });

        await expect(
            message
        ).toHaveText(
            expectedMessage,
            {
                timeout: 10000,
            }
        );

        console.log(
            `Verified assignment message: ${expectedMessage}`
        );
    }
}