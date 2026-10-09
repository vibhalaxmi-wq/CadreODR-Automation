import {
    Page,
} from '@playwright/test';

import {
    applyDisputeTypeFilter,
} from '../../actions/MoreFilterActions';

import {
    moreFilterData,
} from '../../testData/moreFilterData';


// ==========================================================
// DISPUTE TYPE FILTER SCENARIO
// ==========================================================

export async function disputeTypeFilter(
    page: Page,
): Promise<void> {

    console.log('');
    console.log('======================================================');
    console.log('DISPUTE TYPE FILTER SCENARIO STARTED');
    console.log('======================================================');

    await applyDisputeTypeFilter(
        page,
        moreFilterData.disputeType.value,
    );

    console.log('Dispute Type filter scenario passed.');

    console.log('');
    console.log('======================================================');
    console.log('DISPUTE TYPE FILTER SCENARIO COMPLETED');
    console.log('======================================================');
}