export const LoginLocators = {
    // ==========================================================
    // LOGIN
    // ==========================================================
    emailTextbox: {
        role: 'textbox',
        name: 'Sign-in using your email',
    },
    signInButton: {
        role: 'button',
        name: 'Sign in using your email',
    },
    otpTextbox: (digit: number) => ({
        role: 'textbox',
        name: `Digit ${digit} of`,
    }),
    verifyButton: {
        role: 'button',
        name: 'Verify',
    },
    // ==========================================================
    // CLAIMS / MENU
    // ==========================================================
    openMenuButton: {
        role: 'button',
        name: 'Open menu',
    },
    // ==========================================================
    // OTP / LOGIN NAVIGATION
    // ==========================================================
    editButton: {
        role: 'img',
        name: 'Edit',
    },
    backButton: {
        role: 'img',
        name: 'Back',
    },
    loginText: {
        name: 'Login',
    },
    // ==========================================================
    // LOGIN VALIDATION
    // ==========================================================
    invalidOtpMessage: {
        text: 'OTP invalid. Please re-enter.',
    },
    maximumLoginMessage: {
        text: /You have reached the maximum/i,
    },
};