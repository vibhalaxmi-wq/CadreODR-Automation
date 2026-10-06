import { Page } from '@playwright/test';

import {
    MeetingActions,
} from '../../actions/MeetingActions';

import {
    meetingData,
} from '../../testData/meetingData';


// ==========================================================
// SCHEDULE MEETING SCENARIO
// ==========================================================

export async function scheduleMeetingScenario(
    page: Page
): Promise<void> {

    console.log('');
    console.log(
        '======================================================'
    );

    console.log(
        'SCHEDULE MEETING SCENARIO'
    );

    console.log(
        '======================================================'
    );

    console.log(
        `Current URL: ${page.url()}`
    );

    console.log(
        'Using existing logged-in browser session.'
    );


    const actions =
        new MeetingActions(
            page
        );


    // ======================================================
    // SCHEDULE MEETING
    // ======================================================

    await actions.scheduleMeeting(

        meetingData.platform,

        meetingData.meetingUrl,

        meetingData.dateTime,

        meetingData.duration,

    );


    // ======================================================
    // VERIFY MEETING
    // ======================================================

    /*
     * Keep the existing verification text here.
     *
     * This avoids adding another property to meetingData.
     */

    await actions.verifyScheduledMeeting(
        'Initiated By:Vibha Laxmi'
    );


    console.log('');
    console.log(
        '======================================================'
    );

    console.log(
        'SCHEDULE MEETING SCENARIO COMPLETED SUCCESSFULLY'
    );

    console.log(
        '======================================================'
    );
}