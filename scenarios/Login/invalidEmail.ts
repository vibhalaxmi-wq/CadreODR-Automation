import { expect, Page } from '@playwright/test';
import { urls } from '../../config/urls';
// ==========================================================
// INVALID EMAIL VALIDATION
// ==========================================================
export async function invalidEmail(
    page: Page
): Promise<void> {
    // ==========================================================
    // STEP 1: OPEN LOGIN PAGE
    // ==========================================================
    await page.goto(urls.login, {waitUntil: 'domcontentloaded',timeout: 30000,});
    // ==========================================================
    // STEP 2: ENTER INVALID EMAIL
    // ==========================================================
    const emailTextbox = page.getByRole('textbox',{name: 'Sign-in using your email',});
    await expect(emailTextbox).toBeVisible({timeout: 10000,});
    await emailTextbox.fill('vibha.yop.com');
    // ==========================================================
    // WAIT FOR VALIDATION
    // ==========================================================
    await page.waitForTimeout(2000);
    // ==========================================================
    // STEP 3: VERIFY ERROR MESSAGE
    // ==========================================================
    const errorMessage = page.getByText('Please enter a valid email address',{exact: true,});
    await expect(errorMessage).toBeVisible({timeout: 10000,});
    // ==========================================================
    // STEP 4: PRINT RESULT
    // ==========================================================
    const actualErrorMessage =await errorMessage.innerText();
    console.log(`Invalid email validation message: ${actualErrorMessage}`);
    // ==========================================================
    // SCENARIO COMPLETED
    // ==========================================================
}