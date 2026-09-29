import {
    Locator,
    Page,
} from '@playwright/test';


// ==========================================================
// MESSAGE TAGS LOCATORS
// ==========================================================

export class MessageTagsLocators {

    constructor(
        private readonly page: Page
    ) {}


    // ======================================================
    // TARGET MESSAGE
    // ======================================================
    //
    // We intentionally search only for:
    //
    // First Order
    //
    // We do NOT depend on message number such as:
    //
    // 10.
    // 11.
    //
    // ======================================================

    targetMessage(): Locator {

        return this.page
            .getByText(
                'First Order',
                {
                    exact: true,
                }
            )
            .first();
    }


    // ======================================================
    // MESSAGE CONTAINER
    // ======================================================
    //
    // Codegen showed:
    //
    // #message-947160
    //
    // The numeric ID changes for every message.
    //
    // Therefore we use:
    //
    // starts-with(@id, "message-")
    //
    // instead of hardcoding:
    //
    // #message-947160
    //
    // ======================================================

    messageContainer(): Locator {

        return this
            .targetMessage()
            .locator(
                'xpath=ancestor::*[starts-with(@id, "message-")]'
            )
            .first();
    }


    // ======================================================
    // TRANSLATION / ACTION ICON CONTAINER
    // ======================================================
    //
    // Codegen showed:
    //
    // ._translation-icons_1quil_291
    //
    // The generated suffix can change between builds.
    //
    // Therefore we use:
    //
    // [class*="translation-icons"]
    //
    // ======================================================

    messageActionIcons(): Locator {

        return this
            .messageContainer()
            .locator(
                '[class*="translation-icons"]'
            )
            .first();
    }


    // ======================================================
    // MESSAGE ACTION ICON
    // ======================================================
    //
    // Codegen:
    //
    // img:nth-child(3)
    //
    // CSS nth-child is 1-based.
    //
    // Playwright nth() is 0-based.
    //
    // Therefore:
    //
    // nth(2) = third image
    //
    // ======================================================

    messageActionIcon(): Locator {

        return this
            .messageActionIcons()
            .locator(
                'img'
            )
            .nth(2);
    }


    // ======================================================
    // TAG MENU OPTION
    // ======================================================

    tagMenuOption(
        tag: string
    ): Locator {

        return this.page
            .getByText(
                tag,
                {
                    exact: true,
                }
            )
            .last();
    }


    // ======================================================
    // MARK MESSAGE AS FIRST MESSAGE
    // ======================================================

    firstMessageOption(): Locator {

        return this.page
            .getByText(
                'Mark Message as First Message',
                {
                    exact: true,
                }
            )
            .last();
    }


    // ======================================================
    // MARK MESSAGE AS SECOND ORDER
    // ======================================================

    secondOrderOption(): Locator {

        return this.page
            .getByText(
                'Mark Message as Second Order',
                {
                    exact: true,
                }
            )
            .last();
    }


    // ======================================================
    // MARK MESSAGE AS THIRD ORDER
    // ======================================================

    thirdOrderOption(): Locator {

        return this.page
            .getByText(
                'Mark Message as Third Order',
                {
                    exact: true,
                }
            )
            .last();
    }


    // ======================================================
    // MARK MESSAGE AS FOURTH ORDER
    // ======================================================

    fourthOrderOption(): Locator {

        return this.page
            .getByText(
                'Mark Message as Fourth Order',
                {
                    exact: true,
                }
            )
            .last();
    }
}