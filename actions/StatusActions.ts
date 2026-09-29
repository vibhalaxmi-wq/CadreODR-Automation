import {
    Page,
} from '@playwright/test';

import {
    StatusPages,
} from '../pages/StatusPages';

import {
    statusData,
} from '../testData/statusData';


// ==========================================================
// STATUS ACTIONS
// ==========================================================

export class StatusActions {

    private readonly statusPages: StatusPages;


    constructor(
        private readonly page: Page
    ) {

        this.statusPages =
            new StatusPages(
                page
            );
    }


    // ======================================================
    // CHANGE ALL STATUSES
    // ======================================================

    async changeAllStatuses(): Promise<void> {

        console.log('');
        console.log(
            '======================================================'
        );

        console.log(
            'STARTING STATUS CHANGE FLOW'
        );

        console.log(
            '======================================================'
        );


        // ==================================================
        // IMPORTANT:
        //
        // SCROLL TO TOP ONLY ONCE.
        //
        // The page comes from Message Tags in the
        // Proceedings tab and may be scrolled down.
        // ==================================================

        await this.statusPages
            .scrollToTop();


        // ==================================================
        // CHANGE STATUSES ONE BY ONE
        // ==================================================

        for (
            const status
            of statusData.statuses
        ) {

            console.log('');
            console.log(
                '------------------------------------------------------'
            );

            console.log(
                `Processing status: ${status}`
            );

            console.log(
                '------------------------------------------------------'
            );


            await this.statusPages
                .changeStatus(
                    status
                );


            console.log(
                `Status completed and verified: ${status}`
            );
        }


        // ==================================================
        // COMPLETE
        // ==================================================

        console.log('');
        console.log(
            '======================================================'
        );

        console.log(
            'ALL STATUS CHANGES COMPLETED SUCCESSFULLY'
        );

        console.log(
            '======================================================'
        );
    }
}