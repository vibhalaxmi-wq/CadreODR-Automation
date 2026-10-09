import {
    Page,
} from '@playwright/test';

import {
    applyArbitratorFilter,
} from '../../actions/MoreFilterActions';

import {
    moreFilterData,
} from '../../testData/moreFilterData';


// ==========================================================
// ARBITRATOR FILTER SCENARIO
// ==========================================================

export async function arbitratorFilter(
    page: Page,
): Promise<void> {

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'ARBITRATOR FILTER SCENARIO',
    );
    console.log(
        '======================================================',
    );

    await applyArbitratorFilter(
        page,
        moreFilterData.arbitrator.value,
    );

    console.log(
        'Arbitrator filter scenario completed successfully.',
    );

    console.log('');
    console.log(
        '======================================================',
    );
    console.log(
        'ARBITRATOR FILTER SCENARIO COMPLETED',
    );
    console.log(
        '======================================================',
    );
}