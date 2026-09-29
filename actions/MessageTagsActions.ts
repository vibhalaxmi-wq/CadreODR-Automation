import {
    Page,
} from '@playwright/test';

import {
    MessageTagsPages,
} from '../pages/MessageTagsPages';


// ==========================================================
// MESSAGE TAGS ACTIONS
// ==========================================================

export class MessageTagsActions {

    private readonly messageTagsPages: MessageTagsPages;


    constructor(
        private readonly page: Page
    ) {

        this.messageTagsPages =
            new MessageTagsPages(
                page
            );
    }


    // ======================================================
    // ADD MESSAGE TAGS
    // ======================================================

    async addMessageTags(): Promise<void> {

        console.log('');
        console.log(
            '======================================================'
        );

        console.log(
            'STARTING MESSAGE TAGS'
        );

        console.log(
            '======================================================'
        );


        // ==================================================
        // STEP 1
        // ==================================================

        await this.messageTagsPages
            .openTargetMessage();


        // ==================================================
        // STEP 2
        // OPEN MENU
        // ==================================================

        await this.messageTagsPages
            .openMessageTagMenu();


        // ==================================================
        // STEP 3
        // SECOND ORDER
        // ==================================================

        await this.messageTagsPages
            .applySecondOrder();


        // ==================================================
        // STEP 4
        // REOPEN MENU
        // ==================================================

        await this.messageTagsPages
            .openMessageTagMenu();


        // ==================================================
        // STEP 5
        // THIRD ORDER
        // ==================================================

        await this.messageTagsPages
            .applyThirdOrder();


        // ==================================================
        // STEP 6
        // REOPEN MENU
        // ==================================================

        await this.messageTagsPages
            .openMessageTagMenu();


        // ==================================================
        // STEP 7
        // FOURTH ORDER
        // ==================================================

        await this.messageTagsPages
            .applyFourthOrder();


        // ==================================================
        // COMPLETE
        // ==================================================

        console.log('');
        console.log(
            '======================================================'
        );

        console.log(
            'MESSAGE TAGS COMPLETED SUCCESSFULLY'
        );

        console.log(
            'Applied: Second Order'
        );

        console.log(
            'Applied: Third Order'
        );

        console.log(
            'Applied: Fourth Order'
        );

        console.log(
            '======================================================'
        );
    }
}