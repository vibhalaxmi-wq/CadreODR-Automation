import { Page } from '@playwright/test';

import { validLogin } from '../Login/validLogin';

import { logout } from '../../actions/LogoutActions';

import {
    verifyClaimCreationWithoutMandatoryField,
} from '../../actions/ClaimActions';

// ==========================================================
// CLAIM CREATION WITHOUT MANDATORY FIELD SCENARIO
// ==========================================================

export async function claimCreationWithoutMandatoryField(
    page: Page
): Promise<void> {

    // ==========================================================
    // LOGIN
    // ==========================================================

    await validLogin(page);

    try {

        // ======================================================
        // VERIFY CLAIM CREATION VALIDATION
        // ======================================================

        await verifyClaimCreationWithoutMandatoryField(
            page
        );

    } finally {

        // ======================================================
        // LOGOUT
        // ======================================================

        console.log('');
        console.log(
            'Starting logout...'
        );

        await logout(page);
    }
}