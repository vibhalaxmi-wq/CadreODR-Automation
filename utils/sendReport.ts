import { google } from 'googleapis';
import fs from 'node:fs';
import path from 'node:path';

// ==========================================================
// FILE PATHS
// ==========================================================

const CREDENTIALS_PATH = path.resolve(
    __dirname,
    '../credentials.json'
);

const TOKEN_PATH = path.resolve(
    __dirname,
    '../token.json'
);

// ==========================================================
// PLAYWRIGHT TEST RESULTS
// ==========================================================

const TEST_RESULTS_PATH = path.resolve(
    __dirname,
    '../test-results'
);

// ==========================================================
// EMAIL CONFIGURATION
// ==========================================================

const RECIPIENT1 =
    'tech_team@thecadre.in';

const SENDER =
    'vibha.laxmi@thecadre.in';

// ==========================================================
// TYPES
// ==========================================================

export interface ScenarioResult {

    name: string;

    status:
        | 'PASSED'
        | 'FAILED'
        | 'SKIPPED';

    error?: string;
}

export interface SuiteReport {

    totalScenarios: number;

    passedScenarios: number;

    failedScenarios: number;

    skippedScenarios: number;

    scenarios: ScenarioResult[];
}

// ==========================================================
// GET GMAIL AUTHENTICATION
// ==========================================================

async function getSavedAuth() {

    // ------------------------------------------------------
    // CHECK CREDENTIALS
    // ------------------------------------------------------

    if (
        !fs.existsSync(
            CREDENTIALS_PATH
        )
    ) {

        throw new Error(
            `credentials.json not found:\n${CREDENTIALS_PATH}`
        );
    }

    // ------------------------------------------------------
    // CHECK TOKEN
    // ------------------------------------------------------

    if (
        !fs.existsSync(
            TOKEN_PATH
        )
    ) {

        throw new Error(
            `token.json not found:\n${TOKEN_PATH}`
        );
    }

    // ------------------------------------------------------
    // READ CREDENTIALS
    // ------------------------------------------------------

    const credentials =
        JSON.parse(
            fs.readFileSync(
                CREDENTIALS_PATH,
                'utf8'
            )
        );

    // ------------------------------------------------------
    // GET CONFIGURATION
    // ------------------------------------------------------

    const config =
        credentials.installed ??
        credentials.web;

    if (!config) {

        throw new Error(
            'Invalid credentials.json. Expected "installed" or "web".'
        );
    }

    // ------------------------------------------------------
    // CREATE OAUTH CLIENT
    // ------------------------------------------------------

    const auth =
        new google.auth.OAuth2(
            config.client_id,
            config.client_secret,
            config.redirect_uris[0]
        );

    // ------------------------------------------------------
    // READ TOKEN
    // ------------------------------------------------------

    const token =
        JSON.parse(
            fs.readFileSync(
                TOKEN_PATH,
                'utf8'
            )
        );

    // ------------------------------------------------------
    // SET TOKEN
    // ------------------------------------------------------

    auth.setCredentials(
        token
    );

    return auth;
}

// ==========================================================
// CREATE EMAIL BODY
// ==========================================================

function createEmail(
    report: SuiteReport
): string {

    const overallStatus =
        report.failedScenarios === 0 &&
        report.skippedScenarios === 0
            ? 'PASSED'
            : 'FAILED';

    let body = '';

    // ======================================================
    // SUITE SUMMARY
    // ======================================================

    body +=
        'CADRE ODR SANITY TEST REPORT\n';

    body +=
        '\n';

    body +=
        '======================================================\n';

    body +=
        'SUITE SUMMARY\n';

    body +=
        '======================================================\n';

    body +=
        `Overall Status : ${overallStatus}\n`;

    body +=
        `Total Scenarios : ${report.totalScenarios}\n`;

    body +=
        `Passed          : ${report.passedScenarios}\n`;

    body +=
        `Failed          : ${report.failedScenarios}\n`;

    body +=
        `Skipped         : ${report.skippedScenarios}\n`;

    body +=
        '======================================================\n';

    body +=
        '\n';

    // ======================================================
    // SCENARIOS COVERED
    // ======================================================

    body +=
        'SCENARIOS COVERED\n';

    body +=
        '======================================================\n';

    report.scenarios.forEach(
        (
            scenario,
            index
        ) => {

            body +=
                `${index + 1}. ${scenario.name} - ${scenario.status}\n`;

            if (
                scenario.error
            ) {

                body +=
                    `   Error: ${scenario.error}\n`;
            }
        }
    );

    body +=
        '\n';

    // ======================================================
    // AUTOMATED MESSAGE
    // ======================================================

    body +=
        '======================================================\n';

    body +=
        'This report mail was sent automatically by Playwright after execution of the script.\n';

    return body;
}

// ==========================================================
// FIND ONLY PLAYWRIGHT FAILURE SCREENSHOTS
// ==========================================================

function findFailureScreenshots(
    directory: string
): string[] {

    const screenshots: string[] = [];

    // ======================================================
    // TEST RESULTS FOLDER DOES NOT EXIST
    // ======================================================

    if (
        !fs.existsSync(
            directory
        )
    ) {

        console.log(
            `Test results folder not found: ${directory}`
        );

        return screenshots;
    }

    // ======================================================
    // READ DIRECTORY
    // ======================================================

    const entries =
        fs.readdirSync(
            directory,
            {
                withFileTypes: true,
            }
        );

    // ======================================================
    // SEARCH RECURSIVELY
    // ======================================================

    for (
        const entry of entries
    ) {

        const fullPath =
            path.join(
                directory,
                entry.name
            );

        // ==================================================
        // DIRECTORY
        // ==================================================

        if (
            entry.isDirectory()
        ) {

            screenshots.push(
                ...findFailureScreenshots(
                    fullPath
                )
            );

            continue;
        }

        // ==================================================
        // ONLY PLAYWRIGHT FAILURE SCREENSHOT
        // ==================================================
        //
        // Examples:
        //
        // test-failed-1.png
        // test-failed-2.png
        //
        // Other PNG files are ignored.
        //
        // ==================================================

        if (
            entry.isFile() &&
            /^test-failed-\d+\.png$/i.test(
                entry.name
            )
        ) {

            screenshots.push(
                fullPath
            );
        }
    }

    return screenshots;
}

// ==========================================================
// CREATE MIME EMAIL
// ==========================================================

function createMimeEmail(
    sender: string,
    recipient: string,
    subject: string,
    body: string,
    attachments: string[]
): string {

    // ======================================================
    // MIME BOUNDARY
    // ======================================================

    const boundary =
        `----=_PlaywrightBoundary_${Date.now()}`;

    // ======================================================
    // EMAIL HEADER
    // ======================================================

    let email = '';

    email +=
        `From: ${sender}\r\n`;

    email +=
        `To: ${recipient}\r\n`;

    email +=
        `Subject: ${subject}\r\n`;

    email +=
        'MIME-Version: 1.0\r\n';

    email +=
        `Content-Type: multipart/mixed; boundary="${boundary}"\r\n`;

    email +=
        '\r\n';

    // ======================================================
    // EMAIL BODY
    // ======================================================

    email +=
        `--${boundary}\r\n`;

    email +=
        'Content-Type: text/plain; charset="UTF-8"\r\n';

    email +=
        'Content-Transfer-Encoding: 8bit\r\n';

    email +=
        '\r\n';

    email +=
        body;

    email +=
        '\r\n';

    // ======================================================
    // ATTACH ONLY FAILURE SCREENSHOTS
    // ======================================================

    for (
        const attachmentPath of attachments
    ) {

        try {

            const fileName =
                path.basename(
                    attachmentPath
                );

            const fileData =
                fs.readFileSync(
                    attachmentPath
                );

            const base64Data =
                fileData.toString(
                    'base64'
                );

            // ------------------------------------------------
            // ATTACHMENT HEADER
            // ------------------------------------------------

            email +=
                `--${boundary}\r\n`;

            email +=
                'Content-Type: image/png\r\n';

            email +=
                'Content-Transfer-Encoding: base64\r\n';

            email +=
                `Content-Disposition: attachment; filename="${fileName}"\r\n`;

            email +=
                '\r\n';

            // ------------------------------------------------
            // BASE64 DATA
            // ------------------------------------------------

            for (
                let i = 0;
                i < base64Data.length;
                i += 76
            ) {

                email +=
                    base64Data.substring(
                        i,
                        i + 76
                    );

                email +=
                    '\r\n';
            }

        } catch (error) {

            console.error(
                `Unable to attach screenshot: ${attachmentPath}`,
                error
            );
        }
    }

    // ======================================================
    // CLOSE MIME
    // ======================================================

    email +=
        `--${boundary}--\r\n`;

    return email;
}

// ==========================================================
// SEND REPORT
// ==========================================================

export async function sendReport(
    report: SuiteReport
): Promise<void> {

    console.log('');

    console.log(
        '======================================================'
    );

    console.log(
        '             SENDING SANITY E2E REPORT'
    );

    console.log(
        '======================================================'
    );

    // ======================================================
    // AUTHENTICATION
    // ======================================================

    const auth =
        await getSavedAuth();

    // ======================================================
    // GMAIL CLIENT
    // ======================================================

    const gmail =
        google.gmail({
            version: 'v1',
            auth,
        });

    // ======================================================
    // OVERALL STATUS
    // ======================================================

    const overallStatus =
        report.failedScenarios === 0 &&
        report.skippedScenarios === 0
            ? 'PASSED'
            : 'FAILED';

    // ======================================================
    // SUBJECT
    // ======================================================

    const subject =
        'Automation Cadre ODR Sanity Test Report';

    // ======================================================
    // EMAIL BODY
    // ======================================================

    const body =
        createEmail(
            report
        );

    // ======================================================
    // FIND FAILURE SCREENSHOTS
    // ======================================================

    console.log('');

    console.log(
        'Searching for Playwright failure screenshots...'
    );

    const screenshots =
        findFailureScreenshots(
            TEST_RESULTS_PATH
        );

    // ======================================================
    // DISPLAY SCREENSHOT INFORMATION
    // ======================================================

    if (
        screenshots.length === 0
    ) {

        console.log(
            'No Playwright failure screenshots found.'
        );

    } else {

        console.log(
            `Found ${screenshots.length} Playwright failure screenshot(s).`
        );

        screenshots.forEach(
            (
                screenshot,
                index
            ) => {

                console.log(
                    `  ${index + 1}. ${screenshot}`
                );
            }
        );
    }

    // ======================================================
    // CREATE MIME EMAIL
    // ======================================================

    const rawEmail =
        createMimeEmail(
            SENDER,
            RECIPIENT1,
            subject,
            body,
            screenshots
        );

    // ======================================================
    // BASE64URL
    // ======================================================

    const encodedEmail =
        Buffer.from(
            rawEmail,
            'utf8'
        )
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

    // ======================================================
    // SEND EMAIL
    // ======================================================

    await gmail.users.messages.send({

        userId: 'me',

        requestBody: {

            raw: encodedEmail,
        },
    });

    // ======================================================
    // SUCCESS
    // ======================================================

    console.log('');

    console.log(
        'Sanity E2E report email sent successfully.'
    );

    console.log(
        `Recipient: ${RECIPIENT1}`
    );

    console.log(
        `Overall Status: ${overallStatus}`
    );

    console.log(
        `Total Scenarios: ${report.totalScenarios}`
    );

    console.log(
        `Passed Scenarios: ${report.passedScenarios}`
    );

    console.log(
        `Failed Scenarios: ${report.failedScenarios}`
    );

    console.log(
        `Failure Screenshots Attached: ${screenshots.length}`
    );

    console.log('');

    console.log(
        '======================================================'
    );
}