import { google } from 'googleapis';

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

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
// GMAIL SCOPES
// ==========================================================

const SCOPES: string[] = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
];

// ==========================================================
// GENERATE TOKEN
// ==========================================================

async function generateToken(): Promise<void> {

    console.log('');

    console.log(
        '======================================================'
    );

    console.log(
        '              GMAIL TOKEN GENERATION'
    );

    console.log(
        '======================================================'
    );

    // ======================================================
    // CHECK CREDENTIALS
    // ======================================================

    if (!fs.existsSync(CREDENTIALS_PATH)) {

        throw new Error(
            `credentials.json not found at:\n${CREDENTIALS_PATH}`
        );
    }

    // ======================================================
    // READ CREDENTIALS
    // ======================================================

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
            'Invalid credentials.json. ' +
            'Expected "installed" or "web".'
        );
    }

    // ======================================================
    // CREATE OAUTH CLIENT
    // ======================================================

    const auth =
        new google.auth.OAuth2(
            config.client_id,
            config.client_secret,
            config.redirect_uris[0]
        );

    // ======================================================
    // GENERATE AUTHORIZATION URL
    // ======================================================

    const authUrl =
        auth.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: SCOPES,
        });

    console.log('');

    console.log(
        'Open this URL in your browser:'
    );

    console.log('');

    console.log(authUrl);

    console.log('');

    // ======================================================
    // READ AUTHORIZATION CODE
    // ======================================================

    const rl =
        readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

    const code: string =
        await new Promise<string>(
            resolve => {

                rl.question(
                    'Paste the authorization code here: ',
                    answer => {

                        rl.close();

                        resolve(
                            answer.trim()
                        );
                    }
                );
            }
        );

    // ======================================================
    // EXCHANGE CODE FOR TOKEN
    // ======================================================

    const { tokens } =
        await auth.getToken(
            code
        );

    // ======================================================
    // VERIFY ACCESS TOKEN
    // ======================================================

    if (!tokens.access_token) {

        throw new Error(
            'Access token was not generated.'
        );
    }

    // ======================================================
    // SAVE TOKEN
    // ======================================================

    fs.writeFileSync(
        TOKEN_PATH,
        JSON.stringify(
            tokens,
            null,
            2
        )
    );

    // ======================================================
    // SUCCESS
    // ======================================================

    console.log('');

    console.log(
        '======================================================'
    );

    console.log(
        '             TOKEN GENERATED SUCCESSFULLY'
    );

    console.log(
        '======================================================'
    );

    console.log('');

    console.log(
        `token.json saved at:\n${TOKEN_PATH}`
    );

    console.log('');

    console.log(
        'Granted scopes:'
    );

    for (
        const scope of SCOPES
    ) {

        console.log(
            `✅ ${scope}`
        );
    }

    console.log('');
}

// ==========================================================
// RUN
// ==========================================================

generateToken()
    .catch(
        error => {

            console.error('');

            console.error(
                '❌ Failed to generate token.json'
            );

            console.error(
                error
            );

            process.exit(
                1
            );
        }
    );