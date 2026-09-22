import { Page } from '@playwright/test';

import { logout } from '../../actions/LogoutActions';


// ==========================================================
// LOGOUT SCENARIO
// ==========================================================

export async function logoutScenario(
    page: Page
): Promise<void> {

    // ==========================================================
    // EXECUTE LOGOUT
    // ==========================================================

    await logout(page);

}