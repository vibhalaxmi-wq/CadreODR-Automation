import {
    Page,
} from '@playwright/test';

import {
    ProceedingsPages,
} from '../pages/ProceedingsPages';

import {
    proceedingsData,
} from '../testData/proceedingsData';


// ==========================================================
// PROCEEDINGS ACTIONS
// ==========================================================

export class ProceedingsActions {

    private readonly proceedingsPages: ProceedingsPages;


    constructor(
        private readonly page: Page
    ) {

        this.proceedingsPages =
            new ProceedingsPages(
                page
            );
    }


    // ======================================================
    // RESPOND TO PROCEEDINGS
    // ======================================================

    async respondToProceedings(): Promise<void> {

        console.log('');
        console.log(
            '======================================================'
        );

        console.log(
            'RESPOND TO PROCEEDINGS - ACTIONS'
        );

        console.log(
            '======================================================'
        );


        // ==================================================
        // TEST DATA
        // ==================================================

        const messageType =
            proceedingsData.messageType;

        const awardDate =
            proceedingsData.awardDate;

        const awardAmount =
            proceedingsData.awardAmount;

        const summary =
            proceedingsData.statementOfClaim;

        const tag =
            proceedingsData.tag;

        const attachmentPath =
            proceedingsData.attachmentPath;


        // ==================================================
        // STEP 1 - CLICK RESPOND
        // ==================================================

        console.log('');
        console.log(
            'STEP 1 - CLICK RESPOND'
        );

        await this.proceedingsPages
            .clickRespondMessage();


        // ==================================================
        // STEP 2 - SELECT MESSAGE TYPE
        // ==================================================

        console.log('');
        console.log(
            `STEP 2 - SELECT MESSAGE TYPE: ${messageType}`
        );

        await this.proceedingsPages
            .selectMessageType(
                messageType
            );


        // ==================================================
        // STEP 3 - AWARD DATE
        // ==================================================

        console.log('');
        console.log(
            `STEP 3 - ENTER AWARD DATE: ${awardDate}`
        );

        await this.proceedingsPages
            .enterAwardDate(
                awardDate
            );


        // ==================================================
        // STEP 4 - AWARD AMOUNT
        // ==================================================

        console.log('');
        console.log(
            `STEP 4 - ENTER AWARD AMOUNT: ${awardAmount}`
        );

        await this.proceedingsPages
            .enterAwardAmount(
                awardAmount
            );


        // ==================================================
        // STEP 5 - SUMMARY
        // ==================================================

        console.log('');
        console.log(
            'STEP 5 - ENTER SUMMARY / STATEMENT'
        );

        await this.proceedingsPages
            .enterStatement(
                summary
            );


        // ==================================================
        // STEP 6 - ATTACHMENT
        // ==================================================

        console.log('');
        console.log(
            'STEP 6 - ATTACH ATTACHMENT'
        );

        console.log(
            `Attachment: ${attachmentPath}`
        );

        await this.proceedingsPages
            .attachFile(
                attachmentPath
            );


        // ==================================================
        // STEP 7 - SELECT TAG
        // ==================================================

        console.log('');
        console.log(
            `STEP 7 - SELECT TAG: ${tag}`
        );

        await this.proceedingsPages
            .selectTag(
                tag
            );


        // ==================================================
        // STEP 8 - FINAL RESPOND
        // ==================================================

        console.log('');
        console.log(
            'STEP 8 - CLICK FINAL RESPOND'
        );

        await this.proceedingsPages
            .clickFinalRespond();


        // ==================================================
        // STEP 9 - CONFIRM
        // ==================================================

        console.log('');
        console.log(
            'STEP 9 - CONFIRM RESPONSE'
        );

        await this.proceedingsPages
            .confirmResponse();


        // ==================================================
        // COMPLETE
        // ==================================================

        console.log('');
        console.log(
            '======================================================'
        );

        console.log(
            'RESPOND TO PROCEEDINGS COMPLETED SUCCESSFULLY'
        );

        console.log(
            '======================================================'
        );
    }
}