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
// CONTRACT ID FILTER SCENARIO
// ==========================================================

export async function contactIdFilter(
    page: Page,
): Promise<void> {

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'SCENARIO - CONTRACT ID FILTER',
    );
    console.log(
        '======================================================',
    );

    await applyContractIdFilter(
        page,
        moreFilterData.contractId.value,
    );

    console.log(
        'Contract ID filter scenario completed successfully.',
    );

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'CONTRACT ID FILTER SCENARIO COMPLETED',
    );
    console.log(
        '======================================================',
    );
}