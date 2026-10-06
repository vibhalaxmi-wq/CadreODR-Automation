import { Page } from '@playwright/test';
import fs from 'fs';
import { ClaimPage } from '../pages/ClaimPage';
import { claimData } from '../testData/claimData';
// ==========================================================
// FILL COMMON CLAIM DETAILS
// ==========================================================
async function fillCommonClaimDetails(
    claimPage: ClaimPage
): Promise<void> {
    await claimPage.enterDisputeAmount(claimData.common.disputeAmount);
    await claimPage.enterContract(claimData.common.contract);
    await claimPage.enterJurisdiction(claimData.common.jurisdiction);
}
// ==========================================================
// ADD CLAIMANT
// ==========================================================
async function addClaimant(
    claimPage: ClaimPage
): Promise<void> {
    await claimPage.addParty(
        claimData.claimant.name,
        claimData.claimant.email,
        claimData.claimant.phone,
        claimData.claimant.address
    );
}
// ==========================================================
// ADD RESPONDENT
// ==========================================================
async function addRespondent(
    claimPage: ClaimPage,
    phone: string
): Promise<void> {
    await claimPage.addParty(
        claimData.respondent.name,
        claimData.respondent.email,
        phone,
        claimData.respondent.address,
        'Respondent'
    );
}
// ==========================================================
// CREATE ARBITRATION CLAIM
// ==========================================================

async function createArbitrationClaim(
    claimPage: ClaimPage
): Promise<string> {
    console.log('');
    console.log('======================================================');
    console.log('Creating Arbitration Claim');
    console.log('======================================================');
    await claimPage.clickNewClaim();
    await claimPage.verifyNewClaimForm();
    await claimPage.selectOrganization(claimData.common.organization);
    await addClaimant(claimPage);
    await addRespondent(claimPage,claimData.respondent.arbitrationPhone);


    await fillCommonClaimDetails(
        claimPage
    );


    await claimPage.selectDisputeType(
        claimData.arbitration.disputeType
    );


    await claimPage.selectClaimType(
        claimData.arbitration.claimType
    );


    await claimPage.enterSummary(
        claimData.common.summary
    );


    await claimPage.logClaim();


    await claimPage.verifyToast();


    const displayName =
        await claimPage.getClaimDisplayName();


    console.log(
        `Arbitration Claim Created: ${displayName}`
    );


    // ======================================================
    // ASSIGN ARBITRATOR
    //
    // UI:
    //
    // Case Officer  = index 0
    // Arbitrator    = index 1
    // Observer      = index 2
    // ======================================================

    await claimPage.addAssignedUser(
        1,
        claimData.arbitrator.searchText,
        claimData.arbitrator.userName
    );


    console.log(
        'Arbitrator assigned successfully.'
    );


    return displayName;
}


// ==========================================================
// CREATE CONCILIATION CLAIM
// ==========================================================

async function createConciliationClaim(
    claimPage: ClaimPage
): Promise<string> {

    console.log('');

    console.log(
        '======================================================'
    );

    console.log(
        'Creating Conciliation Claim'
    );

    console.log(
        '======================================================'
    );


    await claimPage.clickNewClaim();


    await claimPage.verifyNewClaimForm();


    await claimPage.selectOrganization(
        claimData.common.organization
    );


    await addClaimant(
        claimPage
    );


    await addRespondent(
        claimPage,
        claimData.respondent.conciliationPhone
    );


    await fillCommonClaimDetails(
        claimPage
    );


    await claimPage.selectDisputeType(
        claimData.conciliation.disputeType
    );


    await claimPage.selectClaimType(
        claimData.conciliation.claimType
    );


    await claimPage.enterSummary(
        claimData.common.summary
    );


    await claimPage.logClaim();


    await claimPage.verifyToast();


    const displayName =
        await claimPage.getClaimDisplayName();


    console.log(
        `Conciliation Claim Created: ${displayName}`
    );


    // ======================================================
    // ASSIGN CONCILIATOR
    //
    // Keep index 2 based on your existing implementation.
    // If the Conciliation UI has a different assignment order,
    // this index should be adjusted after checking that UI.
    // ======================================================

    await claimPage.addAssignedUser(
        2,
        claimData.mediator.searchText,
        claimData.mediator.userName
    );


    console.log(
        'Mediator assigned successfully.'
    );


    return displayName;
}


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

    const claimPage =
        new ClaimPage(page);


    const arbitrationDisplayName =
        await createArbitrationClaim(
            claimPage
        );


    const conciliationDisplayName =
        await createConciliationClaim(
            claimPage
        );


    return {

        arbitrationDisplayName,

        conciliationDisplayName,

        claimantEmail:
            claimData.claimant.email,

        respondentEmail:
            claimData.respondent.email,

        arbitratorEmail:
            claimData.arbitrator.email,

        mediatorEmail:
            claimData.mediator.email,
    };
}


// ==========================================================
// CREATE ARBITRATION CLAIM WITH ATTACHMENT
// ==========================================================

export async function createClaimWithAttachment(
    page: Page
): Promise<{
    claimDisplayName: string;
    claimantEmail: string;
    respondentEmail: string;
}> {

    console.log('');

    console.log(
        '======================================================'
    );

    console.log(
        'Creating Arbitration Claim With Attachment'
    );

    console.log(
        '======================================================'
    );


    const claimPage =
        new ClaimPage(page);


    // ------------------------------------------------------
    // VERIFY ATTACHMENT FILE
    // ------------------------------------------------------

    const attachmentPath =
        claimData.attachment.filePath;


    if (!fs.existsSync(attachmentPath)) {

        throw new Error(
            `Attachment file not found at:\n${attachmentPath}`
        );
    }


    console.log(
        `Attachment file found: ${attachmentPath}`
    );


    // ------------------------------------------------------
    // NEW CLAIM
    // ------------------------------------------------------

    await claimPage.clickNewClaim();


    await claimPage.verifyNewClaimForm();


    // ------------------------------------------------------
    // ORGANIZATION
    // ------------------------------------------------------

    await claimPage.selectOrganization(
        claimData.common.organization
    );


    // ------------------------------------------------------
    // CLAIMANT
    // ------------------------------------------------------

    await addClaimant(
        claimPage
    );


    // ------------------------------------------------------
    // RESPONDENT
    // ------------------------------------------------------

    await addRespondent(
        claimPage,
        claimData.respondent.conciliationPhone
    );


    // ------------------------------------------------------
    // COMMON CLAIM DETAILS
    // ------------------------------------------------------

    await fillCommonClaimDetails(
        claimPage
    );


    // ------------------------------------------------------
    // DISPUTE TYPE
    // ------------------------------------------------------

    await claimPage.selectDisputeType(
        claimData.arbitration.disputeType
    );


    // ------------------------------------------------------
    // CLAIM TYPE
    // ------------------------------------------------------

    await claimPage.selectClaimType(
        claimData.arbitration.claimType
    );


    // ------------------------------------------------------
    // SUMMARY
    // ------------------------------------------------------

    await claimPage.enterSummary(
        claimData.common.summary
    );


    // ------------------------------------------------------
    // UPLOAD ATTACHMENT
    // ------------------------------------------------------

    console.log(
        'Uploading attachment...'
    );


    await claimPage.uploadAttachment(
        attachmentPath
    );


    console.log(
        'Attachment uploaded successfully.'
    );


    // ------------------------------------------------------
    // SELECT TAG
    // ------------------------------------------------------

    console.log(
        `Selecting tag: ${claimData.attachment.tag}`
    );


    await claimPage.selectTag(
        claimData.attachment.tag
    );


    console.log(
        'Tag selected successfully.'
    );


    // ------------------------------------------------------
    // LOG CLAIM
    // ------------------------------------------------------

    await claimPage.logClaim();


    await claimPage.verifyToast();


    // ------------------------------------------------------
    // GET CLAIM DISPLAY NAME
    // ------------------------------------------------------

    const claimDisplayName =
        await claimPage.getClaimDisplayName();


    console.log(
        `Attachment Claim Created: ${claimDisplayName}`
    );


    // ------------------------------------------------------
    // ASSIGN ARBITRATOR
    // ------------------------------------------------------

    await claimPage.addAssignedUser(
        1,
        claimData.arbitrator.searchText,
        claimData.arbitrator.userName
    );


    console.log(
        'Arbitrator assigned successfully.'
    );


    return {

        claimDisplayName,

        claimantEmail:
            claimData.claimant.email,

        respondentEmail:
            claimData.respondent.email,
    };
}


// ==========================================================
// VERIFY CLAIM CREATION WITHOUT MANDATORY DATA
// ==========================================================

export async function verifyClaimCreationWithoutMandatoryField(
    page: Page
): Promise<void> {

    console.log('');

    console.log(
        '======================================================'
    );

    console.log(
        'CREATE CLAIM WITHOUT MANDATORY DATA'
    );

    console.log(
        '======================================================'
    );


    const claimPage =
        new ClaimPage(page);


    // ------------------------------------------------------
    // CLICK NEW CLAIM
    // ------------------------------------------------------

    await claimPage.clickNewClaim();


    // ------------------------------------------------------
    // VERIFY NEW CLAIM FORM
    // ------------------------------------------------------

    await claimPage.verifyNewClaimForm();


    console.log(
        'Claim creation form opened successfully.'
    );


    // ------------------------------------------------------
    // DO NOT ENTER ANY DATA
    // ------------------------------------------------------

    console.log('');

    console.log(
        'All claim fields are intentionally left empty.'
    );


    console.log(
        'Organization    : NOT ENTERED'
    );


    console.log(
        'Claimant        : NOT ENTERED'
    );


    console.log(
        'Respondent      : NOT ENTERED'
    );


    console.log(
        'Dispute Amount  : NOT ENTERED'
    );


    console.log(
        'Contract        : NOT ENTERED'
    );


    console.log(
        'Jurisdiction    : NOT ENTERED'
    );


    console.log(
        'Dispute Type    : NOT ENTERED'
    );
    console.log('Claim Type      : NOT ENTERED');
    console.log(
        'Summary         : NOT ENTERED'
    );


    // ------------------------------------------------------
    // VERIFY LOG CLAIM BUTTON
    // ------------------------------------------------------

    await claimPage.verifyLogClaimButtonDisabled();


    console.log('');

    console.log(
        'Without mandatory field validation completed successfully.'
    );
}