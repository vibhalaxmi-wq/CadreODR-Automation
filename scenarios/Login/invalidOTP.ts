import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../testData/loginData';
// ==========================================================
// INVALID OTP VALIDATION
// ==========================================================
export async function invalidOTP(
    page: Page
): Promise<void> {
    const loginPage = new LoginPage(page);
    // ==========================================================
    // OPEN LOGIN PAGE
    // ==========================================================
    await loginPage.open();
    // ==========================================================
    // VERIFY LOGIN PAGE
    // ==========================================================
    await loginPage.verifyLoginPage();
    // ==========================================================
    // ENTER EMAIL
    // ==========================================================
    await loginPage.enterEmail(loginData.validUser.email);
    // ==========================================================
    // CLICK SIGN IN
    // ==========================================================
    await loginPage.clickSignIn();
    // ==========================================================
    // ENTER INVALID OTP
    // ==========================================================
    await loginPage.enterOTP('123456');
    // ==========================================================
    // CLICK VERIFY
    // ==========================================================
    await loginPage.clickVerify();
    // ==========================================================
    // VERIFY INVALID OTP MESSAGE
    // ==========================================================
    await loginPage.verifyInvalidOTPMessage();
    // ==========================================================
    // CLICK EDIT
    // ==========================================================
    await loginPage.clickEdit();
    // ==========================================================
    // VERIFY LOGIN PAGE
    // ==========================================================
    await loginPage.verifyLoginPage();
}