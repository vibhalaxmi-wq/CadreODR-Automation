import {
    Page,
} from '@playwright/test';

import {
    MessageTagsActions,
} from '../../actions/MessageTagsActions';


// ==========================================================
// MESSAGE TAGS SCENARIO
// ==========================================================
//
// IMPORTANT:
//
// This scenario:
// - DOES NOT login
// - DOES NOT logout
// - DOES NOT create a browser
// - DOES NOT create a new page
//
// It uses the SAME page/session from SanitySuite.spec.ts.
//
// ==========================================================

export async function messageTagsScenario(
    page: Page
): Promise<void> {

    console.log('');
    console.log(
        '======================================================'
    );

    console.log(
        'MESSAGE TAGS SCENARIO'
    );

    console.log(
        '======================================================'
    );

    console.log(
        `Current URL: ${page.url()}`
    );

    console.log(
        'Using existing browser session.'
    );


    // ======================================================
    // CREATE ACTION
    // ======================================================

    const actions =
        new MessageTagsActions(
            page
        );


    // ======================================================
    // ADD AND VERIFY MESSAGE TAGS
    // ======================================================

    await actions.addMessageTags();


    // ======================================================
    // COMPLETE
    // ======================================================

    console.log('');
    console.log(
        '======================================================'
    );

    console.log(
        'MESSAGE TAGS SCENARIO COMPLETED SUCCESSFULLY'
    );

    console.log(
        `Current URL: ${page.url()}`
    );

    console.log(
        '======================================================'
    );
}