import {
    Page,
} from '@playwright/test';

import {
    AssignCaseManagersActions,
} from '../../actions/CaseManagerActions';


// ==========================================================
// ASSIGN CASE MANAGERS SCENARIO
// ==========================================================

export async function assignCaseManagersScenario(

    page: Page,

    claimDisplayName?: string

): Promise<void> {

    console.log('');

    console.log(
        '======================================================'
    );

    console.log(
        'ASSIGN CASE MANAGERS SCENARIO'
    );

    console.log(
        '======================================================'
    );


    // ======================================================
    // VERIFY CURRENT PAGE
    // ======================================================

    console.log(
        `Current URL: ${page.url()}`
    );


    if (
        claimDisplayName
    ) {

        console.log(
            `Current Claim: ${claimDisplayName}`
        );
    }


    // ======================================================
    // IMPORTANT
    // ======================================================
    //
    // DO NOT:
    //
    // - login
    // - goto login
    // - create another page
    // - create another browser
    // - logout
    //
    // The page received here is the SAME page where
    // the arbitration claim was created.
    //
    // ======================================================


    const actions =
        new AssignCaseManagersActions(
            page
        );


    // ======================================================
    // ASSIGN ALL CASE MANAGERS
    // ======================================================

    await actions.assignAllCaseManagers();


    // ======================================================
    // COMPLETED
    // ======================================================

    console.log('');

    console.log(
        '======================================================'
    );

    console.log(
        'CASE MANAGER SCENARIO COMPLETED SUCCESSFULLY'
    );

    console.log(
        'User remains on the same claim.'
    );

    console.log(
        `Current URL: ${page.url()}`
    );
    console.log(
        '======================================================'
    );
}