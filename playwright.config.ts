import { defineConfig, devices } from '@playwright/test';
import { environmentConfig } from './config/environment';
// ==========================================================
// WATCH MODE
// ==========================================================
const watchMode = process.env.WATCH_MODE === 'true';
// ==========================================================
// PLAYWRIGHT CONFIGURATION
// ==========================================================
export default defineConfig({
    // ==========================================================
    // TEST DIRECTORY
    // ==========================================================
    testDir: './tests',
    // ==========================================================
    // EXECUTION
    // ==========================================================
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    // ==========================================================
    // REPORTER
    // ==========================================================
    reporter: 'html',
    // ==========================================================
    // COMMON SETTINGS
    // ==========================================================
    use: {
        baseURL: environmentConfig.production.baseURL,
        // Headed when WATCH_MODE=true
        headless: !watchMode,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        // ======================================================
        // 2 SECOND DELAY BETWEEN PLAYWRIGHT ACTIONS
        // ======================================================
        launchOptions: {
            slowMo: watchMode ? 2000 : 0,
        },
    },
    // ==========================================================
    // BROWSER PROJECTS
    // ==========================================================
    projects: [
        // ======================================================
        // CHROMIUM
        // ======================================================
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                viewport: null,
                launchOptions: {
                    args: ['--start-maximized'],
                    // 2 second delay in watch mode
                    slowMo: watchMode ? 1000 : 0,
                },
            },
        },
        // ======================================================
        // FIREFOX
        // ======================================================
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
            },
        },
        // ======================================================
        // WEBKIT
        // ======================================================
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
            },
        },
    ],
});