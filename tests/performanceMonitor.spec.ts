import { test, chromium, Page } from '@playwright/test';

import {
    getUnreadMessageIds,
    waitForNewOTP
} from '../utils/gmail';


// ============================================================
// CONFIGURATION
// ============================================================

const LOGIN_URL = 'https://cadreodr.com/login';

const CLAIMS_URL =
    'https://cadreodr.com/u/claims?showTestClaims=true';

const EMAIL =
    'vibha.laxmi+odradmin@thecadre.in';

// Hardcoded claim
const CLAIM_NAME =
    'Claim #BSE_UAT//12999//';

// Run again after 5 minutes
const FIVE_MINUTES =
    5 * 60 * 1000;

// Send report after every 1 hour
const ONE_HOUR =
    60 * 60 * 1000;


// ============================================================
// PERFORMANCE RESULT
// ============================================================

interface PerformanceResult {

    timestamp: string;

    loginTime: number;

    claimTime: number;

    proceedingsTime: number;
}


// ============================================================
// STORE RESULTS
// ============================================================

const results: PerformanceResult[] = [];


// ============================================================
// WAIT FUNCTION
// ============================================================

function wait(ms: number): Promise<void> {

    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });

}


// ============================================================
// LOGIN + OTP
// ============================================================

async function login(page: Page): Promise<number> {

    console.log('');
    console.log('Starting login...');

    // --------------------------------------------------------
    // Start measuring login time
    // --------------------------------------------------------

    const startTime = Date.now();

    // --------------------------------------------------------
    // Open login page
    // --------------------------------------------------------

    await page.goto(LOGIN_URL, {
        waitUntil: 'domcontentloaded'
    });

    // --------------------------------------------------------
    // Enter email
    // --------------------------------------------------------

    await page
        .getByRole('textbox', {
            name: 'Sign-in using your email'
        })
        .fill(EMAIL);

    // --------------------------------------------------------
    // IMPORTANT:
    // Capture existing unread messages BEFORE requesting OTP.
    // This prevents an old OTP from being used.
    // --------------------------------------------------------

    const existingMessageIds =
        await getUnreadMessageIds(EMAIL);

    // --------------------------------------------------------
    // Click Sign In
    // --------------------------------------------------------

    await page
        .getByRole('button', {
            name: 'Sign in using your email'
        })
        .click();

    console.log('Waiting for OTP...');

    // --------------------------------------------------------
    // Wait for NEW OTP from Gmail
    // --------------------------------------------------------

    const otp =
        await waitForNewOTP(
            existingMessageIds,
            60000,
            3000
        );

    console.log(`OTP received: ${otp}`);

    // --------------------------------------------------------
    // Enter OTP
    // --------------------------------------------------------

    const otpDigits = otp.split('');

    for (let i = 0; i < otpDigits.length; i++) {

        const textbox =
            page.getByRole('textbox', {
                name: `Digit ${i + 1} of`
            });

        await textbox.fill(otpDigits[i]);
    }

    // --------------------------------------------------------
    // Verify OTP
    // --------------------------------------------------------

    await page
        .getByRole('button', {
            name: 'Verify'
        })
        .click();

    // --------------------------------------------------------
    // Open Claims page
    // --------------------------------------------------------

    await page.goto(CLAIMS_URL, {
        waitUntil: 'domcontentloaded'
    });

    // --------------------------------------------------------
    // Wait for Claims page to be available
    // --------------------------------------------------------

    await page
        .getByRole('img')
        .nth(4)
        .waitFor({
            state: 'visible'
        });

    // --------------------------------------------------------
    // Calculate loading time
    // --------------------------------------------------------

    const endTime = Date.now();

    const loadingTime =
        (endTime - startTime) / 1000;

    console.log(
        `Login + Claims loading time: ${loadingTime.toFixed(2)} seconds`
    );

    return loadingTime;
}


// ============================================================
// OPEN CLAIM
// ============================================================

async function openClaim(page: Page): Promise<{
    page1: Page;
    loadingTime: number;
}> {

    console.log('');
    console.log('Opening claim...');

    const startTime = Date.now();

    // --------------------------------------------------------
    // SWITCH TO LIST VIEW
    // --------------------------------------------------------

    console.log('Switching to List View...');

    await page
        .getByRole('img')
        .nth(4)
        .click();

    // --------------------------------------------------------
    // Wait for List View to load
    // --------------------------------------------------------

    await page
        .getByText(CLAIM_NAME)
        .waitFor({
            state: 'visible'
        });

    console.log('List View loaded.');

    // --------------------------------------------------------
    // Wait for popup
    // --------------------------------------------------------

    const page1Promise =
        page.waitForEvent('popup');

    // --------------------------------------------------------
    // Click hardcoded claim
    //
    // IMPORTANT:
    // The claim opens directly on the Details page.
    // Do NOT click the Details tab after this.
    // --------------------------------------------------------

    await page
        .getByText(CLAIM_NAME)
        .click();

    // --------------------------------------------------------
    // Get popup page
    // --------------------------------------------------------

    const page1 =
        await page1Promise;

    // --------------------------------------------------------
    // Wait until claim Details content is available
    //
    // The claim opens directly on Details.
    // Therefore, we only wait for the content.
    // We do NOT click the Details tab.
    // --------------------------------------------------------

    await page1
        .getByText('Dispute Type')
        .waitFor({
            state: 'visible'
        });

    const endTime = Date.now();

    const loadingTime =
        (endTime - startTime) / 1000;

    console.log(
        `Claim loading time: ${loadingTime.toFixed(2)} seconds`
    );

    return {
        page1,
        loadingTime
    };
}


// ============================================================
// PROCEEDINGS TAB
// ============================================================

async function openProceedings(
    page1: Page
): Promise<number> {

    console.log('');
    console.log('Opening Proceedings tab...');

    const startTime = Date.now();

    // --------------------------------------------------------
    // Click Proceedings
    // --------------------------------------------------------

    await page1
        .getByRole('tab', {
            name: 'Proceedings',
            exact: true
        })
        .click();

    // --------------------------------------------------------
    // Wait for Proceedings content
    // --------------------------------------------------------

    await page1
        .locator('div')
        .filter({
            hasText: /^Respond$/
        })
        .waitFor({
            state: 'visible'
        });

    const endTime = Date.now();

    const loadingTime =
        (endTime - startTime) / 1000;

    console.log(
        `Proceedings loading time: ${loadingTime.toFixed(2)} seconds`
    );

    return loadingTime;
}


// ============================================================
// RUN ONE COMPLETE EXECUTION
// ============================================================

async function runPerformanceTest():
    Promise<PerformanceResult> {

    console.log('');
    console.log('');
    console.log('============================================');

    console.log(
        'Starting new performance test'
    );

    console.log(
        new Date().toLocaleString()
    );

    console.log('============================================');

    // --------------------------------------------------------
    // Launch browser
    // --------------------------------------------------------

    const browser =
        await chromium.launch({
            headless: false
        });

    const context =
        await browser.newContext();

    const page =
        await context.newPage();

    try {

        // ====================================================
        // 1. LOGIN
        // ====================================================

        const loginTime =
            await login(page);


        // ====================================================
        // 2. OPEN CLAIM
        // ====================================================

        const claimResult =
            await openClaim(page);

        const page1 =
            claimResult.page1;

        const claimTime =
            claimResult.loadingTime;


        // ====================================================
        // 3. PROCEEDINGS
        // ====================================================

        const proceedingsTime =
            await openProceedings(page1);


        // ====================================================
        // CREATE RESULT
        // ====================================================

        const result: PerformanceResult = {

            timestamp:
                new Date().toLocaleString(),

            loginTime,

            claimTime,

            proceedingsTime
        };


        // ====================================================
        // DISPLAY RESULT
        // ====================================================

        console.log('');
        console.log('============================================');
        console.log('PERFORMANCE RESULT');
        console.log('============================================');

        console.log(
            `Login       : ${loginTime.toFixed(2)} sec`
        );

        console.log(
            `Claim       : ${claimTime.toFixed(2)} sec`
        );

        console.log(
            `Proceedings : ${proceedingsTime.toFixed(2)} sec`
        );

        console.log('============================================');


        return result;

    } finally {

        // ====================================================
        // CLOSE BROWSER
        // ====================================================

        await browser.close();

        console.log('');
        console.log('Browser closed.');
    }
}


// ============================================================
// CREATE HOURLY REPORT
// ============================================================

function createHourlyReport(): string {

    let report = '';

    report +=
        'CADRE ODR PERFORMANCE REPORT\n';

    report +=
        '============================================\n';

    report +=
        `Generated: ${new Date().toLocaleString()}\n\n`;

    report +=
        'Loading Times:\n\n';

    // --------------------------------------------------------
    // Add each execution
    // --------------------------------------------------------

    results.forEach(
        (result, index) => {

            report +=
                `Execution ${index + 1}\n`;

            report +=
                `Time: ${result.timestamp}\n`;

            report +=
                `Login: ${result.loginTime.toFixed(2)} sec\n`;

            report +=
                `Claim: ${result.claimTime.toFixed(2)} sec\n`;

            report +=
                `Proceedings: ${result.proceedingsTime.toFixed(2)} sec\n`;

            report +=
                '--------------------------------------------\n';
        }
    );

    return report;
}


// ============================================================
// SEND HOURLY REPORT
// ============================================================

async function sendHourlyReport() {

    if (results.length === 0) {

        console.log(
            'No performance results available.'
        );

        return;
    }

    const report =
        createHourlyReport();

    console.log('');
    console.log('');
    console.log('============================================');
    console.log('HOURLY PERFORMANCE REPORT');
    console.log('============================================');

    console.log(report);

    console.log('============================================');

    /*
     * IMPORTANT:
     *
     * The report is generated here.
     *
     * Gmail sending can be connected here later.
     */

    // Clear previous results after report
    results.length = 0;
}


// ============================================================
// MAIN MONITORING LOOP
// ============================================================

async function startMonitoring() {

    console.log('');
    console.log('============================================');
    console.log('CADRE ODR PERFORMANCE MONITOR');
    console.log('============================================');

    console.log(
        'Execution: Every 5 minutes'
    );

    console.log(
        'Report: Every 1 hour'
    );

    console.log('============================================');

    let lastReportTime =
        Date.now();


    // --------------------------------------------------------
    // CONTINUOUS LOOP
    // --------------------------------------------------------

    while (true) {

        try {

            // =================================================
            // RUN COMPLETE TEST
            // =================================================

            const result =
                await runPerformanceTest();


            // -------------------------------------------------
            // Save result
            // -------------------------------------------------

            results.push(result);


            // =================================================
            // CHECK ONE-HOUR REPORT
            // =================================================

            const currentTime =
                Date.now();

            if (
                currentTime - lastReportTime
                >= ONE_HOUR
            ) {

                await sendHourlyReport();

                lastReportTime =
                    currentTime;
            }

        } catch (error) {

            console.error('');

            console.error(
                'Performance test failed:'
            );

            console.error(error);
        }


        // ====================================================
        // WAIT 5 MINUTES
        // ====================================================

        console.log('');

        console.log('============================================');

        console.log(
            'Waiting 5 minutes before next execution...'
        );

        console.log('============================================');

        await wait(FIVE_MINUTES);
    }
}


// ============================================================
// START MONITORING
// ============================================================

test(
    'Cadre ODR Performance Monitor',
    async () => {

        test.setTimeout(0);

        await startMonitoring();
    }
);