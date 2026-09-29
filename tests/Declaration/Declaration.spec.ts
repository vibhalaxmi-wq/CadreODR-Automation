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
        // SEQUENTIAL EXECUTION
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
        // 01 - CREATE BOTH CLAIMS
        // ==================================================

        test(
            '01 - Create Arbitration And Conciliation Claims',
            async ({ page }) => {

                console.log('');

                console.log(
                    '======================================================'
                );

                console.log(
                    '01 - CREATE ARBITRATION + CONCILIATION'
                );

                console.log(
                    '======================================================'
                );


                // ==================================================
                // THIS SINGLE SCENARIO MUST:
                //
                // LOGIN
                // CREATE ARBITRATION
                // CREATE CONCILIATION
                // LOGOUT
                // RETURN DATA
                // ==================================================

                const result =
                    await createArbitrationAndConciliationClaims(
                        page
                    );


                // ==================================================
                // SAVE ARBITRATION CLAIM
                // ==================================================

                arbitrationDisplayName =
                    result.arbitrationDisplayName;


                // ==================================================
                // SAVE CONCILIATION CLAIM
                // ==================================================

                conciliationDisplayName =
                    result.conciliationDisplayName;


                // ==================================================
                // SAVE CLAIMANT
                // ==================================================

                claimantEmail =
                    result.claimantEmail;


                // ==================================================
                // SAVE RESPONDENT
                // ==================================================

                respondentEmail =
                    result.respondentEmail;


                // ==================================================
                // SAVE ARBITRATOR
                // ==================================================

                arbitratorEmail =
                    result.arbitratorEmail;


                // ==================================================
                // SAVE CONCILIATOR
                // ==================================================

                conciliatorEmail =
                    result.mediatorEmail;


                // ==================================================
                // VALIDATE DATA
                // ==================================================

                if (!arbitrationDisplayName) {

                    throw new Error(
                        'Arbitration claim display name was not returned.'
                    );
                }


                if (!conciliationDisplayName) {

                    throw new Error(
                        'Conciliation claim display name was not returned.'
                    );
                }


                if (!claimantEmail) {

                    throw new Error(
                        'Claimant email was not returned.'
                    );
                }


                if (!respondentEmail) {

                    throw new Error(
                        'Respondent email was not returned.'
                    );
                }


                if (!arbitratorEmail) {

                    throw new Error(
                        'Arbitrator email was not returned.'
                    );
                }


                if (!conciliatorEmail) {

                    throw new Error(
                        'Conciliator email was not returned.'
                    );
                }


                // ==================================================
                // PRINT DATA
                // ==================================================

                console.log('');

                console.log(
                    '======================================================'
                );

                console.log(
                    'CLAIM DATA SAVED FOR DECLARATIONS'
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
        // 02 - ARBITRATOR DECLARATION
        // ==================================================

        test(
            '02 - Arbitrator Declaration',
            async ({ page }) => {

                if (
                    !arbitratorEmail ||
                    !arbitrationDisplayName
                ) {

                    throw new Error(
                        'Arbitrator declaration data is missing.'
                    );
                }


                await arbitratorDeclaration(
                    page,
                    arbitratorEmail,
                    arbitrationDisplayName
                );
            }
        );


        // ==================================================
        // 03 - CONCILIATOR DECLARATION
        // ==================================================

        test(
            '03 - Conciliator Declaration',
            async ({ page }) => {

                if (
                    !conciliatorEmail ||
                    !conciliationDisplayName
                ) {

                    throw new Error(
                        'Conciliator declaration data is missing.'
                    );
                }


                await conciliatorDeclaration(
                    page,
                    conciliatorEmail,
                    conciliationDisplayName
                );
            }
        );


        // ==================================================
        // 04 - CLAIMANT DECLARATION
        // ==================================================

        test(
            '04 - Claimant Declaration',
            async ({ page }) => {

                if (
                    !claimantEmail ||
                    !arbitrationDisplayName
                ) {

                    throw new Error(
                        'Claimant declaration data is missing.'
                    );
                }


                await claimantDeclaration(
                    page,
                    claimantEmail,
                    arbitrationDisplayName
                );
            }
        );


        // ==================================================
        // 05 - RESPONDENT DECLARATION
        // ==================================================

        test(
            '05 - Respondent Declaration',
            async ({ page }) => {

                if (
                    !respondentEmail ||
                    !arbitrationDisplayName
                ) {

                    throw new Error(
                        'Respondent declaration data is missing.'
                    );
                }


                await respondentDeclaration(
                    page,
                    respondentEmail,
                    arbitrationDisplayName
                );
            }
        );


        // ==================================================
        // AFTER EACH
        // ==================================================

        test.afterEach(
            async ({}, testInfo) => {

                console.log('');

                console.log(
                    '------------------------------------------------------'
                );

                console.log(
                    `Scenario: ${testInfo.title}`
                );

                console.log(
                    `Status  : ${testInfo.status}`
                );

                console.log(
                    '------------------------------------------------------'
                );


                if (
                    testInfo.status === 'passed'
                ) {

                    passedCount++;

                }

                else if (
                    testInfo.status === 'failed'
                ) {

                    failedCount++;

                }

                else if (
                    testInfo.status === 'skipped'
                ) {

                    skippedCount++;
                }
            }
        );


        // ==================================================
        // AFTER ALL
        // ==================================================

        test.afterAll(
            async () => {

                const totalScenarios =
                    passedCount +
                    failedCount +
                    skippedCount;


                const overallStatus =
                    failedCount === 0 &&
                    skippedCount === 0
                        ? 'PASSED'
                        : 'FAILED';


                console.log('');

                console.log(
                    '======================================================'
                );

                console.log(
                    'DECLARATION SUITE SUMMARY'
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


                // ==================================================
                // EMAIL REPORT
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

                } catch (error) {

                    console.error('');

                    console.error(
                        'Failed to send Declaration Suite report.'
                    );

                    console.error(error);
                }
            }
        );
    }
);