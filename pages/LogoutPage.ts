import { expect, Page } from '@playwright/test';

import { LogoutLocators } from '../locators/LogoutLocators';

export class LogoutPage {

    readonly page: Page;

    // ==========================================================
    // CONSTRUCTOR
    // ==========================================================

    constructor(page: Page) {
        this.page = page;
    }

    // ==========================================================
    // WAIT FOR OPEN DIALOGS TO CLOSE
    // ==========================================================

    async waitForDialogsToClose(): Promise<void> {

        const addUserDialog = this.page.getByRole(
            'dialog',
            {
                name: 'Add User',
            }
        );

        if (
            await addUserDialog
                .isVisible()
                .catch(() => false)
        ) {

            await expect(
                addUserDialog
            ).toBeHidden({
                timeout: 15000,
            });
        }
    }

    // ==========================================================
    // OPEN USER MENU
    // ==========================================================

    async openUserMenu(): Promise<void> {

        // ------------------------------------------------------
        // Make sure no Add User dialog is still open
        // ------------------------------------------------------

        await this.waitForDialogsToClose();

        // ------------------------------------------------------
        // Find user menu
        // ------------------------------------------------------

        const userMenuImage =
            this.page.getByRole(
                LogoutLocators.userMenuImage.role as 'img'
            ).nth(
                LogoutLocators.userMenuImage.index
            );

        await expect(
            userMenuImage
        ).toBeVisible({
            timeout: 15000,
        });

        await userMenuImage.click();
    }

    // ==========================================================
    // CLICK SIGNOUT
    // ==========================================================

    async clickSignout(): Promise<void> {

        const signoutButton =
            this.page.getByRole(
                LogoutLocators.signoutButton.role as 'button',
                {
                    name: LogoutLocators.signoutButton.name,
                    exact: LogoutLocators.signoutButton.exact,
                }
            );

        await expect(
            signoutButton
        ).toBeVisible({
            timeout: 10000,
        });

        await expect(
            signoutButton
        ).toBeEnabled({
            timeout: 10000,
        });

        await signoutButton.click();
    }

    // ==========================================================
    // CONFIRM SIGNOUT
    // ==========================================================

    async confirmSignout(): Promise<void> {

        const confirmSignoutButton =
            this.page.getByRole(
                LogoutLocators.confirmSignoutButton.role as 'button',
                {
                    name:
                        LogoutLocators.confirmSignoutButton.name,

                    exact:
                        LogoutLocators.confirmSignoutButton.exact,
                }
            );

        await expect(
            confirmSignoutButton
        ).toBeVisible({
            timeout: 10000,
        });

        await expect(
            confirmSignoutButton
        ).toBeEnabled({
            timeout: 10000,
        });

        await confirmSignoutButton.click();
    }

    // ==========================================================
    // VERIFY LOGIN PAGE
    // ==========================================================

    async verifyLoginPage(): Promise<void> {

        const loginEmailTextbox =
            this.page.getByRole(
                LogoutLocators.loginEmailTextbox.role as 'textbox',
                {
                    name:
                        LogoutLocators.loginEmailTextbox.name,
                }
            );

        await expect(
            loginEmailTextbox
        ).toBeVisible({
            timeout: 15000,
        });
    }
}