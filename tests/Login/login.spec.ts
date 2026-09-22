import { test } from '@playwright/test';

import { validLogin } from '../../scenarios/Login/validLogin';

import { invalidEmail } from '../../scenarios/Login/invalidEmail';

import { invalidOTP } from '../../scenarios/Login/invalidOTP';

import { maxLogin } from '../../scenarios/Login/maxLogin';

import { loginData } from '../../testData/loginData';

import { sendReport } from '../../utils/sendReport';


// ==========================================================
// LOGIN SUITE COUNTERS
// ==========================================================

let totalTestCases = 0;

let passedTestCases = 0;

let failedTestCases = 0;

let skippedTestCases = 0;


// ==========================================================
// LOGIN SUITE
// ==========================================================

test.describe(
    'Login Sanity Suite',
    () => {

        // ==================================================
        // RUN TEST CASES SEQUENTIALLY
        // ==================================================

        test.describe.configure({
            mode: 'serial',
        });


        // ==================================================
        // TEST TIMEOUT
        // ==================================================

        test.setTimeout(
            120000
        );


        // ==================================================
        // TEST 1 - VALID EMAIL
        // ==================================================

        test(
            'Valid Email Login',
            async ({ page }) => {

                await validLogin(
                    page,
                    loginData.validUser.email
                );
            }
        );


        // ==================================================
        // TEST 2 - INVALID EMAIL
        // ==================================================

        test(
            'Invalid Email Validation',
            async ({ page }) => {

                await invalidEmail(
                    page
                );
            }
        );


        // ==================================================
        // TEST 3 - INVALID OTP
        // ==================================================

        test(
            'Invalid OTP Validation',
            async ({ page }) => {

                await invalidOTP(
                    page
                );
            }
        );


        // ==================================================
        // TEST 4 - MAXIMUM LOGIN LIMIT
        // ==================================================

        test(
            'Maximum Login Limit Validation',
            async ({ page }) => {

                await maxLogin(
                    page
                );
            }
        );


        // ==================================================
        // COUNT TEST RESULTS
        // ==================================================

        test.afterEach(
            async ({}, testInfo) => {

                totalTestCases++;


                // ==================================================
                // PASSED
                // ==================================================

                if (
                    testInfo.status === 'passed'
                ) {

                    passedTestCases++;

                }


                // ==================================================
                // FAILED
                // ==================================================

                else if (
                    testInfo.status === 'failed'
                ) {

                    failedTestCases++;

                }


                // ==================================================
                // SKIPPED
                // ==================================================

                else if (
                    testInfo.status === 'skipped'
                ) {

                    skippedTestCases++;

                }


                // ==================================================
                // OTHER STATUS
                // ==================================================

                else {

                    failedTestCases++;

                }
            }
        );


        // ==================================================
        // SUITE SUMMARY
        // ==================================================

        test.afterAll(
            async () => {

                // ==================================================
                // DETERMINE OVERALL STATUS
                // ==================================================

                const overallStatus =
                    failedTestCases === 0 &&
                    skippedTestCases === 0
                        ? 'PASSED'
                        : 'FAILED';


                // ==================================================
                // PRINT SUMMARY
                // ==================================================

                console.log('');

                console.log(
                    '======================================================'
                );

                console.log(
                    '                 LOGIN SUITE SUMMARY'
                );

                console.log(
                    '======================================================'
                );

                console.log(
                    `Overall Status   : ${overallStatus}`
                );

                console.log(
                    `Total Test Cases : ${totalTestCases}`
                );

                console.log(
                    `Passed           : ${passedTestCases}`
                );

                console.log(
                    `Failed           : ${failedTestCases}`
                );

                console.log(
                    `Skipped          : ${skippedTestCases}`
                );

                console.log(
                    '======================================================'
                );

                console.log('');


                // ==================================================
                // SEND EMAIL REPORT
                // ==================================================

                try {

                    await sendReport({

                        totalScenarios:
                            totalTestCases,

                        passedScenarios:
                            passedTestCases,

                        failedScenarios:
                            failedTestCases,

                        skippedScenarios:
                            skippedTestCases,
                    });


                    console.log(
                        'Login Suite report email sent successfully.'
                    );

                } catch (
                    error
                ) {

                    console.error('');

                    console.error(
                        '======================================================'
                    );

                    console.error(
                        'FAILED TO SEND LOGIN SUITE REPORT'
                    );

                    console.error(
                        '======================================================'
                    );

                    console.error(
                        error
                    );

                    console.error(
                        '======================================================'
                    );
                }
            }
        );
    }
);