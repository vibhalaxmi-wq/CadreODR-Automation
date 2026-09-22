import { Page } from '@playwright/test';

import { validLogin } from '../Login/validLogin';

import { logout } from '../../actions/LogoutActions';

import {
    claimantDeclaration as claimantDeclarationAction,
} from '../../actions/DeclarationActions';


// ==========================================================
// CLAIMANT DECLARATION SCENARIO
// ==========================================================

export async function claimantDeclaration(
    page: Page,
    claimantEmail: string,
    claimDisplayName: string
): Promise<void> {

    console.log('');

    console.log(
        '======================================================'
    );

    console.log(
        'STARTING CLAIMANT DECLARATION SCENARIO'
    );

    console.log(
        '======================================================'
    );


    // ======================================================
    // LOGIN AS CLAIMANT
    // ======================================================

    await validLogin(
        page,
        claimantEmail
    );


    try {

        // ==================================================
        // CLAIMANT DECLARATION ACTION
        // ==================================================

        await claimantDeclarationAction(
            page,
            claimantEmail,
            claimDisplayName
        );


        console.log('');

        console.log(
            'CLAIMANT DECLARATION COMPLETED SUCCESSFULLY.'
        );

    } finally {

        // ==================================================
        // LOGOUT CLAIMANT
        // ==================================================

        console.log('');

        console.log(
            'Starting logout after Claimant Declaration...'
        );

        await logout(page);
    }
}