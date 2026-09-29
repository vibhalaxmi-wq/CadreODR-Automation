import {Page,} from '@playwright/test';
import {AssignCaseManagersPages,} from '../pages/CaseManagerPages'
import {assignCaseManagersData,} from '../testData/caseManagerData';
// ==========================================================
// ASSIGN CASE MANAGERS ACTIONS
// ==========================================================
export class AssignCaseManagersActions {
    constructor(
        private readonly page: Page
    ) {}
    // ======================================================
    // ASSIGN ALL CASE MANAGERS
    // ======================================================
    async assignAllCaseManagers(): Promise<void> {
        console.log('');
        console.log('======================================================');
        console.log('STARTING CASE MANAGER ASSIGNMENT');
        console.log('======================================================');
        const caseManagerPages = new AssignCaseManagersPages(this.page);
        // ==================================================
        // WAIT FOR CLAIM BACKEND DATA
        // ==================================================
        console.log('');
        console.log('Waiting 10 seconds for claim backend data to load...');
        await this.page.waitForTimeout(10000);
        console.log('Claim loading wait completed.');
        // ==================================================
        // CASE OFFICER
        // ==================================================
        console.log('');
        console.log('======================================================');
        console.log('ASSIGNING CASE OFFICER');
        console.log('======================================================');
        await caseManagerPages.addUser(0,assignCaseManagersData.caseOfficer.searchText,assignCaseManagersData.caseOfficer.userText);
        // ==================================================
        // IMPORTANT:
        // WAIT 10 SECONDS BEFORE PROCEEDINGS
        // ==================================================
        await this.page.waitForTimeout(10000);
        // ==================================================
        // OPEN PROCEEDINGS
        // ==================================================
        await caseManagerPages.openProceedings();
        // ==================================================
        // VERIFY CASE OFFICER MESSAGE
        // ==================================================
        await caseManagerPages.verifyAssignmentMessage(
            assignCaseManagersData.assignedBy,
            assignCaseManagersData.caseOfficer.userName,
            assignCaseManagersData.caseOfficer.roleName);
        // ==================================================
        // ARBITRATOR
        // ==================================================
        console.log('');
        console.log('======================================================');
        console.log('ASSIGNING ARBITRATOR');
        console.log('======================================================');
        await caseManagerPages.addUser(1,
            assignCaseManagersData.arbitrator.searchText,
            assignCaseManagersData.arbitrator.userText);
        // ==================================================
        // VERIFY ARBITRATOR MESSAGE
        // ==================================================
        await caseManagerPages.verifyAssignmentMessage(
            assignCaseManagersData.assignedBy,
            assignCaseManagersData.arbitrator.userName,
            assignCaseManagersData.arbitrator.roleName);
        // ==================================================
        // OBSERVER
        // ==================================================
        console.log('');
        console.log('======================================================');
        console.log('ASSIGNING OBSERVER');
        console.log('======================================================');
        await caseManagerPages.addUser(
            2,assignCaseManagersData.observer.searchText,
            assignCaseManagersData.observer.userText
        );
        // ==================================================
        // VERIFY OBSERVER MESSAGE
        // ==================================================
        await caseManagerPages.verifyAssignmentMessage(
            assignCaseManagersData.assignedBy,
            assignCaseManagersData.observer.userName,
            assignCaseManagersData.observer.roleName);
        // ==================================================
        // COMPLETED
        // ==================================================
        console.log('');
        console.log('======================================================');
        console.log('ALL CASE MANAGERS ASSIGNED SUCCESSFULLY');
        console.log('======================================================');
        console.log(`Case Officer: ${assignCaseManagersData.caseOfficer.userName}`);
        console.log(`Arbitrator: ${assignCaseManagersData.arbitrator.userName}`);
        console.log(`Observer: ${assignCaseManagersData.observer.userName}`);
        console.log('======================================================');
    }
}