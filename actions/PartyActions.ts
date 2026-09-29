import { Page } from '@playwright/test';

import {
    PartyPages,
} from '../pages/PartyPages';

import {
    partyData,
} from '../testData/partyData';


// ==========================================================
// PARTY ACTIONS
// ==========================================================

export class PartyActions {

    constructor(
        private readonly page: Page
    ) {}


    // ======================================================
    // ADD ALL PARTIES
    // ======================================================

    async addAllParties(): Promise<void> {

        console.log('');
        console.log(
            '======================================================'
        );

        console.log(
            'STARTING PARTY ADDITION'
        );

        console.log(
            '======================================================'
        );


        const partyPages =
            new PartyPages(
                this.page
            );


        // ==================================================
        // 01 - CLAIMANT
        // ==================================================

        console.log('');
        console.log(
            'STEP 01 - ADD CLAIMANT'
        );


        await partyPages.clickAddParty();


        await partyPages.fillName(
            partyData.claimant.name
        );

        await partyPages.fillEmail(
            partyData.claimant.email
        );

        await partyPages.fillPhone(
            partyData.claimant.phone
        );

        await partyPages.fillAddress(
            partyData.claimant.address
        );


        await partyPages.clickAdd();


        // Toast verification

        await partyPages.verifyToast();


        // UI verification

        await partyPages.verifyPartyName(
            partyData.claimant.name
        );


        await partyPages.waitForPartyPageRefresh();


        // ==================================================
        // 02 - CLAIMANT REPRESENTATIVE
        // ==================================================

        console.log('');
        console.log(
            'STEP 02 - ADD CLAIMANT REPRESENTATIVE'
        );


        // CLICK + ADD PARTY AGAIN

        await partyPages.clickAddParty();


        await partyPages.selectRole(
            partyData
                .claimantRepresentative
                .role
        );


        await partyPages.fillName(
            partyData
                .claimantRepresentative
                .name
        );

        await partyPages.fillEmail(
            partyData
                .claimantRepresentative
                .email
        );

        await partyPages.fillPhone(
            partyData
                .claimantRepresentative
                .phone
        );

        await partyPages.fillAddress(
            partyData
                .claimantRepresentative
                .address
        );


        await partyPages.selectRepresentativeFor(
            partyData
                .claimantRepresentative
                .representativeFor
        );


        await partyPages.clickAdd();


        // Toast verification

        await partyPages.verifyToast();


        // ==================================================
        // REPRESENTATIVE VERIFICATION
        // ==================================================
        //
        // Expected UI:
        //
        // Rep: Bruno
        //
        // ==================================================

        await partyPages.verifyRepresentative(
            partyData
                .claimantRepresentative
                .name
        );


        await partyPages.waitForPartyPageRefresh();


        // ==================================================
        // 03 - RESPONDENT
        // ==================================================

        console.log('');
        console.log(
            '======================================================'
        );

        console.log(
            'STEP 03 - ADD RESPONDENT'
        );

        console.log(
            '======================================================'
        );


        // IMPORTANT:
        // CLICK + ADD PARTY AGAIN

        await partyPages.clickAddParty();


        await partyPages.selectRole(
            partyData
                .respondent
                .role
        );


        await partyPages.fillName(
            partyData
                .respondent
                .name
        );

        await partyPages.fillEmail(
            partyData
                .respondent
                .email
        );

        await partyPages.fillPhone(
            partyData
                .respondent
                .phone
        );

        await partyPages.fillAddress(
            partyData
                .respondent
                .address
        );


        await partyPages.clickAdd();


        // Toast verification

        await partyPages.verifyToast();


        // UI verification

        await partyPages.verifyPartyName(
            partyData
                .respondent
                .name
        );


        await partyPages.waitForPartyPageRefresh();


        // ==================================================
        // 04 - RESPONDENT REPRESENTATIVE
        // ==================================================

        console.log('');
        console.log(
            '======================================================'
        );

        console.log(
            'STEP 04 - ADD RESPONDENT REPRESENTATIVE'
        );

        console.log(
            '======================================================'
        );


        // IMPORTANT:
        // CLICK + ADD PARTY AGAIN

        await partyPages.clickAddParty();


        await partyPages.selectRole(
            partyData
                .respondentRepresentative
                .role
        );


        await partyPages.fillName(
            partyData
                .respondentRepresentative
                .name
        );

        await partyPages.fillEmail(
            partyData
                .respondentRepresentative
                .email
        );

        await partyPages.fillPhone(
            partyData
                .respondentRepresentative
                .phone
        );

        await partyPages.fillAddress(
            partyData
                .respondentRepresentative
                .address
        );


        await partyPages.selectRepresentativeFor(
            partyData
                .respondentRepresentative
                .representativeFor
        );


        await partyPages.clickAdd();


        // Toast verification

        await partyPages.verifyToast();


        // ==================================================
        // REPRESENTATIVE VERIFICATION
        // ==================================================
        //
        // Expected UI:
        //
        // Rep: Paul
        //
        // ==================================================

        await partyPages.verifyRepresentative(
            partyData
                .respondentRepresentative
                .name
        );


        // ==================================================
        // COMPLETED
        // ==================================================

        console.log('');
        console.log(
            '======================================================'
        );

        console.log(
            'ALL PARTIES ADDED AND VERIFIED SUCCESSFULLY'
        );

        console.log(
            'Claimant: Mary'
        );

        console.log(
            'Claimant Representative: Rep: Bruno'
        );

        console.log(
            'Respondent: Luca'
        );

        console.log(
            'Respondent Representative: Rep: Paul'
        );

        console.log(
            '======================================================'
        );
    }
}