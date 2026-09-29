import {
    Page,
} from '@playwright/test';

import {
    StatusActions,
} from '../../actions/StatusActions';


// ==========================================================
// STATUS CHANGE SCENARIO
// ==========================================================

export async function statusChange(
    page: Page
): Promise<void> {

    console.log('');
    console.log(
        '======================================================'
    );

    console.log(
        'STATUS CHANGE SCENARIO'
    );

    console.log(
        '======================================================'
    );

    console.log(
        `Current URL: ${page.url()}`
    );

    console.log(
        'Using existing logged-in browser session.'
    );


    // ======================================================
    // CREATE ACTIONS
    // ======================================================

    const statusActions =
        new StatusActions(
            page
        );


    // ======================================================
    // CHANGE ALL STATUSES
    // ======================================================

    await statusActions
        .changeAllStatuses();


    // ======================================================
    // COMPLETE
    // ======================================================

    console.log('');
    console.log(
        '======================================================'
    );

    console.log(
        'STATUS CHANGE SCENARIO COMPLETED SUCCESSFULLY'
    );

    console.log(
        `Current URL: ${page.url()}`
    );

    console.log(
        '======================================================'
    );
}