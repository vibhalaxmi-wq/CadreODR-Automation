import { Page } from '@playwright/test';

import { validLogin } from '../Login/validLogin';

import { logout } from '../../actions/LogoutActions';

import {
    createClaimWithAttachment as createAttachmentAction,
} from '../../actions/ClaimActions';

// ==========================================================
// CREATE CLAIM WITH ATTACHMENT SCENARIO
// ==========================================================

export async function createClaimWithAttachment(
    page: Page
): Promise<{
    claimDisplayName: string;
    claimantEmail: string;
    respondentEmail: string;
}> {

    // ------------------------------------------------------
    // LOGIN
    // ------------------------------------------------------

    await validLogin(page);

    try {

        // --------------------------------------------------
        // CREATE CLAIM
        // --------------------------------------------------

        const result =
            await createAttachmentAction(
                page
            );

        return result;

    } finally {

        // --------------------------------------------------
        // LOGOUT
        // --------------------------------------------------

        console.log('');
        console.log('Starting logout...');

        await logout(page);
    }
}