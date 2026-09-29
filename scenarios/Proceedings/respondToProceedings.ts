import {
    Page,
} from '@playwright/test';

import {
    ProceedingsActions,
} from '../../actions/ProceedingsActions';


// ==========================================================
// RESPOND TO PROCEEDINGS SCENARIO
// ==========================================================

export async function respondToProceedings(
    page: Page
): Promise<void> {

    console.log('');
    console.log(
        '======================================================'
    );
    console.log(
        'RESPOND TO PROCEEDINGS SCENARIO'
    );
    console.log(
        '======================================================'
    );

    // ======================================================
    // VERIFY CURRENT SESSION
    // ======================================================

    console.log(
        `Current URL: ${page.url()}`
    );

    console.log(
        'Using existing logged-in browser session.'
    );

    // ======================================================
    // CREATE ACTIONS USING SAME PAGE
    // ======================================================

    const actions =
        new ProceedingsActions(page);

    // ======================================================
    // EXECUTE PROCEEDINGS FLOW
    // ======================================================

    await actions.respondToProceedings();

    // ======================================================
    // COMPLETE
    // ======================================================

    console.log('');
    console.log(
        '======================================================'
    );
    console.log(
        'RESPOND TO PROCEEDINGS COMPLETED SUCCESSFULLY'
    );
    console.log(
        `Current URL: ${page.url()}`
    );
    console.log(
        '======================================================'
    );
}