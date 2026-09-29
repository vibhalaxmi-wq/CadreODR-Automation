import { Page } from '@playwright/test';
import {createClaimWithAttachment as createAttachmentAction,} from '../../actions/ClaimActions';
export async function createClaimWithAttachment(
    page: Page
): Promise<{
    claimDisplayName: string;
    claimantEmail: string;
    respondentEmail: string;
}> {
    console.log('');
    console.log('======================================================');
    console.log('CREATE CLAIM WITH ATTACHMENT SCENARIO');
    console.log('======================================================');
    console.log(`Current URL: ${page.url()}`);
    console.log('Using existing logged-in browser session.');
    // ======================================================
    // CREATE CLAIM
    // ======================================================
    console.log('');
    console.log('======================================================');
    console.log('CREATING CLAIM WITH ATTACHMENT');
    console.log('======================================================');
    const result =await createAttachmentAction(page);
    // ======================================================
    // VERIFY RESULT
    // ======================================================
    if (!result) {
        throw new Error('Create Claim With Attachment did not return a result.'
        );
    }
    if (!result.claimDisplayName) {
        throw new Error(
            'Claim display name was not returned.'
        );
    }
    // ======================================================
    // SUCCESS
    // ======================================================
    console.log('');
    console.log('======================================================');
    console.log('CLAIM WITH ATTACHMENT CREATED SUCCESSFULLY');
    console.log('======================================================');
    console.log(`Claim Display Name: ${result.claimDisplayName}`);
    console.log(`Claimant Email: ${result.claimantEmail}`);
    console.log(`Respondent Email: ${result.respondentEmail}`);
    console.log(`Current URL: ${page.url()}`);
    console.log('USER SESSION REMAINS ACTIVE');
    console.log('======================================================');
    // ======================================================
    // RETURN RESULT
    // ======================================================
    return result;
}