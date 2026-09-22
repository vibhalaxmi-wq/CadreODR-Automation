import { Page } from '@playwright/test';

import { validLogin } from '../Login/validLogin';

import { logout } from '../../actions/LogoutActions';

import {
    arbitratorDeclaration as arbitratorDeclarationAction,
} from '../../actions/DeclarationActions';


// ==========================================================
// ARBITRATOR DECLARATION SCENARIO
// ==========================================================

export async function arbitratorDeclaration(
    page: Page,
    arbitratorEmail: string,
    claimDisplayName: string
): Promise<void> {

    console.log('');

    console.log(
        '======================================================'
    );

    console.log(
        'STARTING ARBITRATOR DECLARATION SCENARIO'
    );

    console.log(
        '======================================================'
    );


    // ======================================================
    // LOGIN AS ARBITRATOR
    // ======================================================

    await validLogin(
        page,
        arbitratorEmail
    );

    try {

        // ==================================================
        // ARBITRATOR DECLARATION ACTION
        // ==================================================

        await arbitratorDeclarationAction(
            page,
            arbitratorEmail,
            claimDisplayName
        );


        console.log('');

        console.log(
            'ARBITRATOR DECLARATION COMPLETED SUCCESSFULLY.'
        );

    } finally {

        // ==================================================
        // LOGOUT ARBITRATOR
        // ======================================================

        console.log('');

        console.log(
            'Starting logout after Arbitrator Declaration...'
        );

        await logout(page);
    }
}