import { Page } from '@playwright/test';

import {
    PartyActions,
} from '../../actions/PartyActions';


// ==========================================================
// ADD PARTIES TO CURRENT CLAIM
// ==========================================================

export async function addPartiesToCurrentClaim(
    page: Page
): Promise<void> {

    console.log('');
    console.log(
        '======================================================'
    );

    console.log(
        'ADD PARTIES TO CURRENT CLAIM SCENARIO'
    );

    console.log(
        '======================================================'
    );


    // ======================================================
    // SAME PAGE / SAME SESSION
    // ======================================================
    //
    // No login.
    // No page.goto().
    // No new page.
    // No new browser.
    // No logout.
    //
    // ======================================================

    console.log(
        `Current URL: ${page.url()}`
    );


    const partyActions =
        new PartyActions(
            page
        );


    await partyActions.addAllParties();


    console.log('');
    console.log(
        '======================================================'
    );

    console.log(
        'PARTY SCENARIO COMPLETED SUCCESSFULLY'
    );

    console.log(
        'All parties and representatives verified.'
    );

    console.log(
        `Current URL: ${page.url()}`
    );

    console.log(
        '======================================================'
    );
}