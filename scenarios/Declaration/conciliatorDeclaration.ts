import { Page } from '@playwright/test';

import { validLogin } from '../Login/validLogin';

import { logout } from '../../actions/LogoutActions';

import {
    conciliatorDeclaration as conciliatorDeclarationAction,
} from '../../actions/DeclarationActions';


// ==========================================================
// CONCILIATOR DECLARATION SCENARIO
// ==========================================================

export async function conciliatorDeclaration(
    page: Page,
    conciliatorEmail: string,
    claimDisplayName: string
): Promise<void> {

    console.log('');

    console.log(
        '======================================================'
    );

    console.log(
        'STARTING CONCILIATOR DECLARATION SCENARIO'
    );

    console.log(
        '======================================================'
    );


    // ======================================================
    // LOGIN AS CONCILIATOR
    // ======================================================

    await validLogin(
        page,
        conciliatorEmail
    );


    try {

        // ==================================================
        // CONCILIATOR DECLARATION ACTION
        // ==================================================

        await conciliatorDeclarationAction(
            page,
            conciliatorEmail,
            claimDisplayName
        );


        console.log('');

        console.log(
            'CONCILIATOR DECLARATION COMPLETED SUCCESSFULLY.'
        );

    } finally {

        // ==================================================
        // LOGOUT CONCILIATOR
        // ======================================================

        console.log('');

        console.log(
            'Starting logout after Conciliator Declaration...'
        );

        await logout(page);
    }
}