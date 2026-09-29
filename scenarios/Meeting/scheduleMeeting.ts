import { Page } from '@playwright/test';

import {
    MeetingActions,
} from '../../actions/MeetingActions';


// ==========================================================
// MEETING TEST DATA
// ==========================================================

const meetingData = {

    platform:
        'Google',

    meetingUrl:
        'https://www.google.com',

    dateTime:
        '2026-10-05T11:30',

    duration:
        '15 mins',

    /*
     * Use a stable piece of text for verification.
     *
     * Do not include dynamic created-at timestamps here.
     */

    verificationText:
        'Initiated By:Vibha Laxmi',

};


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
    // SCHEDULE
    // ======================================================

    await actions.scheduleMeeting(

        meetingData.platform,

        meetingData.meetingUrl,

        meetingData.dateTime,

        meetingData.duration,

    );


    // ======================================================
    // VERIFY
    // ======================================================

    await actions.verifyScheduledMeeting(
        meetingData.verificationText
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