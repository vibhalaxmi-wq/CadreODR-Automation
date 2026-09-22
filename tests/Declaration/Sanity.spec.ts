import { test } from '@playwright/test';


// ==========================================================
// CREATE CLAIMS
// ==========================================================

import {
    createArbitrationAndConciliationClaims,
} from '../../scenarios/CreateClaim/createArbitrationAndConciliationClaims';


// ==========================================================
// DECLARATIONS
// ==========================================================

import {
    claimantDeclaration,
} from '../../scenarios/Declaration/claimantDeclaration';

import {
    respondentDeclaration,
} from '../../scenarios/Declaration/respondentDeclaration';

import {
    arbitratorDeclaration,
} from '../../scenarios/Declaration/arbitratorDeclaration';

import {
    conciliatorDeclaration,
} from '../../scenarios/Declaration/conciliatorDeclaration';


// ==========================================================
// SEND REPORT
// ==========================================================

import {
    sendReport,
} from '../../utils/sendReport';


// ==========================================================
// CREATED CLAIM DATA
// ==========================================================

let arbitrationDisplayName = '';

let conciliationDisplayName = '';

let claimantEmail = '';

let respondentEmail = '';

let arbitratorEmail = '';

let conciliatorEmail = '';


// ==========================================================
// SUITE SUMMARY COUNTERS
// ==========================================================

let passedCount = 0;

let failedCount = 0;

let skippedCount = 0;


// ==========================================================
// DECLARATION SUITE
// ==========================================================

test.describe(
    'Declaration Suite',
    () => {

        // ==================================================
        // RUN TESTS SEQUENTIALLY
        // ==================================================

        test.describe.configure({
            mode: 'serial',
        });


        // ==================================================
        // SUITE TIMEOUT
        // ==================================================

        test.setTimeout(
            600000
        );


        // ==================================================
        // 01 - CREATE CLAIMS
        // ==================================================

        test(
            '01 - Create Arbitration And Conciliation Claims',
            async ({ page }) => {

                const result =
                    await createArbitrationAndConciliationClaims(
                        page
                    );


                // ==================================================
                // SAVE CLAIM DISPLAY NAMES
                // ==================================================

                arbitrationDisplayName =
                    result.arbitrationDisplayName;

                conciliationDisplayName =
                    result.conciliationDisplayName;


                // ==================================================
                // SAVE USER EMAILS
                // ==================================================

                claimantEmail =
                    result.claimantEmail;

                respondentEmail =
                    result.respondentEmail;

                arbitratorEmail =
                    result.arbitratorEmail;

                conciliatorEmail =
                    result.mediatorEmail;


                // ==================================================
                // LOG SAVED DATA
                // ==================================================

                console.log('');

                console.log(
                    '======================================================'
                );

                console.log(
                    'CREATED CLAIM DATA SAVED'
                );

                console.log(
                    '======================================================'
                );

                console.log(
                    `Arbitration Claim : ${arbitrationDisplayName}`
                );

                console.log(
                    `Conciliation Claim: ${conciliationDisplayName}`
                );

                console.log(
                    `Claimant Email     : ${claimantEmail}`
                );

                console.log(
                    `Respondent Email   : ${respondentEmail}`
                );

                console.log(
                    `Arbitrator Email   : ${arbitratorEmail}`
                );

                console.log(
                    `Conciliator Email  : ${conciliatorEmail}`
                );

                console.log(
                    '======================================================'
                );
            }
        );


        // ==================================================
        // 02 - ARBITRATOR
        // ==================================================

        test(
            '02 - Arbitrator Declaration',
            async ({ page }) => {

                await arbitratorDeclaration(
                    page,
                    arbitratorEmail,
                    arbitrationDisplayName
                );
            }
        );


        // ==================================================
        // 03 - CONCILIATOR
        // ==================================================

        test(
            '03 - Conciliator Declaration',
            async ({ page }) => {

                await conciliatorDeclaration(
                    page,
                    conciliatorEmail,
                    conciliationDisplayName
                );
            }
        );


        // ==================================================
        // 04 - CLAIMANT
        // ==================================================

        test(
            '04 - Claimant Declaration',
            async ({ page }) => {

                await claimantDeclaration(
                    page,
                    claimantEmail,
                    arbitrationDisplayName
                );
            }
        );


        // ==================================================
        // 05 - RESPONDENT
        // ==================================================

        test(
            '05 - Respondent Declaration',
            async ({ page }) => {

                await respondentDeclaration(
                    page,
                    respondentEmail,
                    arbitrationDisplayName
                );
            }
        );


        // ==================================================
        // COUNT TEST RESULTS
        // ==================================================

        test.afterEach(
            async ({}, testInfo) => {

                console.log('');

                console.log(
                    `Scenario: ${testInfo.title}`
                );

                console.log(
                    `Status  : ${testInfo.status}`
                );


                // ==================================================
                // PASSED
                // ==================================================

                if (
                    testInfo.status === 'passed'
                ) {

                    passedCount++;

                }

                // ==================================================
                // FAILED
                // ==================================================

                else if (
                    testInfo.status === 'failed'
                ) {

                    failedCount++;

                }

                // ==================================================
                // SKIPPED
                // ==================================================

                else if (
                    testInfo.status === 'skipped'
                ) {

                    skippedCount++;
                }
            }
        );


        // ==================================================
        // FINAL SUITE SUMMARY + EMAIL
        // ==================================================

        test.afterAll(
            async () => {

                // ==================================================
                // CALCULATE TOTAL
                // ==================================================

                const totalScenarios =
                    passedCount +
                    failedCount +
                    skippedCount;


                // ==================================================
                // DETERMINE OVERALL STATUS
                // ==================================================

                const overallStatus =
                    failedCount === 0 &&
                    skippedCount === 0
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
                    '              DECLARATION SUITE SUMMARY'
                );

                console.log(
                    '======================================================'
                );

                console.log(
                    `Total Scenarios : ${totalScenarios}`
                );

                console.log(
                    `Passed          : ${passedCount}`
                );

                console.log(
                    `Failed          : ${failedCount}`
                );

                console.log(
                    `Skipped         : ${skippedCount}`
                );

                console.log(
                    `Suite Status    : ${overallStatus}`
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

                            totalScenarios,

                        passedScenarios:

                            passedCount,

                        failedScenarios:

                            failedCount,

                        skippedScenarios:

                            skippedCount,
                    });

                } catch (
                    error
                ) {

                    // ==================================================
                    // REPORT EMAIL FAILURE
                    // ==================================================

                    console.error('');

                    console.error(
                        '======================================================'
                    );

                    console.error(
                        'FAILED TO SEND DECLARATION SUITE REPORT'
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