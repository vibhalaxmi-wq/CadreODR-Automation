import { test } from '@playwright/test';

import { validLogin } from '../../scenarios/Login/validLogin';

import { bulkActionsScenario } from '../../scenarios/BulkActions/validateActionButtonIsEnabled';

import { assignCaseOfficerScenario } from '../../scenarios/BulkActions/assignCaseOfficer';

import { sendReport } from '../../utils/sendReport';

// ==========================================================
// TEST TIMEOUT
// ==========================================================

test.setTimeout(120000);

// ==========================================================
// ADMIN LOGIN
// ==========================================================

const adminEmail =
  'vibha.laxmi+odradmin@thecadre.in';

// ==========================================================
// SCENARIO COUNTERS
// ==========================================================

let totalScenarios = 0;

let passedScenarios = 0;

let failedScenarios = 0;

let skippedScenarios = 0;

// ==========================================================
// RUN SCENARIO
// ==========================================================

async function runScenario(
  scenarioName: string,
  scenario: () => Promise<void>
): Promise<void> {

  totalScenarios++;

  console.log('');

  console.log(
    '======================================================'
  );

  console.log(
    `STARTING SCENARIO: ${scenarioName}`
  );

  console.log(
    '======================================================'
  );

  try {

    await scenario();

    passedScenarios++;

    console.log('');

    console.log(
      '------------------------------------------------------'
    );

    console.log(
      `SCENARIO PASSED: ${scenarioName}`
    );

    console.log(
      '------------------------------------------------------'
    );

  } catch (error) {

    failedScenarios++;

    console.log('');

    console.log(
      '------------------------------------------------------'
    );

    console.log(
      `SCENARIO FAILED: ${scenarioName}`
    );

    console.log(
      '------------------------------------------------------'
    );

    console.error(
      error
    );

    throw error;
  }
}

// ==========================================================
// BULK ACTION TEST
// ==========================================================

test(
  'bulk actions - verify and assign case officer',
  async ({ page }) => {

    console.log('');

    console.log(
      '======================================================'
    );

    console.log(
      'BULK ACTIONS TEST STARTED'
    );

    console.log(
      '======================================================'
    );

    try {

      // ====================================================
      // LOGIN ONLY ONCE
      // ====================================================

      await validLogin(
        page,
        adminEmail
      );

      console.log('');

      console.log(
        '======================================================'
      );

      console.log(
        'LOGIN COMPLETED'
      );

      console.log(
        'Continuing with bulk action scenarios...'
      );

      console.log(
        '======================================================'
      );

      // ====================================================
      // SCENARIO 1
      // ====================================================

      await runScenario(
        'verify Actions button is visible after selecting a claim',
        async () => {

          await bulkActionsScenario(
            page
          );
        }
      );

      // ====================================================
      // SCENARIO 2
      // ====================================================

      await runScenario(
        'assign case officer and verify inside claim',
        async () => {

          await assignCaseOfficerScenario(
            page
          );
        }
      );

    } finally {

      // ====================================================
      // FINAL TERMINAL REPORT
      // ====================================================

      console.log('');

      console.log('');

      console.log(
        '======================================================'
      );

      console.log(
        '              BULK ACTIONS TEST REPORT'
      );

      console.log(
        '======================================================'
      );

      console.log('');

      console.log(
        `Total Scenarios : ${totalScenarios}`
      );

      console.log(
        `Passed          : ${passedScenarios}`
      );

      console.log(
        `Failed          : ${failedScenarios}`
      );

      console.log(
        `Skipped         : ${skippedScenarios}`
      );

      console.log('');

      console.log(
        '======================================================'
      );

      // ====================================================
      // SEND EMAIL
      // ====================================================

      try {

        await sendReport({

          totalScenarios,

          passedScenarios,

          failedScenarios,

          skippedScenarios,
        });

        console.log('');

        console.log(
          'Email report sent successfully.'
        );

      } catch (reportError) {

        console.log('');

        console.log(
          'Failed to send email report.'
        );

        console.error(
          reportError
        );
      }

      console.log('');

      console.log(
        '======================================================'
      );

      console.log(
        'BULK ACTIONS TEST COMPLETED'
      );

      console.log(
        '======================================================'
      );
    }
  }
);