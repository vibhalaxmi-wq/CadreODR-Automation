import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../testData/loginData';
// ==========================================================
// MAXIMUM LOGIN LIMIT VALIDATION
// ==========================================================
export async function maxLogin(
    page: Page
): Promise<void> {
    const loginPage = new LoginPage(page);
    const email =loginData.validUser.email;
    const maxAttempts =loginData.maximumLogin.maxAttempts;
    // ==========================================================
    // OPEN LOGIN PAGE
    // ==========================================================
    await loginPage.open();
    await loginPage.waitForEmailLoginPage();
    // ==========================================================
    // REPEAT LOGIN ATTEMPTS
    // ==========================================================
    for (let attempt = 1;attempt <= maxAttempts;attempt++) {
        // ------------------------------------------------------
        // MAKE SURE EMAIL LOGIN PAGE IS READY
        // ------------------------------------------------------
        await loginPage.waitForEmailLoginPage();
        // ------------------------------------------------------
        // ENTER EMAIL
        //
        // This enables the Sign In button.
        // ------------------------------------------------------
        await loginPage.enterEmail(email);
        // ------------------------------------------------------
        // CLICK SIGN IN
        // ------------------------------------------------------
        await loginPage.clickSignIn();
        // ------------------------------------------------------
        // CHECK MAXIMUM LOGIN MESSAGE
        // ------------------------------------------------------
        if (await loginPage.isMaximumLoginMessageVisible()) {
            await loginPage.verifyMaximumLoginMessage();
            return;
        }
        // ------------------------------------------------------
        // CHECK WHETHER OTP PAGE WAS DISPLAYED
        // ------------------------------------------------------
        const otpPageDisplayed =await loginPage.isOTPPageVisible();
        // ------------------------------------------------------
        // OTP PAGE
        // ------------------------------------------------------
        if (otpPageDisplayed) {
            await loginPage.returnToEmailLogin();
            continue;
        }
        // ------------------------------------------------------
        // CHECK MAXIMUM LOGIN MESSAGE AGAIN
        // ------------------------------------------------------
        if (await loginPage.isMaximumLoginMessageVisible()) {
            await loginPage.verifyMaximumLoginMessage();
            return;
        }
        // ------------------------------------------------------
        // UNEXPECTED APPLICATION STATE
        // ------------------------------------------------------
        throw new Error(`Unexpected application state after login attempt ${attempt}.`);
    }
    // ==========================================================
    // MAXIMUM LIMIT NOT REACHED
    // ==========================================================
    throw new Error(`Maximum login limit message was not displayed after ${maxAttempts} attempts.`);
}