import { Page } from '@playwright/test';
import { LogoutPage } from '../pages/LogoutPage';
export async function logout(
    page: Page
): Promise<void> {
    const logoutPage =new LogoutPage(page);
    console.log('');
    console.log('======================================================');
    console.log('Starting logout...');
    console.log('======================================================');
    // ==========================================================
    // WAIT FOR OPEN DIALOGS
    // ==========================================================
    console.log('Checking for open dialogs...');
    await logoutPage.waitForDialogsToClose();
    // ==========================================================
    // OPEN USER MENU
    // ==========================================================
    console.log('Opening user menu...');
    await logoutPage.openUserMenu();
    // ==========================================================
    // CLICK SIGNOUT
    // ==========================================================
    console.log('Clicking Signout...');
    await logoutPage.clickSignout();

    // ==========================================================
    // CONFIRM SIGNOUT
    // ==========================================================
    console.log('Confirming Signout...');
    await logoutPage.confirmSignout();
    // ==========================================================
    // VERIFY LOGIN PAGE
    // ==========================================================
    console.log('Verifying login page...');
    await logoutPage.verifyLoginPage();
    console.log('Logout completed successfully.');
    console.log('======================================================');
}