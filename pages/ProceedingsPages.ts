import {
    expect,
    Page,
} from '@playwright/test';

import fs from 'fs';
import path from 'path';

import {
    ProceedingsLocators,
} from '../locators/ProceedingsLocators';


// ==========================================================
// PROCEEDINGS PAGES
// ==========================================================

export class ProceedingsPages {

    constructor(
        private readonly page: Page
    ) {}


    // ==========================================================
    // 1. CLICK INITIAL RESPOND
    // ==========================================================

    async clickRespondMessage(): Promise<void> {

        console.log('');
        console.log('STEP 1 - Clicking Respond...');

        const responseDialog =
            this.page.getByRole(
                'dialog',
                {
                    name: 'Response',
                }
            );

        // ------------------------------------------------------
        // INITIAL RESPOND
        // ------------------------------------------------------

        const respondControls =
            this.page.getByText(
                'Respond',
                {
                    exact: true,
                }
            );

        const count =
            await respondControls.count();

        console.log(
            `Respond text controls found: ${count}`
        );

        if (count === 0) {

            throw new Error(
                [
                    'Initial Respond control was not found.',
                    'Expected visible text: Respond',
                    `Current URL: ${this.page.url()}`,
                ].join('\n')
            );
        }

        const respond =
            respondControls.last();

        await expect(
            respond
        ).toBeVisible({
            timeout: 15000,
        });

        await respond.scrollIntoViewIfNeeded();

        await respond.click();

        console.log(
            'Initial Respond clicked successfully.'
        );

        // ------------------------------------------------------
        // RESPONSE DIALOG
        // ------------------------------------------------------

        await expect(
            responseDialog
        ).toBeVisible({
            timeout: 15000,
        });

        console.log(
            'Proceedings response form opened.'
        );
    }


    // ==========================================================
    // 2. SELECT MESSAGE TYPE
    // ==========================================================

    async selectMessageType(
        messageType: string
    ): Promise<void> {

        console.log('');
        console.log(
            `STEP 2 - Selecting Message Type: ${messageType}`
        );

        const responseDialog =
            this.page.getByRole(
                'dialog',
                {
                    name: 'Response',
                }
            );

        await expect(
            responseDialog
        ).toBeVisible({
            timeout: 15000,
        });

        const messageTypeField =
            responseDialog.getByRole(
                'combobox',
                {
                    name: 'Message Type',
                }
            );

        await expect(
            messageTypeField
        ).toBeVisible({
            timeout: 15000,
        });

        await messageTypeField.click();

        console.log(
            'Message Type dropdown opened.'
        );

        // ------------------------------------------------------
        // SEARCH OPTIONS
        // ------------------------------------------------------

        const searchOptions =
            this.page.getByRole(
                'combobox',
                {
                    name: 'Search options',
                }
            ).last();

        if (
            await searchOptions.count() > 0 &&
            await searchOptions.isVisible().catch(() => false)
        ) {

            await searchOptions.fill(
                messageType
            );

            console.log(
                `Searching Message Type: ${messageType}`
            );
        }

        // ------------------------------------------------------
        // OPTION
        // ------------------------------------------------------

        const option =
            this.page.getByRole(
                'option',
                {
                    name: messageType,
                    exact: true,
                }
            ).last();

        await expect(
            option
        ).toBeVisible({
            timeout: 15000,
        });

        await option.click();

        console.log(
            `Message Type selected: ${messageType}`
        );
    }


    // ==========================================================
    // 3. ENTER AWARD DATE
    // ==========================================================

    async enterAwardDate(
        value: string
    ): Promise<void> {

        console.log('');
        console.log(
            `STEP 3 - Entering Award Date: ${value}`
        );

        const responseDialog =
            this.page.getByRole(
                'dialog',
                {
                    name: 'Response',
                }
            );

        const field =
            responseDialog.getByRole(
                'textbox',
                {
                    name: 'Award Date *',
                }
            );

        await expect(
            field
        ).toBeVisible({
            timeout: 15000,
        });

        await field.fill(
            value
        );

        console.log(
            'Award Date entered successfully.'
        );
    }


    // ==========================================================
    // 4. ENTER AWARD AMOUNT
    // ==========================================================

    async enterAwardAmount(
        value: string
    ): Promise<void> {

        console.log('');
        console.log(
            `STEP 4 - Entering Award Amount: ${value}`
        );

        const responseDialog =
            this.page.getByRole(
                'dialog',
                {
                    name: 'Response',
                }
            );

        const field =
            responseDialog.getByRole(
                'textbox',
                {
                    name: 'Award Amount *',
                }
            );

        await expect(
            field
        ).toBeVisible({
            timeout: 15000,
        });

        await field.fill(
            value
        );

        console.log(
            'Award Amount entered successfully.'
        );
    }


    // ==========================================================
    // 5. ENTER STATEMENT
    // ==========================================================

    async enterStatement(
        value: string
    ): Promise<void> {

        console.log('');
        console.log(
            'STEP 5 - Entering Summary / Statement...'
        );

        const responseDialog =
            this.page.getByRole(
                'dialog',
                {
                    name: 'Response',
                }
            );

        const field =
            responseDialog.getByRole(
                ProceedingsLocators
                    .statementOfClaimDefense
                    .role,
                {
                    name:
                        ProceedingsLocators
                            .statementOfClaimDefense
                            .name,
                }
            );

        await expect(
            field
        ).toBeVisible({
            timeout: 15000,
        });

        await field.fill(
            value
        );

        console.log(
            'Summary / Statement entered successfully.'
        );
    }


    // ==========================================================
    // 6. ATTACH FILE
    // ==========================================================

    async attachFile(
        filePathOrName: string
    ): Promise<void> {

        console.log('');
        console.log(
            'STEP 6 - Attaching file...'
        );

        if (
            !filePathOrName ||
            filePathOrName.trim().length === 0
        ) {

            throw new Error(
                'Attachment file path/name is empty.'
            );
        }

        const suppliedPath =
            filePathOrName.trim();

        const attachmentFolder =
            'C:\\Users\\SPURGE\\Documents\\Test File';

        let resolvedPath: string;

        if (
            path.isAbsolute(
                suppliedPath
            )
        ) {

            resolvedPath =
                suppliedPath;

            console.log(
                'Full attachment path supplied.'
            );

        } else {

            resolvedPath =
                path.join(
                    attachmentFolder,
                    suppliedPath
                );

            console.log(
                'Attachment filename supplied.'
            );
        }

        resolvedPath =
            path.normalize(
                resolvedPath
            );

        const fileName =
            path.basename(
                resolvedPath
            );

        console.log(
            `Attachment input: ${suppliedPath}`
        );

        console.log(
            `Final attachment path: ${resolvedPath}`
        );

        console.log(
            `Attachment file name: ${fileName}`
        );

        if (
            !fs.existsSync(
                resolvedPath
            )
        ) {

            throw new Error(
                [
                    'Attachment file was not found.',
                    `Expected path: ${resolvedPath}`,
                ].join('\n')
            );
        }

        console.log(
            'Attachment file exists.'
        );

        const fileInput =
            this.page.locator(
                ProceedingsLocators.fileInput
            );

        await expect(
            fileInput
        ).toHaveCount(
            1,
            {
                timeout: 10000,
            }
        );

        console.log(
            'File input located.'
        );

        await fileInput.setInputFiles(
            resolvedPath
        );

        console.log(
            'File uploaded using setInputFiles().'
        );

        console.log(
            'Waiting for attachment processing...'
        );

        await this.page.waitForTimeout(
            1000
        );

        const uploadedFile =
            this.page.getByRole(
                'heading',
                {
                    name: fileName,
                    exact: true,
                }
            ).last();

        await expect(
            uploadedFile
        ).toBeVisible({
            timeout: 15000,
        });

        console.log(
            `Uploaded file verified on UI: ${fileName}`
        );

        console.log(
            'File upload completed successfully.'
        );
    }


    // ==========================================================
    // 7. SELECT TAG
    // ==========================================================
    //
    // IMPORTANT CADRE UI BEHAVIOUR:
    //
    // Select Tag appears twice:
    //
    // FIRST:
    //     button/control
    //
    // SECOND:
    //     dropdown/combobox
    //
    // We MUST click the first control first.
    // ==========================================================

    async selectTag(
        tag: string
    ): Promise<void> {

        console.log('');
        console.log(
            `STEP 7 - Selecting Tag: ${tag}`
        );

        const responseDialog =
            this.page.getByRole(
                'dialog',
                {
                    name: 'Response',
                }
            );

        await expect(
            responseDialog
        ).toBeVisible({
            timeout: 15000,
        });

        console.log(
            'Waiting for Select Tag controls to render...'
        );

        await this.page.waitForTimeout(
            1000
        );

        // ------------------------------------------------------
        // FIRST SELECT TAG
        // ------------------------------------------------------

        const selectTagControls =
            responseDialog.getByText(
                'Select Tag',
                {
                    exact: true,
                }
            );

        const selectTagCount =
            await selectTagControls.count();

        console.log(
            `Select Tag controls found: ${selectTagCount}`
        );

        if (
            selectTagCount === 0
        ) {

            throw new Error(
                'No Select Tag control was found inside Response dialog.'
            );
        }

        const firstSelectTag =
            selectTagControls.first();

        await expect(
            firstSelectTag
        ).toBeVisible({
            timeout: 15000,
        });

        await firstSelectTag.scrollIntoViewIfNeeded();

        console.log(
            'First Select Tag control is visible.'
        );

        await firstSelectTag.click();

        console.log(
            'First Select Tag clicked successfully.'
        );

        // ------------------------------------------------------
        // SECOND SELECT TAG
        // ------------------------------------------------------

        await this.page.waitForTimeout(
            500
        );

        const dropdownSelectTag =
            responseDialog.getByRole(
                'combobox',
                {
                    name: 'Select Tag',
                }
            ).last();

        if (
            await dropdownSelectTag.count() > 0 &&
            await dropdownSelectTag.isVisible().catch(() => false)
        ) {

            console.log(
                'Second Select Tag dropdown found as combobox.'
            );

            await dropdownSelectTag.click();

            console.log(
                'Second Select Tag dropdown clicked.'
            );

        } else {

            console.log(
                'Second Select Tag is not exposed as a combobox.'
            );

            const secondSelectTag =
                responseDialog.getByText(
                    'Select Tag',
                    {
                        exact: true,
                    }
                ).last();

            await expect(
                secondSelectTag
            ).toBeVisible({
                timeout: 10000,
            });

            await secondSelectTag.click();

            console.log(
                'Second Select Tag clicked successfully.'
            );
        }

        // ------------------------------------------------------
        // SEARCH OPTIONS
        // ------------------------------------------------------

        const searchOptions =
            this.page.getByRole(
                'combobox',
                {
                    name: 'Search options',
                }
            ).last();

        if (
            await searchOptions.count() > 0 &&
            await searchOptions.isVisible().catch(() => false)
        ) {

            await searchOptions.fill(
                tag
            );

            console.log(
                `Searching tag: ${tag}`
            );
        }

        // ------------------------------------------------------
        // SELECT TAG OPTION
        // ------------------------------------------------------

        const tagOption =
            this.page.getByRole(
                'option',
                {
                    name: tag,
                    exact: true,
                }
            ).last();

        await expect(
            tagOption
        ).toBeVisible({
            timeout: 15000,
        });

        await tagOption.click();

        console.log(
            `Tag selected successfully: ${tag}`
        );
    }


    // ==========================================================
    // 8. CLICK FINAL RESPOND
    // ==========================================================

    async clickFinalRespond(): Promise<void> {

        console.log('');
        console.log(
            'STEP 8 - Clicking final Respond...'
        );

        const responseDialog =
            this.page.getByRole(
                'dialog',
                {
                    name: 'Response',
                }
            );

        await expect(
            responseDialog
        ).toBeVisible({
            timeout: 15000,
        });

        const finalRespond =
            responseDialog.getByRole(
                'button',
                {
                    name: 'Respond',
                    exact: true,
                }
            ).last();

        await expect(
            finalRespond
        ).toBeVisible({
            timeout: 15000,
        });

        await finalRespond.scrollIntoViewIfNeeded();

        await finalRespond.click();

        console.log(
            'Final Respond clicked successfully.'
        );

        // ------------------------------------------------------
        // IMPORTANT:
        //
        // Wait for the Success dialog before returning.
        // ------------------------------------------------------

        console.log(
            'Waiting for response confirmation popup...'
        );

        await expect(
            this.page.getByRole(
                'dialog',
                {
                    name: 'Success',
                }
            )
        ).toBeVisible({
            timeout: 15000,
        });

        console.log(
            'Success dialog displayed.'
        );
    }


    // ==========================================================
    // 9. CONFIRM RESPONSE
    // ==========================================================
    //
    // ACTUAL CADRE UI:
    //
    // dialog "Success"
    //     heading "Success"
    //     paragraph "Message sent successfully"
    //     button "Ok"
    //
    // IMPORTANT:
    // It is "Ok", NOT "OK".
    //
    // Therefore exact "OK" will never match.
    // ==========================================================

    async confirmResponse(): Promise<void> {

        console.log('');
        console.log(
            'STEP 9 - Confirming response...'
        );

        // ------------------------------------------------------
        // SUCCESS DIALOG
        // ------------------------------------------------------

        const successDialog =
            this.page.getByRole(
                'dialog',
                {
                    name: 'Success',
                }
            );

        await expect(
            successDialog
        ).toBeVisible({
            timeout: 15000,
        });

        console.log(
            'Success dialog detected.'
        );

        // ------------------------------------------------------
        // VERIFY SUCCESS MESSAGE
        // ------------------------------------------------------

        await expect(
            successDialog.getByText(
                'Message sent successfully',
                {
                    exact: true,
                }
            )
        ).toBeVisible({
            timeout: 10000,
        });

        console.log(
            'Message sent successfully confirmation verified.'
        );

        // ------------------------------------------------------
        // ACTUAL BUTTON NAME IS "Ok"
        // ------------------------------------------------------

        const okButton =
            successDialog.getByRole(
                'button',
                {
                    name: 'Ok',
                    exact: true,
                }
            );

        await expect(
            okButton
        ).toBeVisible({
            timeout: 10000,
        });

        await okButton.scrollIntoViewIfNeeded();

        console.log(
            'Ok button is visible.'
        );

        await okButton.click();

        console.log(
            'Ok button clicked successfully.'
        );

        // ------------------------------------------------------
        // VERIFY SUCCESS DIALOG CLOSED
        // ------------------------------------------------------

        await expect(
            successDialog
        ).toBeHidden({
            timeout: 10000,
        });

        console.log(
            'Success dialog closed successfully.'
        );
    }
}