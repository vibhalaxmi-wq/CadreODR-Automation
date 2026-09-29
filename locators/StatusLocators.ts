import {
    Locator,
    Page,
} from '@playwright/test';


// ==========================================================
// STATUS LOCATORS
// ==========================================================

export class StatusLocators {

    constructor(
        private readonly page: Page
    ) {}


    // ======================================================
    // SCROLL TO TOP
    // ======================================================

    scrollToTop(): Locator {

        return this.page
            .locator('div')
            .filter({
                hasText: /^Scroll To Top$/,
            })
            .first();
    }


    // ======================================================
    // EDIT STATUS ICON
    // ======================================================

    editStatus(): Locator {

        return this.page.getByRole(
            'img',
            {
                name: 'Edit status',
            }
        );
    }


    // ======================================================
    // STATUS OPTION
    // ======================================================

    statusOption(
        status: string
    ): Locator {

        return this.page
            .locator('div')
            .filter({
                hasText: new RegExp(
                    `^${this.escapeRegExp(status)}$`
                ),
            })
            .last();
    }


    // ======================================================
    // UPDATE BUTTON
    // ======================================================

    updateButton(): Locator {

        return this.page.getByRole(
            'button',
            {
                name: 'Update',
                exact: true,
            }
        );
    }


    // ======================================================
    // VERIFIED STATUS
    // ======================================================

    verifiedStatus(
        status: string
    ): Locator {

        return this.page
            .locator('div')
            .filter({
                hasText: new RegExp(
                    `^${this.escapeRegExp(status)}$`
                ),
            })
            .last();
    }


    // ======================================================
    // ESCAPE REGEX
    // ======================================================

    private escapeRegExp(
        value: string
    ): string {

        return value.replace(
            /[.*+?^${}()|[\]\\]/g,
            '\\$&'
        );
    }
}