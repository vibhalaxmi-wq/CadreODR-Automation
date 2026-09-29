import { Page } from '@playwright/test';

import {
    MeetingPages,
} from '../pages/MeetingPages';


// ==========================================================
// MEETING ACTIONS
// ==========================================================

export class MeetingActions {

    private readonly pages: MeetingPages;


    constructor(
        private readonly page: Page
    ) {

        this.pages =
            new MeetingPages(
                page
            );
    }


    // ======================================================
    // SCHEDULE MEETING
    // ======================================================

    async scheduleMeeting(
        platform: string,
        meetingUrl: string,
        dateTime: string,
        duration: string
    ): Promise<void> {

        console.log('');
        console.log(
            '======================================================'
        );

        console.log(
            'STARTING SCHEDULE MEETING ACTION'
        );

        console.log(
            '======================================================'
        );


        // STEP 1
        await this.pages.openScheduleMeeting();


        // STEP 2
        await this.pages.enterPlatform(
            platform
        );


        // STEP 3
        await this.pages.enterUrl(
            meetingUrl
        );


        // STEP 4
        await this.pages.openParticipantDropdown();


        // STEP 5
        await this.pages.selectVibhaClaimant();


        // STEP 6
        await this.pages.closeInviteesDropdown();


        // STEP 7
        await this.pages.verifySelectedParticipant();


        // STEP 8
        await this.pages.enterDateTime(
            dateTime
        );


        // STEP 9
        await this.pages.selectDuration(
            duration
        );


        // STEP 10
        await this.pages.clickSchedule();


        console.log('');
        console.log(
            '======================================================'
        );

        console.log(
            'SCHEDULE MEETING ACTION COMPLETED'
        );

        console.log(
            '======================================================'
        );
    }


    // ======================================================
    // VERIFY MEETING
    // ======================================================

    async verifyScheduledMeeting(
        expectedText: string
    ): Promise<void> {

        await this.pages.openMeetingsTab();


        await this.pages.verifyMeeting(
            expectedText
        );
    }
}