import { expect, Page } from '@playwright/test';
import { LoginLocators } from '../locators/LoginLocators';
export class LoginPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    // ==========================================================
    // OPEN LOGIN PAGE
    // ==========================================================
    async open(): Promise<void> {
        await this.page.goto('/login', {waitUntil: 'domcontentloaded',timeout: 30000,});
    }
    // ==========================================================
    // VERIFY LOGIN PAGE
    // ==========================================================
    async verifyLoginPage(): Promise<void> {
        const emailTextbox = this.page.getByRole(LoginLocators.emailTextbox.role as 'textbox',{name: LoginLocators.emailTextbox.name,});
        await expect(emailTextbox).toBeVisible({timeout: 10000,});
    }
    // ==========================================================
    // WAIT FOR EMAIL LOGIN PAGE
    // ==========================================================
    async waitForEmailLoginPage(): Promise<void> {
        const emailTextbox = this.page.getByRole(LoginLocators.emailTextbox.role as 'textbox',{name: LoginLocators.emailTextbox.name,});
        const signInButton = this.page.getByRole(LoginLocators.signInButton.role as 'button',{name: LoginLocators.signInButton.name,});
        await expect(emailTextbox).toBeVisible({timeout: 10000,});
        await expect(signInButton).toBeVisible({timeout: 10000,});
    }
    // ==========================================================
    // ENTER EMAIL
    // ==========================================================
    async enterEmail(email: string): Promise<void> {
        const emailTextbox = this.page.getByRole(LoginLocators.emailTextbox.role as 'textbox',{name: LoginLocators.emailTextbox.name,});
        await expect(emailTextbox).toBeVisible({timeout: 10000,});
        await emailTextbox.fill(email);
        const signInButton = this.page.getByRole(LoginLocators.signInButton.role as 'button',{name: LoginLocators.signInButton.name,});
        await expect(signInButton).toBeEnabled({timeout: 10000,});
    }
    // ==========================================================
    // CLICK SIGN IN
    // ==========================================================
    async clickSignIn(): Promise<void> {
        const signInButton = this.page.getByRole(LoginLocators.signInButton.role as 'button',{name: LoginLocators.signInButton.name,});
        await expect(signInButton).toBeVisible({timeout: 10000,});
        await expect(signInButton).toBeEnabled({timeout: 10000,});
        await signInButton.click();
    }
    // ==========================================================
    // ENTER OTP
    // ==========================================================
    async enterOTP(otp: string): Promise<void> {
        if (!/^\d{6}$/.test(otp)) {
            throw new Error(`Invalid OTP: ${otp}. Expected exactly 6 digits.`);
        }
        for (let i = 0; i < otp.length; i++) {
            const digitNumber = i + 1;
            const digit = otp.charAt(i);
            const otpLocator =LoginLocators.otpTextbox(digitNumber);
            const otpTextbox = this.page.getByRole(otpLocator.role as 'textbox',{name: otpLocator.name,});
            await expect(otpTextbox).toBeVisible({timeout: 10000,});
            await otpTextbox.fill(digit);
        }
    }
    // ==========================================================
    // CLICK VERIFY
    // ==========================================================
    async clickVerify(): Promise<void> {
        const verifyButton = this.page.getByRole(LoginLocators.verifyButton.role as 'button',{name: LoginLocators.verifyButton.name,});
        await expect(verifyButton).toBeVisible({timeout: 10000,});
        await expect(verifyButton).toBeEnabled({timeout: 10000,});
        await verifyButton.click();
    }
    // ==========================================================
    // VERIFY LOGIN SUCCESS
    // ==========================================================
    async verifyLoginSuccess(): Promise<void> {
        await expect(this.page).not.toHaveURL(/\/login\/?$/,{timeout: 15000,});
    }
    // ==========================================================
    // CLICK OPEN MENU
    // ==========================================================
    async openMenu(): Promise<void> {
        const openMenuButton = this.page.getByRole(LoginLocators.openMenuButton.role as 'button',{name: LoginLocators.openMenuButton.name,});
        await expect(openMenuButton).toBeVisible({timeout: 10000,});
        await expect(openMenuButton).toBeEnabled({timeout: 10000,});
        await openMenuButton.click();
    }
    // ==========================================================
    // VERIFY INVALID OTP MESSAGE
    // ==========================================================
    async verifyInvalidOTPMessage(): Promise<void> {
        const message = this.page.getByText(
            LoginLocators.invalidOtpMessage.text,
            {
                exact: true,
            }
        );

        await expect(message).toBeVisible({
            timeout: 10000,
        });
    }

    // ==========================================================
    // CHECK OTP PAGE
    // ==========================================================

    async isOTPPageVisible(): Promise<boolean> {

        const otpTextbox = this.page.getByRole(
            'textbox',
            {
                name: /Digit 1 of/i,
            }
        );

        return await otpTextbox
            .isVisible()
            .catch(() => false);
    }

    // ==========================================================
    // CHECK MAXIMUM LOGIN MESSAGE
    // ==========================================================

    async isMaximumLoginMessageVisible(): Promise<boolean> {

        const message = this.page.getByText(
            LoginLocators.maximumLoginMessage.text
        );

        return await message
            .isVisible()
            .catch(() => false);
    }

    // ==========================================================
    // VERIFY MAXIMUM LOGIN MESSAGE
    // ==========================================================

    async verifyMaximumLoginMessage(): Promise<void> {

        const message = this.page.getByText(
            LoginLocators.maximumLoginMessage.text
        );

        await expect(message).toBeVisible({
            timeout: 10000,
        });
    }

    // ==========================================================
    // RETURN TO EMAIL LOGIN
    // ==========================================================

    async returnToEmailLogin(): Promise<void> {

        const otpTextbox = this.page.getByRole(
            'textbox',
            {
                name: /Digit 1 of/i,
            }
        );

        // ------------------------------------------------------
        // OPTION 1: EDIT BUTTON
        // ------------------------------------------------------

        const editButton = this.page.getByRole(
            LoginLocators.editButton.role as 'img',
            {
                name: LoginLocators.editButton.name,
            }
        );

        if (
            await editButton
                .isVisible()
                .catch(() => false)
        ) {

            await editButton.click();

            await expect(otpTextbox).toBeHidden({
                timeout: 10000,
            });

            await this.waitForEmailLoginPage();

            return;
        }

        // ------------------------------------------------------
        // OPTION 2: BACK BUTTON
        // ------------------------------------------------------

        const backButton = this.page.getByRole(
            LoginLocators.backButton.role as 'img',
            {
                name: LoginLocators.backButton.name,
            }
        );

        if (
            await backButton
                .isVisible()
                .catch(() => false)
        ) {

            await backButton.click();

            await expect(otpTextbox).toBeHidden({
                timeout: 10000,
            });

            await this.waitForEmailLoginPage();

            return;
        }

        // ------------------------------------------------------
        // OPTION 3: LOGIN TEXT
        // ------------------------------------------------------

        const loginText = this.page.getByText(
            LoginLocators.loginText.name,
            {
                exact: true,
            }
        );

        if (
            await loginText
                .isVisible()
                .catch(() => false)
        ) {

            await loginText.click();

            await expect(otpTextbox).toBeHidden({
                timeout: 10000,
            });

            await this.waitForEmailLoginPage();

            return;
        }

        throw new Error(
            'Unable to return from OTP page to the email login page.'
        );
    }

    // ==========================================================
    // CLICK EDIT
    // ==========================================================

    async clickEdit(): Promise<void> {

        const editButton = this.page.getByRole(
            LoginLocators.editButton.role as 'img',
            {
                name: LoginLocators.editButton.name,
            }
        );

        await expect(editButton).toBeVisible({
            timeout: 10000,
        });

        await editButton.click();
    }
}