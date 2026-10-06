import {
    test,
} from '@playwright/test';


// ==========================================================
// CREATE CLAIM
// ==========================================================

import {
    createArbitrationClaimScenario,
} from '../../scenarios/CreateClaim/createArbitrationClaim';


// ==========================================================
// CASE MANAGERS
// ==========================================================

import {
    assignCaseManagersScenario,
} from '../../scenarios/CaseManager/assignCaseManagers';


// ==========================================================
// PARTIES
// ==========================================================

import {
    addPartiesToCurrentClaim,
} from '../../scenarios/Party/addPartiesToClaim';


// ==========================================================
// PROCEEDINGS
// ==========================================================

import {
    respondToProceedings,
} from '../../scenarios/Proceedings/respondToProceedings';


// ==========================================================
// MESSAGE TAGS
// ==========================================================

import {
    messageTagsScenario,
} from '../../scenarios/Proceedings/addMessageTags';


// ==========================================================
// STATUS
// ==========================================================

import {
    statusChange,
} from '../../scenarios/Status/statusChange';


// ==========================================================
// MEETING
// ==========================================================

import {
    scheduleMeetingScenario,
} from '../../scenarios/Meeting/scheduleMeeting';


// ==========================================================
// MORE FILTERS - ORGANIZATION
// ==========================================================

import {
    applyMoreFilter,
} from '../../scenarios/MoreFilters/applyMoreFilter';


// ==========================================================
// MORE FILTERS - DISPLAY NAME
// ==========================================================

import {
    displayNameFilter,
} from '../../scenarios/MoreFilters/displayNameFilter';


// ==========================================================
// LOGOUT
// ==========================================================

import {
    logoutScenario,
} from '../../scenarios/Logout/logout';


// ==========================================================
// REPORT
// ==========================================================

import {
    sendReport,
    ScenarioResult,
} from '../../utils/sendReport';


// ==========================================================
// SANITY E2E SUITE
// ==========================================================

test.describe.serial(
    'Sanity Suite',
    () => {

        test.setTimeout(
            600000,
        );


        test(
            '01 - Complete Arbitration Claim E2E Flow',
            async ({ page }) => {

                // ==================================================
                // REPORT TRACKING
                // ==================================================

                const scenarios: ScenarioResult[] = [];


                const recordPassed = (
                    name: string,
                ): void => {

                    scenarios.push({
                        name,
                        status: 'PASSED',
                    });
                };


                const recordFailed = (
                    name: string,
                    error: unknown,
                ): void => {

                    scenarios.push({
                        name,
                        status: 'FAILED',
                        error:
                            error instanceof Error
                                ? error.message
                                : String(error),
                    });
                };


                const recordSkipped = (
                    name: string,
                    reason: string,
                ): void => {

                    scenarios.push({
                        name,
                        status: 'SKIPPED',
                        error: reason,
                    });
                };


                // ==================================================
                // CLAIM DISPLAY NAME
                // ==================================================

                let arbitrationClaimDisplayName = '';


                // ==================================================
                // LOGIN COMPLETED FLAG
                // ==================================================

                let loginCompleted = false;


                // ==================================================
                // FLOW FAILURE FLAG
                // ==================================================

                let flowFailed = false;


                // ==================================================
                // EXPECTED SCENARIOS
                // ==================================================

                const expectedScenarios = [

                    'Login',

                    'Create Arbitration Claim',

                    'Assign Case Managers',

                    'Add Parties',

                    'Respond to Proceedings',

                    'Add Message Tags',

                    'Change and Verify Status',

                    'Schedule and Verify Meeting',

                    'Apply More Filter - Organization',

                    'Apply More Filter - Display Name',

                ];


                try {

                    // ==================================================
                    // START
                    // ==================================================

                    console.log('');
                    console.log(
                        '======================================================',
                    );

                    console.log(
                        'STARTING COMPLETE ARBITRATION E2E FLOW',
                    );

                    console.log(
                        '======================================================',
                    );


                    // ==================================================
                    // STEP 01 - LOGIN + CREATE CLAIM
                    // ==================================================
                    //
                    // IMPORTANT:
                    // Login is handled INSIDE
                    // createArbitrationClaimScenario().
                    //
                    // The Sanity Suite does NOT call validLogin()
                    // separately.
                    //
                    // This keeps ONE LOGIN + ONE PAGE + ONE BROWSER.
                    // ==================================================

                    console.log('');
                    console.log(
                        'STEP 01 - LOGIN + CREATE ARBITRATION CLAIM',
                    );


                    try {

                        console.log(
                            'Calling createArbitrationClaimScenario()...',
                        );

                        console.log(
                            'Login will be performed inside the Create Claim scenario.',
                        );


                        arbitrationClaimDisplayName =
                            await createArbitrationClaimScenario(
                                page,
                            );


                        if (
                            !arbitrationClaimDisplayName ||
                            arbitrationClaimDisplayName.trim() === ''
                        ) {

                            throw new Error(
                                'Arbitration claim display name was not returned.',
                            );
                        }


                        // --------------------------------------------------
                        // Create Claim scenario has successfully completed.
                        // Therefore login + claim creation are considered
                        // successful.
                        // --------------------------------------------------

                        loginCompleted = true;


                        recordPassed(
                            'Login',
                        );


                        recordPassed(
                            'Create Arbitration Claim',
                        );


                        console.log(
                            'Login scenario passed.',
                        );


                        console.log(
                            `Created Claim: ${arbitrationClaimDisplayName}`,
                        );

                    }
                    catch (
                        error
                    ) {

                        // --------------------------------------------------
                        // Because login happens inside createArbitrationClaim
                        // we cannot separately know whether login or claim
                        // creation failed.
                        //
                        // Therefore both are recorded as failed, matching
                        // your existing working reporting approach.
                        // --------------------------------------------------

                        recordFailed(
                            'Login',
                            error,
                        );


                        recordFailed(
                            'Create Arbitration Claim',
                            error,
                        );


                        flowFailed = true;


                        throw error;
                    }


                    // ==================================================
                    // STEP 02 - CASE MANAGERS
                    // ==================================================

                    try {

                        console.log('');
                        console.log(
                            'STEP 02 - ASSIGN CASE MANAGERS',
                        );


                        await assignCaseManagersScenario(
                            page,
                            arbitrationClaimDisplayName,
                        );


                        recordPassed(
                            'Assign Case Managers',
                        );


                        console.log(
                            'Case managers assigned successfully.',
                        );

                    }
                    catch (
                        error
                    ) {

                        recordFailed(
                            'Assign Case Managers',
                            error,
                        );


                        flowFailed = true;


                        throw error;
                    }


                    // ==================================================
                    // STEP 03 - PARTIES
                    // ==================================================

                    try {

                        console.log('');
                        console.log(
                            'STEP 03 - ADD PARTIES',
                        );


                        await addPartiesToCurrentClaim(
                            page,
                        );


                        recordPassed(
                            'Add Parties',
                        );


                        console.log(
                            'All parties added successfully.',
                        );

                    }
                    catch (
                        error
                    ) {

                        recordFailed(
                            'Add Parties',
                            error,
                        );


                        flowFailed = true;


                        throw error;
                    }


                    // ==================================================
                    // STEP 04 - PROCEEDINGS
                    // ==================================================

                    try {

                        console.log('');
                        console.log(
                            'STEP 04 - RESPOND TO PROCEEDINGS',
                        );


                        await respondToProceedings(
                            page,
                        );


                        recordPassed(
                            'Respond to Proceedings',
                        );


                        console.log(
                            'Proceedings response completed successfully.',
                        );

                    }
                    catch (
                        error
                    ) {

                        recordFailed(
                            'Respond to Proceedings',
                            error,
                        );


                        flowFailed = true;


                        throw error;
                    }


                    // ==================================================
                    // STEP 05 - MESSAGE TAGS
                    // ==================================================

                    try {

                        console.log('');
                        console.log(
                            'STEP 05 - ADD MESSAGE TAGS',
                        );


                        await messageTagsScenario(
                            page,
                        );


                        recordPassed(
                            'Add Message Tags',
                        );


                        console.log(
                            'Message tags added successfully.',
                        );

                    }
                    catch (
                        error
                    ) {

                        recordFailed(
                            'Add Message Tags',
                            error,
                        );


                        flowFailed = true;


                        throw error;
                    }


                    // ==================================================
                    // STEP 06 - STATUS
                    // ==================================================

                    try {

                        console.log('');
                        console.log(
                            'STEP 06 - CHANGE AND VERIFY STATUS',
                        );


                        await statusChange(
                            page,
                        );


                        recordPassed(
                            'Change and Verify Status',
                        );


                        console.log(
                            'Status change flow completed successfully.',
                        );

                    }
                    catch (
                        error
                    ) {

                        recordFailed(
                            'Change and Verify Status',
                            error,
                        );


                        flowFailed = true;


                        throw error;
                    }


                    // ==================================================
                    // STEP 07 - SCHEDULE + VERIFY MEETING
                    // ==================================================

                    try {

                        console.log('');
                        console.log(
                            'STEP 07 - SCHEDULE AND VERIFY MEETING',
                        );


                        await scheduleMeetingScenario(
                            page,
                        );


                        recordPassed(
                            'Schedule and Verify Meeting',
                        );


                        console.log(
                            'Meeting scheduled and verified successfully.',
                        );

                    }
                    catch (
                        error
                    ) {

                        recordFailed(
                            'Schedule and Verify Meeting',
                            error,
                        );


                        flowFailed = true;


                        throw error;
                    }


                    // ==================================================
                    // STEP 08 - MORE FILTERS
                    // ==================================================

                    try {

                        console.log('');
                        console.log(
                            '======================================================',
                        );

                        console.log(
                            'STEP 08 - ALL CLAIMS + LIST VIEW + MORE FILTERS',
                        );

                        console.log(
                            '======================================================',
                        );


                        // ==================================================
                        // STEP 08.1 - ORGANIZATION FILTER
                        // ==================================================

                        console.log('');
                        console.log(
                            'STEP 08.1 - ORGANIZATION FILTER',
                        );


                        await applyMoreFilter(
                            page,
                        );


                        recordPassed(
                            'Apply More Filter - Organization',
                        );


                        console.log(
                            'All Claims → List View → Organization filter applied and verified successfully.',
                        );


                        // ==================================================
                        // STEP 08.2 - DISPLAY NAME FILTER
                        // ==================================================

                        console.log('');
                        console.log(
                            '======================================================',
                        );

                        console.log(
                            'STEP 08.2 - DISPLAY NAME FILTER',
                        );

                        console.log(
                            '======================================================',
                        );


                        console.log(
                            `Searching captured Display Name: ${arbitrationClaimDisplayName}`,
                        );


                        if (
                            !arbitrationClaimDisplayName ||
                            arbitrationClaimDisplayName.trim() === ''
                        ) {

                            throw new Error(
                                'Cannot apply Display Name filter because the claim display name is empty.',
                            );
                        }


                        await displayNameFilter(
                            page,
                            arbitrationClaimDisplayName,
                        );


                        recordPassed(
                            'Apply More Filter - Display Name',
                        );


                        console.log(
                            'Display Name filter applied and verified successfully.',
                        );

                    }
                    catch (
                        error
                    ) {

                        // --------------------------------------------------
                        // Organization may already have passed.
                        // Therefore identify which filter failed.
                        // --------------------------------------------------

                        const organizationRecorded =
                            scenarios.some(
                                scenario =>
                                    scenario.name ===
                                    'Apply More Filter - Organization',
                            );


                        const displayNameRecorded =
                            scenarios.some(
                                scenario =>
                                    scenario.name ===
                                    'Apply More Filter - Display Name',
                            );


                        if (
                            !organizationRecorded
                        ) {

                            recordFailed(
                                'Apply More Filter - Organization',
                                error,
                            );

                        }
                        else if (
                            !displayNameRecorded
                        ) {

                            recordFailed(
                                'Apply More Filter - Display Name',
                                error,
                            );

                        }


                        flowFailed = true;


                        throw error;
                    }


                    // ==================================================
                    // COMPLETE
                    // ==================================================

                    console.log('');
                    console.log(
                        '======================================================',
                    );

                    console.log(
                        'COMPLETE ARBITRATION E2E FLOW PASSED',
                    );

                    console.log(
                        '======================================================',
                    );

                }
                finally {

                    // ==================================================
                    // MARK DEPENDENT SCENARIOS AS SKIPPED
                    // ==================================================

                    if (
                        flowFailed
                    ) {

                        console.log('');
                        console.log(
                            '======================================================',
                        );

                        console.log(
                            'FLOW FAILED - MARKING REMAINING SCENARIOS AS SKIPPED',
                        );

                        console.log(
                            '======================================================',
                        );


                        for (
                            const scenarioName
                            of expectedScenarios
                        ) {

                            const alreadyRecorded =
                                scenarios.some(
                                    scenario =>
                                        scenario.name ===
                                        scenarioName,
                                );


                            if (
                                !alreadyRecorded
                            ) {

                                recordSkipped(
                                    scenarioName,
                                    'Skipped because a previous E2E step failed.',
                                );
                            }
                        }
                    }


                    // ==================================================
                    // STEP 09 - LOGOUT
                    // ==================================================

                    console.log('');
                    console.log(
                        '======================================================',
                    );

                    console.log(
                        'STEP 09 - LOGOUT',
                    );

                    console.log(
                        '======================================================',
                    );


                    // --------------------------------------------------
                    // Logout only if login was successfully completed.
                    //
                    // IMPORTANT:
                    // This is the SAME page/session.
                    // No new browser or login is created.
                    // --------------------------------------------------

                    if (
                        loginCompleted
                    ) {

                        try {

                            await logoutScenario(
                                page,
                            );


                            recordPassed(
                                'Logout',
                            );


                            console.log(
                                'Logout completed successfully.',
                            );

                        }
                        catch (
                            error
                        ) {

                            recordFailed(
                                'Logout',
                                error,
                            );


                            console.error(
                                'Logout failed:',
                                error,
                            );
                        }

                    }
                    else {

                        recordSkipped(
                            'Logout',
                            'Skipped because login was not completed.',
                        );


                        console.log(
                            'Logout skipped because login was not completed.',
                        );
                    }


                    // ==================================================
                    // REPORT
                    // ==================================================

                    console.log('');
                    console.log(
                        '======================================================',
                    );

                    console.log(
                        'PREPARING SANITY E2E REPORT',
                    );

                    console.log(
                        '======================================================',
                    );


                    const totalScenarios =
                        scenarios.length;


                    const passedScenarios =
                        scenarios.filter(
                            scenario =>
                                scenario.status === 'PASSED',
                        ).length;


                    const failedScenarios =
                        scenarios.filter(
                            scenario =>
                                scenario.status === 'FAILED',
                        ).length;


                    const skippedScenarios =
                        scenarios.filter(
                            scenario =>
                                scenario.status === 'SKIPPED',
                        ).length;


                    console.log(
                        `Total Scenarios: ${totalScenarios}`,
                    );

                    console.log(
                        `Passed Scenarios: ${passedScenarios}`,
                    );

                    console.log(
                        `Failed Scenarios: ${failedScenarios}`,
                    );

                    console.log(
                        `Skipped Scenarios: ${skippedScenarios}`,
                    );


                    // ==================================================
                    // PRINT SCENARIO STATUS
                    // ==================================================

                    console.log('');
                    console.log(
                        'SCENARIO RESULTS',
                    );


                    for (
                        const scenario
                        of scenarios
                    ) {

                        console.log(
                            `${scenario.status} - ${scenario.name}`,
                        );


                        if (
                            scenario.error
                        ) {

                            console.log(
                                `  Error: ${scenario.error}`,
                            );
                        }
                    }


                    // ==================================================
                    // SEND EMAIL REPORT
                    // ==================================================

                    try {

                        await sendReport({

                            totalScenarios,

                            passedScenarios,

                            failedScenarios,

                            skippedScenarios,

                            scenarios,

                        });


                        console.log(
                            'Sanity E2E report sent successfully.',
                        );

                    }
                    catch (
                        error
                    ) {

                        console.error(
                            'Failed to send Sanity E2E report:',
                            error,
                        );
                    }


                    // ==================================================
                    // FINAL INFORMATION
                    // ==================================================

                    console.log('');
                    console.log(
                        '======================================================',
                    );

                    console.log(
                        'SANITY E2E EXECUTION COMPLETED',
                    );

                    console.log(
                        '======================================================',
                    );


                    if (
                        flowFailed
                    ) {

                        console.log(
                            'Result: FAILED',
                        );

                    }
                    else {

                        console.log(
                            'Result: PASSED',
                        );
                    }


                    console.log(
                        'Browser session has been logged out.',
                    );

                    console.log(
                        'Playwright will now close the browser automatically.',
                    );

                    console.log(
                        '======================================================',
                    );

                }

            },
        );

    },
);