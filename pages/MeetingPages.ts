import {
    expect,
    Page,
    Locator,
} from '@playwright/test';

import {
    MeetingLocators,
} from '../locators/MeetingLocators';


// ==========================================================
// MEETING PAGES
// ==========================================================

export class MeetingPages {

    private readonly locators: MeetingLocators;


    constructor(
        private readonly page: Page
    ) {

        this.locators =
            new MeetingLocators(
                page
            );
    }


    // ======================================================
    // OPEN SCHEDULE MEETING
    // ======================================================

    async openScheduleMeeting(): Promise<void> {

        console.log('');
        console.log(
            'STEP 1 - OPEN SCHEDULE MEETING'
        );


        const button =
            this.locators.scheduleMeetingButton();


        await expect(
            button
        ).toBeVisible({
            timeout: 15000,
        });


        await button.click();


        const dialog =
            this.locators.meetingDialog();


        await expect(
            dialog
        ).toBeVisible({
            timeout: 15000,
        });


        console.log(
            'Schedule Meeting dialog opened successfully.'
        );
    }


    // ======================================================
    // ENTER PLATFORM
    // ======================================================

    async enterPlatform(
        platform: string
    ): Promise<void> {

        console.log('');
        console.log(
            `STEP 2 - ENTER PLATFORM: ${platform}`
        );


        const textbox =
            this.locators.specifyPlatform();


        await expect(
            textbox
        ).toBeVisible({
            timeout: 10000,
        });


        await textbox.fill(
            platform
        );


        console.log(
            'Platform entered successfully.'
        );
    }


    // ======================================================
    // ENTER URL
    // ======================================================

    async enterUrl(
        url: string
    ): Promise<void> {

        console.log('');
        console.log(
            `STEP 3 - ENTER MEETING URL: ${url}`
        );


        const textbox =
            this.locators.meetingUrl();


        await expect(
            textbox
        ).toBeVisible({
            timeout: 10000,
        });


        await textbox.fill(
            url
        );


        console.log(
            'Meeting URL entered successfully.'
        );
    }


    // ======================================================
    // OPEN INVITEES DROPDOWN
    // ======================================================

    async openParticipantDropdown(): Promise<void> {

        console.log('');
        console.log(
            'STEP 4 - OPEN INVITEES DROPDOWN'
        );


        const dropdown =
            this.locators.inviteesDropdown();


        await expect(
            dropdown
        ).toBeVisible({
            timeout: 10000,
        });


        await dropdown.click();


        const search =
            this.locators.participantSearch();


        await expect(
            search
        ).toBeVisible({
            timeout: 10000,
        });


        console.log(
            'Invitees dropdown opened successfully.'
        );
    }


    // ======================================================
    // SELECT VIBHA CLAIMANT
    // ======================================================

    async selectVibhaClaimant(): Promise<void> {

        console.log('');
        console.log(
            'Selecting Vibha (Claimant)...'
        );


        const search =
            this.locators.participantSearch();


        await expect(
            search
        ).toBeVisible({
            timeout: 10000,
        });


        /*
         * Search specifically for Vibha.
         *
         * We do NOT search for Smith/respondent.
         */

        await search.fill(
            'vibha'
        );


        console.log(
            'Searching for Vibha...'
        );


        // ==================================================
        // FIND VIBHA OPTION
        // ==================================================

        let vibhaOption: Locator | null = null;


        const roleOptions =
            this.locators.vibhaClaimantRoleOption();


        const roleOptionCount =
            await roleOptions.count();


        if (
            roleOptionCount > 0
        ) {

            for (
                let i = 0;
                i < roleOptionCount;
                i++
            ) {

                const option =
                    roleOptions.nth(i);


                if (
                    await option.isVisible()
                ) {

                    vibhaOption =
                        option;

                    break;
                }
            }
        }


        // ==================================================
        // FALLBACK - LISTBOX TEXT
        // ==================================================

        if (
            !vibhaOption
        ) {

            const textOption =
                this.locators.vibhaClaimantTextOption();


            await expect(
                textOption
            ).toBeVisible({
                timeout: 10000,
            });


            vibhaOption =
                textOption;
        }


        // ==================================================
        // CLICK VIBHA
        // ==================================================

        await expect(
            vibhaOption
        ).toBeVisible({
            timeout: 10000,
        });


        await vibhaOption.click();


        console.log(
            'Vibha (Claimant) selected successfully.'
        );
    }


    // ======================================================
    // CLOSE INVITEES DROPDOWN
    // ======================================================

    async closeInviteesDropdown(): Promise<void> {

        console.log('');
        console.log(
            'STEP 5 - CLOSE INVITEES DROPDOWN'
        );


        const selected =
            this.locators.selectedParticipants();


        /*
         * The DOM from the failure shows:
         *
         * combobox "Invitees":
         *     paragraph: 1 Selected
         *
         * Therefore we verify the Invitees control,
         * not the "--Select--" duration control.
         */

        await expect(
            selected
        ).toBeVisible({
            timeout: 10000,
        });


        await expect(
            selected
        ).toHaveText(
            '1 Selected',
            {
                timeout: 10000,
            }
        );


        const search =
            this.locators.participantSearch();


        /*
         * If the participant dropdown is still open,
         * click Invitees exactly ONCE.
         */

        if (
            await search.isVisible()
        ) {

            const dropdown =
                this.locators.inviteesDropdown();


            await expect(
                dropdown
            ).toBeVisible({
                timeout: 10000,
            });


            await dropdown.click();


            console.log(
                'Invitees dropdown clicked once to close it.'
            );
        }


        /*
         * Confirm the participant search is no longer
         * visible before continuing.
         */

        await expect(
            search
        ).toBeHidden({
            timeout: 10000,
        });


        console.log(
            'Invitees dropdown closed successfully.'
        );
    }


    // ======================================================
    // VERIFY SELECTED PARTICIPANT
    // ======================================================

    async verifySelectedParticipant(): Promise<void> {

        console.log('');
        console.log(
            'STEP 6 - VERIFY VIBHA ONLY'
        );


        const selected =
            this.locators.selectedParticipants();


        await expect(
            selected
        ).toBeVisible({
            timeout: 10000,
        });


        await expect(
            selected
        ).toHaveText(
            '1 Selected',
            {
                timeout: 10000,
            }
        );


        console.log(
            'Verified: exactly 1 participant selected.'
        );
    }


    // ======================================================
    // ENTER DATE & TIME
    // ======================================================

    async enterDateTime(
        dateTime: string
    ): Promise<void> {

        console.log('');
        console.log(
            `STEP 7 - ENTER DATE & TIME: ${dateTime}`
        );


        const textbox =
            this.locators.dateTime();


        await expect(
            textbox
        ).toBeVisible({
            timeout: 10000,
        });


        await textbox.fill(
            dateTime
        );


        console.log(
            'Date & Time entered successfully.'
        );
    }


    // ======================================================
    // SELECT DURATION
    // ======================================================

    async selectDuration(
        duration: string
    ): Promise<void> {

        console.log('');
        console.log(
            `STEP 8 - SELECT DURATION: ${duration}`
        );


        const dropdown =
            this.locators.duration();


        await expect(
            dropdown
        ).toBeVisible({
            timeout: 10000,
        });


        await dropdown.click();


        const option =
            this.locators.durationOption(
                duration
            );


        await expect(
            option
        ).toBeVisible({
            timeout: 10000,
        });


        await option.click();


        console.log(
            `Duration selected successfully: ${duration}`
        );
    }


    // ======================================================
    // CLICK SCHEDULE
    // ======================================================

    async clickSchedule(): Promise<void> {

        console.log('');
        console.log(
            'STEP 9 - CLICK SCHEDULE'
        );


        const button =
            this.locators.scheduleButton();


        await expect(
            button
        ).toBeVisible({
            timeout: 10000,
        });


        await expect(
            button
        ).toBeEnabled({
            timeout: 10000,
        });


        await button.click();


        console.log(
            'Schedule button clicked successfully.'
        );


        /*
         * The meeting dialog should close after a
         * successful schedule operation.
         */

        await expect(
            this.locators.meetingDialog()
        ).toBeHidden({
            timeout: 15000,
        });


        console.log(
            'Schedule Meeting dialog closed successfully.'
        );
    }


    // ======================================================
    // OPEN MEETINGS TAB
    // ======================================================

    async openMeetingsTab(): Promise<void> {

        console.log('');
        console.log(
            'STEP 10 - OPEN MEETINGS TAB'
        );


        const tab =
            this.locators.meetingsTab();


        if (
            await tab.count() > 0
        ) {

            await expect(
                tab
            ).toBeVisible({
                timeout: 10000,
            });


            await tab.click();


            console.log(
                'Meetings tab opened successfully.'
            );
        }
    }


    // ======================================================
    // VERIFY SCHEDULED MEETING
    // ======================================================

    async verifyMeeting(
        expectedText: string
    ): Promise<void> {

        console.log('');
        console.log(
            'STEP 11 - VERIFY SCHEDULED MEETING'
        );


        const meeting =
            this.locators.meetingVerificationText(
                expectedText
            );


        await expect(
            meeting
        ).toBeVisible({
            timeout: 20000,
        });


        console.log(
            `Meeting verified successfully using: ${expectedText}`
        );
    }
}