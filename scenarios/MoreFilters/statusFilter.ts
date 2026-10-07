import {
    Page,
} from '@playwright/test';

import {
    applyStatusFilter,
} from '../../actions/MoreFilterActions';

import {
    moreFilterData,
} from '../../testData/moreFilterData';

// ==========================================================
// STATUS FILTER SCENARIO
// ==========================================================

export async function statusFilter(
    page: Page,
): Promise<void> {

    await applyStatusFilter(
        page,
        moreFilterData.status.value,
    );
}