import {
    Page,
} from '@playwright/test';

import {
    applyDisplayNameFilter as applyDisplayNameFilterAction,
} from '../../actions/MoreFilterActions';

// ==========================================================
// DISPLAY NAME FILTER SCENARIO
// ==========================================================

export async function displayNameFilter(
    page: Page,
    displayName: string,
): Promise<void> {

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'DISPLAY NAME FILTER SCENARIO',
    );
    console.log(
        '======================================================',
    );

    console.log(
        `Display Name received: ${displayName}`,
    );

    console.log(
        `Current URL: ${page.url()}`,
    );

    console.log(
        'Using existing logged-in browser session.',
    );

    // ======================================================
    // APPLY DISPLAY NAME FILTER
    // ======================================================

    await applyDisplayNameFilterAction(
        page,
        displayName,
    );

    // ======================================================
    // COMPLETED
    // ======================================================

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'DISPLAY NAME FILTER SCENARIO COMPLETED SUCCESSFULLY',
    );
    console.log(
        `Current URL: ${page.url()}`,
    );
    console.log(
        '======================================================',
    );
}