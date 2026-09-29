import {
    expect,
    Page,
} from '@playwright/test';

import {
    StatusLocators,
} from '../locators/StatusLocators';


// ==========================================================
// STATUS PAGES
// ==========================================================

export class StatusPages {

    private readonly locators: StatusLocators;


    constructor(
        private readonly page: Page
    ) {

        this.locators =
            new StatusLocators(
                page
            );
    }


    // ======================================================
    // STEP 01 - SCROLL TO TOP
    // ======================================================

    async scrollToTop(): Promise<void> {

        console.log('');
        console.log(
            '======================================================'
        );

        console.log(
            'SCROLLING TO TOP BEFORE STATUS CHANGE'
        );

        console.log(
            '======================================================'
        );


        const scrollToTop =
            this.locators.scrollToTop();


        const visible =
            await scrollToTop
                .isVisible()
                .catch(
                    () => false
                );


        if (
            visible
        ) {

            console.log(
                'Scroll To Top button found.'
            );


            await scrollToTop
                .scrollIntoViewIfNeeded();


            await scrollToTop.click();


            console.log(
                'Scroll To Top clicked successfully.'
            );

        } else {

            console.log(
                'Scroll To Top button is not visible.'
            );

            console.log(
                'Using page scroll fallback.'
            );


            await this.page.evaluate(() => {

                window.scrollTo(
                    0,
                    0
                );

            });

        }


        await this.page.waitForTimeout(
            1000
        );


        console.log(
            'Page is now at the top.'
        );
    }


    // ======================================================
    // STEP 02 - OPEN STATUS DROPDOWN
    // ======================================================

    async openStatusDropdown(): Promise<void> {

        console.log('');
        console.log(
            'Opening current status control...'
        );


        const editStatus =
            this.locators.editStatus();


        await expect(
            editStatus
        ).toBeVisible({
            timeout: 15000,
        });


        console.log(
            'Edit Status control found.'
        );


        await editStatus
            .scrollIntoViewIfNeeded();


        await editStatus.click();


        await this.page.waitForTimeout(
            500
        );


        console.log(
            'Status dropdown opened successfully.'
        );
    }


    // ======================================================
    // STEP 03 - CHANGE STATUS
    // ======================================================

    async changeStatus(
        status: string
    ): Promise<void> {

        console.log('');
        console.log(
            '======================================================'
        );

        console.log(
            `CHANGING STATUS TO: ${status}`
        );

        console.log(
            '======================================================'
        );


        // ==================================================
        // IMPORTANT:
        //
        // DO NOT SCROLL TO TOP HERE.
        //
        // Scroll To Top is performed only once by the
        // scenario before the status loop starts.
        // ==================================================


        // ==================================================
        // OPEN STATUS CONTROL
        // ==================================================

        await this.openStatusDropdown();


        // ==================================================
        // FIND STATUS OPTION
        // ==================================================

        const statusOption =
            this.locators.statusOption(
                status
            );


        await expect(
            statusOption
        ).toBeVisible({
            timeout: 15000,
        });


        console.log(
            `Status option visible: ${status}`
        );


        // ==================================================
        // SELECT STATUS
        // ==================================================

        await statusOption
            .scrollIntoViewIfNeeded();


        await statusOption.click();


        console.log(
            `Status selected: ${status}`
        );


        // ==================================================
        // UPDATE
        // ==================================================

        const updateButton =
            this.locators.updateButton();


        await expect(
            updateButton
        ).toBeVisible({
            timeout: 10000,
        });


        await updateButton.click();


        console.log(
            `Update clicked for status: ${status}`
        );


        // ==================================================
        // WAIT FOR UPDATE
        // ==================================================

        await this.page.waitForTimeout(
            1000
        );


        // ==================================================
        // VERIFY STATUS
        // ==================================================

        await this.verifyStatus(
            status
        );
    }


    // ======================================================
    // STEP 04 - VERIFY STATUS
    // ======================================================

    async verifyStatus(
        status: string
    ): Promise<void> {

        console.log('');
        console.log(
            `Verifying status in UI: ${status}`
        );


        const verifiedStatus =
            this.locators.verifiedStatus(
                status
            );


        await expect(
            verifiedStatus
        ).toBeVisible({
            timeout: 15000,
        });


        console.log(
            `Status verified successfully in UI: ${status}`
        );
    }
}