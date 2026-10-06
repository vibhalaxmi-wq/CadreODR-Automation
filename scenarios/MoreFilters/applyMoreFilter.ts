import {
    Page,
} from '@playwright/test';

import {
    applyMoreFilter as applyMoreFilterAction,
} from '../../actions/MoreFilterActions';

export async function applyMoreFilter(
    page: Page,
): Promise<void> {

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'APPLY MORE FILTER SCENARIO',
    );
    console.log(
        '======================================================',
    );

    console.log(
        `Current URL: ${page.url()}`,
    );

    console.log(
        'Using existing logged-in browser session.',
    );

    await applyMoreFilterAction(page);

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'MORE FILTER SCENARIO COMPLETED SUCCESSFULLY',
    );
    console.log(
        `Current URL: ${page.url()}`,
    );
    console.log(
        '======================================================',
    );
}