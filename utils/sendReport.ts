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
// EMAIL CONFIGURATION
// ==========================================================

const RECIPIENT1 =
    'basanagouda.p@thecadre.in';


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

    if (
        !fs.existsSync(
            CREDENTIALS_PATH
        )
    ) {

        throw new Error(
            `credentials.json not found:\n${CREDENTIALS_PATH}`
        );
    }


    if (
        !fs.existsSync(
            TOKEN_PATH
        )
    ) {

        throw new Error(
            `token.json not found:\n${TOKEN_PATH}`
        );
    }


    const credentials =
        JSON.parse(
            fs.readFileSync(
                CREDENTIALS_PATH,
                'utf8'
            )
        );


    const config =
        credentials.installed ??
        credentials.web;


    if (!config) {

        throw new Error(
            'Invalid credentials.json. Expected "installed" or "web".'
        );
    }


    const auth =
        new google.auth.OAuth2(
            config.client_id,
            config.client_secret,
            config.redirect_uris[0]
        );


    const token =
        JSON.parse(
            fs.readFileSync(
                TOKEN_PATH,
                'utf8'
            )
        );


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
        'CADRE ODR SANITY E2E SUITE REPORT\n';

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
        `[${overallStatus}] Cadre ODR Sanity E2E Suite Report`;


    // ======================================================
    // BODY
    // ======================================================

    const body =
        createEmail(
            report
        );


    // ======================================================
    // RAW EMAIL
    // ======================================================

    const emailLines = [

        `From: ${SENDER}`,

        `To: ${RECIPIENT1}`,

        `Subject: ${subject}`,

        'Content-Type: text/plain; charset="UTF-8"',

        '',

        body,

    ];


    const rawEmail =
        emailLines.join(
            '\r\n'
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
    // SEND
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

    console.log('');

    console.log(
        '======================================================'
    );
}