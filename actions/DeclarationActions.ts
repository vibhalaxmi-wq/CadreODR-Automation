import { Page } from '@playwright/test';
import { DeclarationPage } from '../pages/DeclarationPage';
import { declarationData } from '../testData/declaration';
// ==========================================================
// CLAIMANT DECLARATION
// ==========================================================
export async function claimantDeclaration(
    page: Page,
    claimantEmail: string,
    claimDisplayName: string
): Promise<void> {
    if (!claimantEmail) {
        throw new Error('Claimant email was not provided.');
    }
    if (!claimDisplayName) {
        throw new Error('Claim display name was not provided.');
    }
    console.log('');
    console.log('==========================================================');
    console.log('CLAIMANT DECLARATION');
    console.log('==========================================================');
    const declarationPage =new DeclarationPage(page);
    const claimPage =await declarationPage.openCreatedClaim(claimDisplayName);
    const claimDeclarationPage =new DeclarationPage(claimPage);
    await claimDeclarationPage.acceptPartyDeclaration();
    await claimPage.close();
    console.log('Claimant declaration completed successfully.');
}
// ==========================================================
// RESPONDENT DECLARATION
// ==========================================================
export async function respondentDeclaration(
    page: Page,
    respondentEmail: string,
    claimDisplayName: string
): Promise<void> {
    if (!respondentEmail) {
        throw new Error('Respondent email was not provided.');
    }
    if (!claimDisplayName) {
        throw new Error('Claim display name was not provided.');
    }
    console.log('');
    console.log('==========================================================');
    console.log('RESPONDENT DECLARATION');
    console.log('==========================================================');
    const declarationPage =new DeclarationPage(page);
    const claimPage =await declarationPage.openCreatedClaim(claimDisplayName);
    const claimDeclarationPage =new DeclarationPage(claimPage);
    await claimDeclarationPage.acceptPartyDeclaration();
    await claimPage.close();
    console.log('Respondent declaration completed successfully.');
}
// ==========================================================
// ARBITRATOR DECLARATION
// ==========================================================
export async function arbitratorDeclaration(
    page: Page,
    arbitratorEmail: string,
    claimDisplayName: string
): Promise<void> {
    if (!arbitratorEmail) {
        throw new Error('Arbitrator email was not provided.');
    }
    if (!claimDisplayName) {
        throw new Error('Arbitration claim display name was not provided.');
    }
    console.log('');
    console.log('==========================================================');
    console.log('ARBITRATOR DECLARATION');
    console.log('==========================================================');
    console.log(`Arbitrator Email: ${arbitratorEmail}`);
    console.log(`Arbitration Claim: ${claimDisplayName}`);
    // ======================================================
    // OPEN CLAIM USING MORE FILTERS
    // ======================================================
    const declarationPage =new DeclarationPage(page);
    const claimPage =await declarationPage.openCreatedClaim(claimDisplayName);
    // ======================================================
    // CREATE CLAIM DETAILS PAGE OBJECT
    // ======================================================
    const arbitratorPage =new DeclarationPage(claimPage);
    // ======================================================
    // VERIFY ARBITRATOR FORM IS AVAILABLE
    // ======================================================
    console.log('');
    console.log('Waiting for Arbitrator Declaration form...');
    const contactDetails =claimPage.getByRole('textbox',{name: 'Contact Details *',});
    await contactDetails.waitFor({state: 'visible',timeout: 15000,});
    console.log('Arbitrator Declaration form is visible.');
    // ======================================================
    // CONTACT DETAILS
    // ======================================================
    await arbitratorPage.enterContactDetails(declarationData.arbitrator.contactDetails);
    // ======================================================
    // PAN NUMBER
    // ======================================================
    await arbitratorPage.enterPanNumber(declarationData.arbitrator.panNumber);
    // ======================================================
    // I AGREE CHECKBOXES
    // ======================================================
    await arbitratorPage.selectIAgreeCheckboxes();
    // ======================================================
    // TOTAL ARBITRATION
    // ======================================================
    await arbitratorPage.enterTotalNumberOfArbitration(declarationData.arbitrator.totalNumberOfArbitration);
    // ======================================================
    // SUBMIT
    // ======================================================
    await arbitratorPage.clickSubmit();
    await claimPage.waitForTimeout(2000);
    console.log('Arbitrator declaration submitted.');
    // ======================================================
    // CLOSE CLAIM DETAILS
    // ======================================================
    await claimPage.close();
    console.log('Arbitrator declaration completed successfully.');}
// ==========================================================
// CONCILIATOR DECLARATION
// ==========================================================
export async function conciliatorDeclaration(
    page: Page,
    conciliatorEmail: string,
    claimDisplayName: string
): Promise<void> {
    if (!conciliatorEmail) {
        throw new Error('Conciliator email was not provided.');
    }
    if (!claimDisplayName) {
        throw new Error('Conciliation claim display name was not provided.');
    }
    console.log('');
    console.log('==========================================================');
    console.log('CONCILIATOR DECLARATION');
    console.log('==========================================================');
    console.log(`Conciliator Email: ${conciliatorEmail}`);
    console.log(`Conciliation Claim: ${claimDisplayName}`);
    // ======================================================
    // OPEN CLAIM USING MORE FILTERS
    // ======================================================
    const declarationPage =new DeclarationPage(page);
    const claimPage =await declarationPage.openCreatedClaim(claimDisplayName);
    // ======================================================
    // CREATE CLAIM DETAILS PAGE OBJECT
    // ======================================================
    const conciliatorPage =new DeclarationPage(claimPage);
    // ======================================================
    // VERIFY CONCILIATOR FORM IS AVAILABLE
    // ======================================================
    console.log('');
    console.log('Waiting for Conciliator Declaration form...');
    const contactDetails =claimPage.getByRole('textbox',{name: 'Contact Details *',});
    await contactDetails.waitFor({state: 'visible',timeout: 15000,});
    console.log('Conciliator Declaration form is visible.');
    // ======================================================
    // CONTACT DETAILS
    // ======================================================
    await conciliatorPage.enterContactDetails(declarationData.conciliator.contactDetails);
    // ======================================================
    // PAN NUMBER
    // ======================================================
    await conciliatorPage.enterPanNumber(declarationData.conciliator.panNumber);
    // ======================================================
    // I AGREE CHECKBOXES
    // ======================================================
    await conciliatorPage.selectIAgreeCheckboxes();
    // ======================================================
    // TOTAL MEDIATION
    // ======================================================
    await conciliatorPage.enterTotalNumberOfMediation(declarationData.conciliator.totalNumberOfMediation);
    // ======================================================
    // SUBMIT
    // ======================================================
    await conciliatorPage.clickSubmit();
    await claimPage.waitForTimeout(2000);
    console.log('Conciliator declaration submitted.');
    // ======================================================
    // CLOSE CLAIM DETAILS
    // ======================================================
    await claimPage.close();
    console.log('Conciliator declaration completed successfully.');
}