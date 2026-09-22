import { google } from 'googleapis';
import fs from 'node:fs';
import path from 'node:path';
// ==========================================================
// PROJECT PATHS
// ==========================================================
const PROJECT_ROOT = process.cwd();
const CREDENTIALS_PATH = path.resolve(
    PROJECT_ROOT,
    'credentials.json'
);
const TOKEN_PATH = path.resolve(
    PROJECT_ROOT,
    'token.json'
);
// ==========================================================
// GMAIL SCOPES
// ==========================================================
export const GMAIL_SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
];
// ==========================================================
// GET SAVED GMAIL AUTHENTICATION
// ==========================================================
export async function getSavedAuth() {
    // ==========================================================
    // CHECK CREDENTIALS
    // ==========================================================
    if (!fs.existsSync(CREDENTIALS_PATH)) {
        throw new Error(
            `credentials.json not found: ${CREDENTIALS_PATH}`
        );
    }
    // ==========================================================
    // CHECK TOKEN
    // ==========================================================
    if (!fs.existsSync(TOKEN_PATH)) {
        throw new Error(
            `token.json not found: ${TOKEN_PATH}`
        );
    }
    // ==========================================================
    // READ CREDENTIALS
    // ==========================================================
    const credentials = JSON.parse(
        fs.readFileSync(
            CREDENTIALS_PATH,
            'utf8'
        )
    );
    // ==========================================================
    // GET OAUTH CONFIGURATION
    // ==========================================================
    const config =
        credentials.installed ??
        credentials.web;
    if (!config) {
        throw new Error(
            'Invalid credentials.json. Expected "installed" or "web".'
        );
    }
    // ==========================================================
    // CREATE OAUTH CLIENT
    // ==========================================================
    const auth =
        new google.auth.OAuth2(
            config.client_id,
            config.client_secret,
            config.redirect_uris[0]
        );
    // ==========================================================
    // READ TOKEN
    // ==========================================================
    const token = JSON.parse(
        fs.readFileSync(
            TOKEN_PATH,
            'utf8'
        )
    );
    // ==========================================================
    // SET TOKEN
    // ==========================================================
    auth.setCredentials(token);
    return auth;
}
// ==========================================================
// DECODE GMAIL BODY
// ==========================================================
function decodeGmailBody(
    data: string
): string {
    return Buffer.from(
        data
            .replace(/-/g, '+')
            .replace(/_/g, '/'),
        'base64'
    ).toString('utf8');
}
// ==========================================================
// REMOVE HTML FROM EMAIL
// ==========================================================
function removeHtml(
    html: string
): string {
    return html
        .replace(
            /<style[\s\S]*?<\/style>/gi,
           ' '
        )
        .replace(
            /<script[\s\S]*?<\/script>/gi,
            ' '
        )
        .replace(
            /<[^>]+>/g,
            ' '
        )
        .replace(
            /&nbsp;/gi,
            ' '
        )
        .replace(
            /&amp;/gi,
            '&'
        )
        .replace(
            /\s+/g,
            ' '
        )
        .trim();
}
// ==========================================================
// FIND EMAIL BODY
// ==========================================================
function findBody(
    part: any
): string {
    if (!part) {
        return '';
    }
    // ==========================================================
    // TEXT PLAIN
    // ==========================================================
    if (
        part.mimeType === 'text/plain' &&
        part.body?.data
    ) {
        return decodeGmailBody(
            part.body.data
        );
    }
    // ==========================================================
    // TEXT HTML
    // ==========================================================
    if (
        part.mimeType === 'text/html' &&
        part.body?.data
    ) {
        return removeHtml(
            decodeGmailBody(
                part.body.data
            )
        );
    }
    // ==========================================================
    // DIRECT BODY
    // ==========================================================
    if (part.body?.data) {
        return decodeGmailBody(
            part.body.data
        );
    }
    // ==========================================================
    // CHILD PARTS
    // ==========================================================
    for (
        const childPart of part.parts ?? []
    ) {
        const body =
            findBody(childPart);
        if (body) {
            return body;
        }
    }
    return '';
}
// ==========================================================
// GET EMAIL HEADER
// ==========================================================
function getHeader(
    headers: any[] | undefined,
    name: string
): string {
    const header =
        headers?.find(
            item =>
                item.name?.toLowerCase() ===
                name.toLowerCase()
        );
    return header?.value ?? '';
}
// ==========================================================
// GET EXISTING UNREAD MESSAGE IDS
// ==========================================================
export async function getUnreadMessageIds(
    email: string
): Promise<Set<string>> {
    const auth =await getSavedAuth();
    const gmail =google.gmail({version: 'v1',auth,});
    const response =await gmail.users.messages.list({
            userId: 'me',
            q: `to:${email} is:unread`,
            maxResults: 50,
        });


    const messageIds =
        (response.data.messages ?? [])
            .map(
                message => message.id
            )
            .filter(
                (id): id is string =>
                    Boolean(id)
            );


    console.log(
        `Found ${messageIds.length} existing unread Gmail message(s).`
    );


    return new Set(messageIds);
}


// ==========================================================
// EXTRACT OTP
// ==========================================================

function extractOTP(
    body: string,
    subject: string
): string | null {

    // ==========================================================
    // NORMALIZE EMAIL CONTENT
    // ==========================================================

    const text =
        `${subject} ${body}`
            .replace(/\r/g, ' ')
            .replace(/\n/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();


    // ==========================================================
    // OTP PATTERNS
    // ==========================================================

    const patterns = [

        // Example:
        // Your OTP is 123456

        /(?:otp|one[-\s]?time\s+(?:password|passcode)|verification\s+(?:code|otp)|security\s+(?:code|otp))[\s:]*(?:is|:)?[\s]*(\d{6})\b/i,


        // Example:
        // code: 123456

        /(?:code|passcode)[\s:=]+(\d{6})\b/i,


        // Example:
        // OTP 123456

        /\bOTP[\s:-]+(\d{6})\b/i,
    ];


    // ==========================================================
    // CHECK PATTERNS
    // ==========================================================

    for (
        const pattern of patterns
    ) {

        const match =
            text.match(pattern);


        if (match?.[1]) {

            return match[1];
        }
    }


    // ==========================================================
    // FALLBACK
    // ==========================================================

    const containsOtpKeyword =
        /\b(otp|one[-\s]?time|verification|passcode|security\s+code)\b/i
            .test(text);


    if (containsOtpKeyword) {

        const numbers =
            text.match(
                /\b\d{6}\b/g
            ) ?? [];


        // ======================================================
        // ONLY ONE SIX-DIGIT NUMBER
        // ======================================================

        if (numbers.length === 1) {

            return numbers[0];
        }


        // ======================================================
        // MULTIPLE SIX-DIGIT NUMBERS
        // ======================================================

        if (numbers.length > 1) {

            console.log(
                `Multiple 6-digit numbers found: ${numbers.join(', ')}`
            );

            console.log(
                'OTP could not be selected safely.'
            );
        }
    }


    return null;
}


// ==========================================================
// WAIT FOR NEW OTP
// ==========================================================

export async function waitForNewOTP(
    existingIds: Set<string>,
    timeoutMs = 60000,
    intervalMs = 3000
): Promise<string> {

    const auth =
        await getSavedAuth();


    const gmail =
        google.gmail({
            version: 'v1',
            auth,
        });


    const deadline =
        Date.now() + timeoutMs;


    console.log(
        'Waiting for new OTP email...'
    );


    // ==========================================================
    // KEEP CHECKING UNTIL TIMEOUT
    // ==========================================================

    while (
        Date.now() < deadline
    ) {

        const response =
            await gmail.users.messages.list({
                userId: 'me',
                q: 'is:unread newer_than:2m',
                maxResults: 20,
            });


        const messages =
            response.data.messages ?? [];


        // ========================================================
        // CHECK ALL NEW MESSAGES
        // ========================================================

        for (
            const message of messages
        ) {

            if (!message.id) {
                continue;
            }


            // ====================================================
            // IGNORE OLD EMAIL
            // ====================================================

            if (
                existingIds.has(message.id)
            ) {

                continue;
            }


            // ====================================================
            // GET COMPLETE EMAIL
            // ====================================================

            const email =
                await gmail.users.messages.get({
                    userId: 'me',
                    id: message.id,
                    format: 'full',
                });


            const payload =
                email.data.payload;


            const headers =
                payload?.headers ?? [];


            const subject =
                getHeader(
                    headers,
                    'Subject'
                );


            const from =
                getHeader(
                    headers,
                    'From'
                );


            console.log(
                `Checking new email from: ${from}`
            );


            console.log(
                `Email subject: ${subject}`
            );


            // ====================================================
            // FIND EMAIL BODY
            // ====================================================

            const body =
                findBody(payload);


            // ====================================================
            // EXTRACT OTP
            // ====================================================

            const otp =
                extractOTP(
                    body,
                    subject
                );


            // ====================================================
            // OTP FOUND
            // ====================================================

            if (otp) {

                console.log(
                    'New OTP received successfully.'
                );

                return otp;
            }


            console.log(
                'No valid OTP found in this email.'
            );
        }


        // ========================================================
        // WAIT BEFORE NEXT CHECK
        // ========================================================

        await new Promise<void>(
            resolve =>
                setTimeout(
                    resolve,
                    intervalMs
                )
        );
    }


    // ==========================================================
    // TIMEOUT
    // ==========================================================

    throw new Error(
        `New OTP email did not arrive within ${timeoutMs / 1000} seconds.`
    );
}