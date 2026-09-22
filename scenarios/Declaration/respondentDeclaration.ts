import { Page } from '@playwright/test';

import { validLogin } from '../Login/validLogin';

import { logout } from '../../actions/LogoutActions';

import {
    respondentDeclaration as respondentDeclarationAction,
} from '../../actions/DeclarationActions';


// ==========================================================
// RESPONDENT DECLARATION SCENARIO
// ==========================================================

export async function respondentDeclaration(
    page: Page,
    respondentEmail: string,
    claimDisplayName: string
): Promise<void> {

    console.log('');

    console.log(
        '======================================================'
    );

    console.log(
        'STARTING RESPONDENT DECLARATION SCENARIO'
    );

    console.log(
        '======================================================'
    );


    // ======================================================
    // LOGIN AS RESPONDENT
    // ======================================================

    await validLogin(
        page,
        respondentEmail
    );


    try {

        // ==================================================
        // RESPONDENT DECLARATION ACTION
        // ==================================================

        await respondentDeclarationAction(
            page,
            respondentEmail,
            claimDisplayName
        );


        console.log('');

        console.log(
            'RESPONDENT DECLARATION COMPLETED SUCCESSFULLY.'
        );

    } finally {

        // ==================================================
        // LOGOUT RESPONDENT
        // ==================================================

        console.log('');

        console.log(
            'Starting logout after Respondent Declaration...'
        );

        await logout(page);
    }
}