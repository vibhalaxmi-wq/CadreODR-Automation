import {
    Page,
} from '@playwright/test';

import {
    applyContractIdFilter,
} from '../../actions/MoreFilterActions';

import {
    moreFilterData,
} from '../../testData/moreFilterData';


// ==========================================================
// CASE OFFICER FILTER SCENARIO
// ==========================================================

export async function caseOfficerFilter(
    page: Page,
): Promise<void> {

    console.log('');

    console.log(
        '======================================================',
    );

    console.log(
        'CASE OFFICER FILTER SCENARIO',
    );

    console.log(
        '======================================================',
    );


    await applyCaseOfficerFilter(
        page,
        moreFilterData.caseOfficer.value,
    );


    console.log(
        'Case Officer filter completed successfully.',
    );

}