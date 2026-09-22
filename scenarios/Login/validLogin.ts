import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginWithEmail } from '../../actions/LoginActions';
import { urls } from '../../config/urls';
// ==========================================================
// VALID LOGIN
// ==========================================================
export async function validLogin(
    page: Page,
    email: string
): Promise<void> {
    // ======================================================
    // VALIDATE EMAIL
    // ======================================================
    if (!email) {
        throw new Error('Login email was not provided to validLogin().');
    }
    console.log('');
    console.log('======================================================');
    console.log('STARTING VALID LOGIN');

    console.log(
        '======================================================'
    );

    console.log(
        `Login Email: ${email}`
    );


    // ======================================================
    // LOGIN
    // ======================================================

    const loginPage =
        new LoginPage(page);


    await loginWithEmail(
        page,
        email
    );


    // ======================================================
    // OPEN CLAIMS PAGE
    // ======================================================

    await page.goto(
        urls.claims,
        {
            waitUntil: 'domcontentloaded',
            timeout: 30000,
        }
    );


    await page.waitForLoadState(
        'domcontentloaded'
    );


    // ======================================================
    // OPEN MENU
    // ======================================================

    await loginPage.openMenu();


    console.log('');

    console.log(
        `Login successful for: ${email}`
    );

    console.log(
        '======================================================'
    );
}