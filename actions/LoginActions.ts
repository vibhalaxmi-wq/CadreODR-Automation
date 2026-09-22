import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import {getUnreadMessageIds,waitForNewOTP,} from '../utils/gmail';
// ==========================================================
// LOGIN ACTION
// ==========================================================
export async function loginWithEmail(
    page: Page,
    email: string
): Promise<void> {
    // ==========================================================
    // CREATE LOGIN PAGE OBJECT
    // ==========================================================
    const loginPage = new LoginPage(page);
    // ==========================================================
    // OPEN LOGIN PAGE
    // ==========================================================
    await loginPage.open();
    await loginPage.verifyLoginPage();
    // ==========================================================
    // CAPTURE EXISTING UNREAD EMAILS
    // This is done before clicking Sign In so that we can
    // identify the newly received OTP email.
    // ==========================================================
    const existingMessageIds = await getUnreadMessageIds(email);
    // ==========================================================
    // ENTER EMAIL
    // ==========================================================
    await loginPage.enterEmail(email);
    // ==========================================================
    // CLICK SIGN IN
    // ==========================================================
    await loginPage.clickSignIn();
    // ==========================================================
    // WAIT FOR OTP EMAIL
    // ==========================================================
    await page.waitForTimeout(6000);
    const otp = await waitForNewOTP(
        existingMessageIds,
        60000,
        3000
    );
    // ==========================================================
    // VALIDATE OTP
    // ==========================================================
    if (!/^\d{6}$/.test(otp)) {
        throw new Error(`Invalid OTP received from Gmail: ${otp}. Expected exactly 6 digits.`);
    }
    // ==========================================================
    // ENTER OTP
    // ==========================================================
    await loginPage.enterOTP(otp);
    // ==========================================================
    // CLICK VERIFY
    // ==========================================================
    await loginPage.clickVerify();
    // ==========================================================
    // VERIFY LOGIN SUCCESS
    // ==========================================================
    await loginPage.verifyLoginSuccess();
    // ==========================================================
    // LOGIN COMPLETED
    // ==========================================================
}