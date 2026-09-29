import { Locator, Page } from '@playwright/test';


// ==========================================================
// MEETING LOCATORS
// ==========================================================

export class MeetingLocators {

    constructor(
        private readonly page: Page
    ) {}


    // ======================================================
    // ADD USER / SCHEDULE MEETING DIALOG
    // ======================================================

    meetingDialog(): Locator {

        return this.page.getByRole(
            'dialog',
            {
                name: 'Add User',
            }
        );
    }


    // ======================================================
    // SCHEDULE MEETING BUTTON
    // ======================================================

    scheduleMeetingButton(): Locator {

        return this.page.getByRole(
            'button',
            {
                name: 'Schedule Meeting',
                exact: true,
            }
        );
    }


    // ======================================================
    // PLATFORM
    // ======================================================

    specifyPlatform(): Locator {

        return this.meetingDialog().getByRole(
            'textbox',
            {
                name: 'Specify Platform *',
                exact: true,
            }
        );
    }


    // ======================================================
    // MEETING URL
    // ======================================================

    meetingUrl(): Locator {

        return this.meetingDialog().getByRole(
            'textbox',
            {
                name: 'URL *',
                exact: true,
            }
        );
    }


    // ======================================================
    // INVITEES DROPDOWN
    // ======================================================

    inviteesDropdown(): Locator {

        return this.meetingDialog().getByRole(
            'combobox',
            {
                name: 'Invitees',
                exact: true,
            }
        );
    }


    // ======================================================
    // PARTICIPANT SEARCH
    // ======================================================

    participantSearch(): Locator {

        return this.page.getByRole(
            'combobox',
            {
                name: 'Search options',
                exact: true,
            }
        ).last();
    }


    // ======================================================
    // VIBHA CLAIMANT - ROLE OPTION
    // ======================================================

    vibhaClaimantRoleOption(): Locator {

        return this.page.getByRole(
            'option',
            {
                name: 'Vibha (Claimant)',
                exact: true,
            }
        );
    }


    // ======================================================
    // VIBHA CLAIMANT - TEXT FALLBACK
    // ======================================================

    vibhaClaimantTextOption(): Locator {

        return this.page
            .locator('[role="listbox"]')
            .getByText(
                'Vibha (Claimant)',
                {
                    exact: true,
                }
            );
    }


    // ======================================================
    // SELECTED PARTICIPANT
    // ======================================================

    selectedParticipants(): Locator {

        return this.inviteesDropdown().getByText(
            '1 Selected',
            {
                exact: true,
            }
        );
    }


    // ======================================================
    // DATE & TIME
    // ======================================================

    dateTime(): Locator {

        return this.meetingDialog().getByRole(
            'textbox',
            {
                name: 'Date & Time *',
                exact: true,
            }
        );
    }


    // ======================================================
    // DURATION
    // ======================================================

    duration(): Locator {

        return this.meetingDialog().getByRole(
            'combobox',
            {
                name: 'Duration *',
                exact: true,
            }
        );
    }


    // ======================================================
    // DURATION OPTION
    // ======================================================

    durationOption(
        duration: string
    ): Locator {

        return this.page.getByText(
            duration,
            {
                exact: true,
            }
        ).last();
    }


    // ======================================================
    // SCHEDULE BUTTON
    // ======================================================

    scheduleButton(): Locator {

        return this.meetingDialog().getByRole(
            'button',
            {
                name: 'Schedule',
                exact: true,
            }
        );
    }


    // ======================================================
    // MEETINGS TAB
    // ======================================================

    meetingsTab(): Locator {

        return this.page.getByRole(
            'tab',
            {
                name: 'Meetings',
                exact: true,
            }
        );
    }


    // ======================================================
    // MEETING VERIFICATION
    // ======================================================

    meetingVerificationText(
        expectedText: string
    ): Locator {

        return this.page.getByText(
            expectedText,
            {
                exact: false,
            }
        ).last();
    }
}