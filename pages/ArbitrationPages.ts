import { expect, Page } from '@playwright/test';
import {ArbitrationLocators,} from '../locators/ArbitrationLocators';
// ==========================================================
// ARBITRATION PAGE
// ==========================================================
export class ArbitrationPages {
    constructor(
        private readonly page: Page
    ) {}
    // ======================================================
    // OPEN NEW CLAIM
    // ======================================================
    async openNewClaim(): Promise<void> {
        console.log('');
        console.log('Checking sidebar state...');
        // ==================================================
        // CHECK IF NEW CLAIM IS ALREADY VISIBLE
        // ==================================================
        const newClaimButton =this.page.getByRole(ArbitrationLocators.newClaimButton.role,
                {name:ArbitrationLocators.newClaimButton.name,});
        // ==================================================
        // CASE 1:
        // MENU IS ALREADY OPEN
        // ==================================================
        if (await newClaimButton.isVisible().catch(() => false)) {
            console.log('New Claim button is already visible.');
        }
        // ==================================================
        // CASE 2:
        // MENU IS COLLAPSED
        // ==================================================
        else {
            console.log('New Claim is not visible.');
            console.log('Opening sidebar menu...');
            const openMenuButton =this.page.getByRole(ArbitrationLocators.openMenuButton.role,{name:ArbitrationLocators.openMenuButton.name,});
            await expect(openMenuButton).toBeVisible({timeout: 10000,});
            await openMenuButton.click();
            console.log('Sidebar menu opened.');
        }
        // ==================================================
        // CLICK NEW CLAIM
        // ==================================================
        await expect(newClaimButton).toBeVisible({timeout: 10000,});
        await newClaimButton.click();
        console.log('New Claim opened successfully.');
        // ==================================================
        // VERIFY NEW CLAIM PAGE
        // ==================================================
        const organizationDropdown =this.page.getByRole(ArbitrationLocators.organizationDropdown.role,{name:ArbitrationLocators.organizationDropdown.name,});
        await expect(organizationDropdown).toBeVisible({timeout: 10000,});
        console.log('New Claim page verified successfully.');}
    // ======================================================
    // SELECT ORGANIZATION
    // ======================================================
    async selectOrganization(
        organization: string
    ): Promise<void> {
        const dropdown =this.page.getByRole(ArbitrationLocators.organizationDropdown.role,{name: ArbitrationLocators.organizationDropdown.name,});
        await expect(dropdown).toBeVisible({timeout: 10000,});
        await dropdown.click();
        const option =this.page.getByText(organization,{exact: true,});
        await expect(option).toBeVisible({timeout: 10000,});
        await option.click();
        console.log(`Organization selected: ${organization}`);
    }
    // ======================================================
    // ADD CLAIMANT
    // ======================================================
    async addClaimant(
        name: string,
        email: string,
        phone: string,
        address: string
    ): Promise<void> {
        await this.clickAddParty();
        await this.fillName(name);
        await this.fillEmail(email);
        await this.fillPhone(phone);
        await this.fillAddress(address);
        await this.clickAdd();
        console.log('Claimant added successfully.');
    }
    // ======================================================
    // ADD RESPONDENT
    // ======================================================
    async addRespondent(
        name: string,
        email: string,
        phone: string,
        address: string,
        role: string
    ): Promise<void> {
        await this.clickAddParty();
        await this.selectRole(role);
        await this.fillName(name);
        await this.fillEmail(email);
        await this.fillPhone(phone);
        await this.fillAddress(address);
        await this.clickAdd();
        console.log('Respondent added successfully.');
    }
    // ======================================================
    // CLICK ADD PARTY
    // ======================================================
    private async clickAddParty(): Promise<void> {
        const addPartyButton =this.page.getByText(ArbitrationLocators.addPartyButton);
        await expect(addPartyButton).toBeVisible({timeout: 10000,});
        await addPartyButton.click();
        await this.page.waitForTimeout(500);
    }
    // ======================================================
    // SELECT ROLE
    // ======================================================
    private async selectRole(
        role: string
    ): Promise<void> {
        const roleDropdown =this.page.getByRole(ArbitrationLocators.chooseRoleDropdown.role,{name:ArbitrationLocators.chooseRoleDropdown.name,});
        await expect(roleDropdown).toBeVisible({timeout: 10000,});
        await roleDropdown.click();
        const roleOption =this.page.getByLabel(ArbitrationLocators.addUserDialog).getByText(role,{exact: true,});
        await expect(roleOption).toBeVisible({timeout: 10000,});
        await roleOption.click();
        console.log(`Role selected: ${role}`);
    }
    // ======================================================
    // NAME
    // ======================================================
    private async fillName(
        value: string
    ): Promise<void> {
        const field =this.page.getByRole(ArbitrationLocators.nameTextbox.role,{name:ArbitrationLocators.nameTextbox.name,});
        await expect(field).toBeVisible({timeout: 10000,});
        await field.fill(value);
    }
    // ======================================================
    // EMAIL
    // ======================================================
    private async fillEmail(
        value: string
    ): Promise<void> {
        const field =this.page.getByRole(ArbitrationLocators.emailTextbox.role,{name:ArbitrationLocators.emailTextbox.name,});
        await expect(field).toBeVisible({timeout: 10000,});
        await field.fill(value);
    }
    // ======================================================
    // PHONE
    // ======================================================
    private async fillPhone(
        value: string
    ): Promise<void> {
        const field =this.page.getByRole(ArbitrationLocators.phoneTextbox.role,{name:ArbitrationLocators.phoneTextbox.name,});
        await expect(field).toBeVisible({timeout: 10000,});
        await field.fill(value);
    }
    // ======================================================
    // ADDRESS
    // ======================================================
    private async fillAddress(
        value: string
    ): Promise<void> {
        const field =this.page.getByRole(ArbitrationLocators.addressTextbox.role,{name:ArbitrationLocators.addressTextbox.name,});
        await expect(field).toBeVisible({timeout: 10000,});
        await field.fill(value);
    }
    // ======================================================
    // CLICK ADD
    // ======================================================
    private async clickAdd(): Promise<void> {
        const addButton =this.page.getByRole(ArbitrationLocators.addButton.role,{name:ArbitrationLocators.addButton.name,});
        await expect(addButton).toBeVisible({timeout: 10000,});
        await addButton.click();
    }
    // ======================================================
    // DISPUTE AMOUNT
    // ======================================================
    async enterDisputeAmount(
        value: string
    ): Promise<void> {
        const field =this.page.getByRole(ArbitrationLocators.disputeAmount.role,{name:ArbitrationLocators.disputeAmount.name,});
        await expect(field).toBeVisible({timeout: 10000,});
        await field.fill(value);
    }
    // ======================================================
    // CONTRACT
    // ======================================================
    async enterContract(
        value: string
    ): Promise<void> {
        const field =this.page.getByRole(ArbitrationLocators.contract.role,{name:ArbitrationLocators.contract.name,});
        await expect(field).toBeVisible({timeout: 10000,});
        await field.fill(value);
    }
    // ======================================================
    // JURISDICTION
    // ======================================================
    async enterJurisdiction(
        value: string
    ): Promise<void> {
        const field =this.page.getByRole(ArbitrationLocators.jurisdiction.role,{name:ArbitrationLocators.jurisdiction.name,});
        await expect(field).toBeVisible({timeout: 10000,});
        await field.fill(value);
    }
    // ======================================================
    // DISPUTE TYPE
    // ======================================================
    async selectDisputeType(
        value: string
    ): Promise<void> {
        const dropdown =this.page.locator(ArbitrationLocators.disputeTypeContainer).first();
        await expect(dropdown).toBeVisible({timeout: 10000,});
        await dropdown.click();
        const option =this.page.getByText(value,{exact: true,});
        await expect(option).toBeVisible({timeout: 10000,});
        await option.click();
        console.log(`Dispute type selected: ${value}`);
    }
    // ======================================================
    // CLAIM TYPE
    // ======================================================
    async selectClaimType(
        value: string
    ): Promise<void> {
        const field =this.page.getByRole(ArbitrationLocators.claimType.role,{name:ArbitrationLocators.claimType.name,});
        await expect(field).toBeVisible({timeout: 10000,});
        await field.click();
        const option =this.page.getByText(value,{exact: true,});
        await expect(option).toBeVisible({timeout: 10000,});
        await option.click();
        console.log(`Claim type selected: ${value}`);
    }
    // ======================================================
    // SUMMARY
    // ======================================================
    async enterSummary(
        value: string
    ): Promise<void> {
        const field =this.page.getByRole(ArbitrationLocators.summary.role,{name:ArbitrationLocators.summary.name,});
        await expect(field).toBeVisible({timeout: 10000,});
        await field.fill(value);
    }
    // ======================================================
    // LOG CLAIM
    // ======================================================
    async logClaim(): Promise<void> {
        const button =this.page.getByRole(ArbitrationLocators.logClaimButton.role,{name:ArbitrationLocators.logClaimButton.name,});
        await expect(button).toBeVisible({timeout: 10000,});
        await expect(button).toBeEnabled({timeout: 10000,});
        await button.click();
        console.log('Log Claim clicked successfully.');
    }
    // ======================================================
    // VERIFY SUCCESS TOAST
    // ======================================================
    async verifySuccessToast(): Promise<void> {
        const toast =this.page.getByTestId(ArbitrationLocators.toastMessage.testId);
        await expect(toast).toBeVisible({timeout: 30000,});
        console.log('Toast:',await toast.textContent());
    }
    // ======================================================
    // GET CLAIM DISPLAY NAME
    // ======================================================
    async getClaimDisplayName(): Promise<string> {
        const claim =this.page.getByText(ArbitrationLocators.claimDisplayName).first();
        await expect(claim).toBeVisible({timeout: 30000,});
        const claimText =await claim.textContent();
        if (!claimText) {
            throw new Error('Unable to retrieve created claim name.');
        }
        const match =claimText.match(/BSE_UAT.*\d+.*\d{4}/i);
        if (!match) {
            throw new Error(`Unable to extract claim display name from: ${claimText}`);
        }
        const displayName =match[0];
        console.log(`Created Arbitration Claim: ${displayName}`);
        return displayName;
    }
}