import { Page } from '@playwright/test';

import {
    validLogin,
} from '../Login/validLogin';

import {
    ArbitrationActions,
} from '../../actions/ArbitrationActions';

import {
    loginData,
} from '../../testData/loginData';


// ==========================================================
// CREATE ARBITRATION CLAIM SCENARIO
// ==========================================================

export async function createArbitrationClaimScenario(
    page: Page
): Promise<string> {

    console.log('');

    console.log(
        '======================================================'
    );

    console.log(
        'ARBITRATION CLAIM SCENARIO'
    );

    console.log(
        '======================================================'
    );


    // ======================================================
    // LOGIN
    // ======================================================

    console.log('');

    console.log(
        'Logging in as ODR Admin...'
    );


    await validLogin(
        page,
        loginData.validUser.email
    );


    console.log(
        'Login completed successfully.'
    );

    console.log(
        `Current URL: ${page.url()}`
    );


    // ======================================================
    // CREATE ARBITRATION CLAIM
    // ======================================================

    console.log('');

    console.log(
        'Starting Arbitration Claim creation...'
    );


    const arbitrationActions =
        new ArbitrationActions(
            page
        );


    const claimDisplayName =
        await arbitrationActions
            .createArbitrationClaim();


    // ======================================================
    // VERIFY RESULT
    // ======================================================

    if (!claimDisplayName) {

        throw new Error(
            'Arbitration claim was not created. Claim display name is empty.'
        );
    }


    // ======================================================
    // PRINT RESULT
    // ======================================================

    console.log('');

    console.log(
        '======================================================'
    );

    console.log(
        'ARBITRATION CLAIM CREATED SUCCESSFULLY'
    );

    console.log(
        `Claim Display Name: ${claimDisplayName}`
    );

    console.log(
        'USER SESSION REMAINS ACTIVE'
    );

    console.log(
        '======================================================'
    );


    // ======================================================
    // IMPORTANT
    // ======================================================
    //
    // DO NOT LOGOUT HERE.
    //
    // Expected flow:
    //
    // Login
    //    ↓
    // Create Arbitration Claim
    //    ↓
    // Create Conciliation Claim
    //    ↓
    // Logout
    //
    // ======================================================

    return claimDisplayName;
}