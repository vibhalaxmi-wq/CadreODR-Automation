import { Page } from '@playwright/test';

import { validLogin } from '../Login/validLogin';

import { logout } from '../../actions/LogoutActions';

import {
    createArbitrationAndConciliationClaims as createClaimsAction,
} from '../../actions/ClaimActions';

import { loginData } from '../../testData/loginData';


// ==========================================================
// CREATE ARBITRATION + CONCILIATION CLAIMS
// ==========================================================

export async function createArbitrationAndConciliationClaims(
    page: Page
): Promise<{
    arbitrationDisplayName: string;
    conciliationDisplayName: string;
    claimantEmail: string;
    respondentEmail: string;
    arbitratorEmail: string;
    mediatorEmail: string;
}> {

    console.log('');

    console.log(
        '======================================================'
    );

    console.log(
        'STARTING CREATE ARBITRATION + CONCILIATION CLAIMS'
    );

    console.log(
        '======================================================'
    );


    // ======================================================
    // ODR ADMIN LOGIN
    // ======================================================

    await validLogin(
        page,
        loginData.validUser.email
    );


    try {

        // ==================================================
        // CREATE ARBITRATION + CONCILIATION
        // ==================================================

        const result =
            await createClaimsAction(
                page
            );


        console.log('');

        console.log(
            '======================================================'
        );

        console.log(
            'CLAIMS CREATED SUCCESSFULLY'
        );

        console.log(
            '======================================================'
        );

        console.log(
            `Arbitration Claim  : ${result.arbitrationDisplayName}`
        );

        console.log(
            `Conciliation Claim : ${result.conciliationDisplayName}`
        );

        console.log(
            `Claimant Email     : ${result.claimantEmail}`
        );

        console.log(
            `Respondent Email   : ${result.respondentEmail}`
        );

        console.log(
            `Arbitrator Email   : ${result.arbitratorEmail}`
        );

        console.log(
            `Conciliator Email  : ${result.mediatorEmail}`
        );


        return result;

    } finally {

        // ==================================================
        // ODR ADMIN LOGOUT
        // ==================================================

        console.log('');

        console.log(
            'Starting logout after claim creation...'
        );

        await logout(page);
    }
}