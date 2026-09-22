import { test, expect } from '@playwright/test';

// ==========================================================
// ARBITRATION + CONCILIATION CLAIMS
// ==========================================================

import {
    createArbitrationAndConciliationClaims,
} from '../../scenarios/CreateClaim/createArbitrationAndConciliationClaims';

// ==========================================================
// CLAIM WITH ATTACHMENT
// ==========================================================

import {
    createClaimWithAttachment,
} from '../../scenarios/CreateClaim/createClaimWithAttachment';

// ==========================================================
// CLAIM WITHOUT MANDATORY FIELD
// ==========================================================

import {
    claimCreationWithoutMandatoryField,
} from '../../scenarios/CreateClaim/claimCreationWithoutMandatoryFields';


// ==========================================================
// SUITE COUNTERS
// ==========================================================

let passedCount = 0;

let failedCount = 0;

let skippedCount = 0;


// ==========================================================
// CREATE CLAIM SANITY SUITE
// ==========================================================

test.describe(
    'Create Claim Sanity Suite',
    () => {

        // ==================================================
        // RUN ALL SCENARIOS SEQUENTIALLY
        // ==================================================

        test.describe.configure({
            mode: 'serial',
        });

        // ==================================================
        // COMMON TIMEOUT
        // ==================================================

        test.setTimeout(120000);


        // ==================================================
        // SCENARIO 1
        // CREATE ARBITRATION + CONCILIATION CLAIMS
        // ==================================================

        test(
            '01 - Create Arbitration And Conciliation Claims',
            async ({ page }) => {

                console.log('');

                console.log(
                    '======================================================'
                );

                console.log(
                    'SCENARIO 1: CREATE ARBITRATION + CONCILIATION CLAIMS'
                );

                console.log(
                    '======================================================'
                );


                // --------------------------------------------------
                // CREATE ARBITRATION + CONCILIATION CLAIMS
                // --------------------------------------------------

                const result =
                    await createArbitrationAndConciliationClaims(
                        page
                    );


                // --------------------------------------------------
                // VERIFY ARBITRATION CLAIM DISPLAY NAME
                // --------------------------------------------------

                expect(
                    result.arbitrationDisplayName
                ).toMatch(
                    /BSE_UAT.*\d+.*\d{4}/i
                );


                // --------------------------------------------------
                // VERIFY CONCILIATION CLAIM DISPLAY NAME
                // --------------------------------------------------

                expect(
                    result.conciliationDisplayName
                ).toMatch(
                    /BSE_UAT.*\d+.*\d{4}/i
                );


                // --------------------------------------------------
                // VERIFY CLAIMANT EMAIL
                // --------------------------------------------------

                expect(
                    result.claimantEmail
                ).toBe(
                    'vibha.laxmi+claimant@thecadre.in'
                );


                // --------------------------------------------------
                // VERIFY RESPONDENT EMAIL
                // --------------------------------------------------

                expect(
                    result.respondentEmail
                ).toBe(
                    'vibha.laxmi+respondent@thecadre.in'
                );


                // --------------------------------------------------
                // VERIFY ARBITRATOR EMAIL
                // --------------------------------------------------

                expect(
                    result.arbitratorEmail
                ).toBe(
                    'vibha.laxmi+arbitrator@thecadre.in'
                );


                // --------------------------------------------------
                // VERIFY MEDIATOR EMAIL
                // --------------------------------------------------

                expect(
                    result.mediatorEmail
                ).toBe(
                    'vibha.laxmi+mediator@thecadre.in'
                );


                console.log('');

                console.log(
                    'SCENARIO 1 COMPLETED SUCCESSFULLY.'
                );
            }
        );


        // ==================================================
        // SCENARIO 2
        // CREATE CLAIM WITH ATTACHMENT
        // ==================================================

        test(
            '02 - Create Arbitration Claim With Attachment',
            async ({ page }) => {

                console.log('');

                console.log(
                    '======================================================'
                );

                console.log(
                    'SCENARIO 2: CREATE CLAIM WITH ATTACHMENT'
                );

                console.log(
                    '======================================================'
                );


                // --------------------------------------------------
                // CREATE CLAIM WITH ATTACHMENT
                // --------------------------------------------------

                const result =
                    await createClaimWithAttachment(
                        page
                    );


                // --------------------------------------------------
                // VERIFY CLAIM DISPLAY NAME
                // --------------------------------------------------

                expect(
                    result.claimDisplayName
                ).toMatch(
                    /BSE_UAT.*\d+.*\d{4}/i
                );


                // --------------------------------------------------
                // VERIFY CLAIMANT EMAIL
                // --------------------------------------------------

                expect(
                    result.claimantEmail
                ).toBe(
                    'vibha.laxmi+claimant@thecadre.in'
                );


                // --------------------------------------------------
                // VERIFY RESPONDENT EMAIL
                // --------------------------------------------------

                expect(
                    result.respondentEmail
                ).toBe(
                    'vibha.laxmi+respondent@thecadre.in'
                );


                console.log('');

                console.log(
                    'SCENARIO 2 COMPLETED SUCCESSFULLY.'
                );
            }
        );


        // ==================================================
        // SCENARIO 3
        // VERIFY WITHOUT MANDATORY FIELD
        // ==================================================

        test(
            '03 - Verify Log Claim Button Is Disabled Without Mandatory Data',
            async ({ page }) => {

                console.log('');

                console.log(
                    '======================================================'
                );

                console.log(
                    'SCENARIO 3: WITHOUT MANDATORY FIELD'
                );

                console.log(
                    '======================================================'
                );


                // --------------------------------------------------
                // VERIFY LOG CLAIM BUTTON
                // --------------------------------------------------

                await claimCreationWithoutMandatoryField(
                    page
                );


                console.log('');

                console.log(
                    'SCENARIO 3 COMPLETED SUCCESSFULLY.'
                );
            }
        );


        // ==================================================
        // COUNT TEST RESULTS
        // ==================================================

        test.afterEach(
            async ({}, testInfo) => {

                if (
                    testInfo.status === 'passed'
                ) {

                    passedCount++;

                } else if (
                    testInfo.status === 'failed'
                ) {

                    failedCount++;

                } else if (
                    testInfo.status === 'skipped'
                ) {

                    skippedCount++;
                }
            }
        );


        // ==================================================
        // FINAL SUITE SUMMARY
        // ==================================================

        test.afterAll(
            async () => {

                const totalScenarios =
                    passedCount +
                    failedCount +
                    skippedCount;


                console.log('');
                console.log('');
                console.log(
                    '======================================================'
                );

                console.log(
                    '              CREATE CLAIM SUITE SUMMARY'
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
                    '======================================================'
                );


                // --------------------------------------------------
                // SUITE STATUS
                // --------------------------------------------------

                if (
                    failedCount === 0 &&
                    skippedCount === 0
                ) {

                    console.log(
                        'Suite Status    : PASSED'
                    );

                } else if (
                    failedCount > 0
                ) {

                    console.log(
                        'Suite Status    : FAILED'
                    );

                } else {

                    console.log(
                        'Suite Status    : COMPLETED WITH SKIPPED SCENARIOS'
                    );
                }


                console.log(
                    '======================================================'
                );

                console.log('');
            }
        );
    }
);