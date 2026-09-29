import { Page } from '@playwright/test';
import {ArbitrationPages,} from '../pages/ArbitrationPages';
import {arbitrationData,} from '../testData/arbitrationData';
// ==========================================================
// ARBITRATION ACTIONS
// ==========================================================
export class ArbitrationActions {
    constructor(
        private readonly page: Page
    ) {}
    // ======================================================
    // CREATE ARBITRATION CLAIM
    // ======================================================
    async createArbitrationClaim(): Promise<string> {
        console.log('');
        console.log('======================================================');
        console.log('STARTING ARBITRATION CLAIM CREATION');
        console.log('======================================================');
        const arbitrationPage =new ArbitrationPages(this.page);
        // ==================================================
        // OPEN NEW CLAIM
        // ==================================================
        await arbitrationPage.openNewClaim();
        // ==================================================
        // ORGANIZATION
        // ==================================================
        await arbitrationPage.selectOrganization(arbitrationData.organization);
        // ==================================================
        // CLAIMANT
        // ==================================================
        await arbitrationPage.addClaimant(arbitrationData.claimant.name, arbitrationData.claimant.email,arbitrationData.claimant.phone,arbitrationData.claimant.address);
        // ==================================================
        // RESPONDENT
        // ==================================================
        await arbitrationPage.addRespondent(arbitrationData.respondent.name,arbitrationData.respondent.email,arbitrationData.respondent.phone,arbitrationData.respondent.address,arbitrationData.respondent.role);
        // ==================================================
        // DISPUTE AMOUNT
        // ==================================================
        await arbitrationPage.enterDisputeAmount(arbitrationData.claim.disputeAmount);
        // ==================================================
        // CONTRACT
        // ==================================================
        await arbitrationPage.enterContract(arbitrationData.claim.contract);
        // ==================================================
        // JURISDICTION
        // ==================================================
        await arbitrationPage.enterJurisdiction(arbitrationData.claim.jurisdiction);
        // ==================================================
        // DISPUTE TYPE
        // ==================================================
        await arbitrationPage.selectDisputeType(arbitrationData.claim.disputeType);
        // ==================================================
        // CLAIM TYPE
        // ==================================================
        await arbitrationPage.selectClaimType(arbitrationData.claim.claimType);
        // ==================================================
        // SUMMARY
        // ==================================================
        await arbitrationPage.enterSummary(arbitrationData.claim.summary);
        // ==================================================
        // LOG CLAIM
        // ==================================================
        await arbitrationPage.logClaim();
        // ==================================================
        // VERIFY TOAST
        // ==================================================
        await arbitrationPage.verifySuccessToast();
        // ==================================================
        // GET CLAIM DISPLAY NAME
        // ==================================================
        const claimDisplayName =await arbitrationPage.getClaimDisplayName();
        // ==================================================
        // FINAL LOG
        // ==================================================
        console.log('');
        console.log('======================================================');
        console.log('ARBITRATION CLAIM CREATED SUCCESSFULLY');
        console.log(`Claim: ${claimDisplayName}`);
        console.log('USER REMAINS LOGGED IN');
        console.log('======================================================');
        return claimDisplayName;
    }
}