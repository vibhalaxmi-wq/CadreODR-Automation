// ==========================================================
// ARBITRATION LOCATORS
// ==========================================================
export const ArbitrationLocators = {
    // ======================================================
    // CLAIM MENU
    // ======================================================
    openMenuButton: {
        role: 'button' as const,
        name: 'Open menu',
    },
    closeMenuButton: {
        role: 'button' as const,
        name: 'Close menu',
    },
    newClaimButton: {
        role: 'button' as const,
        name: 'New Claim',
    },
    // ======================================================
    // ORGANIZATION
    // ======================================================
    organizationDropdown: {
        role: 'combobox' as const,
        name: 'Choose Organization',
    },
    organization: 'BSE_UAT',
    // ======================================================
    // ADD PARTY
    // ======================================================
    addPartyButton: '+ Add Party',
    addUserDialog: 'Add User',
    addButton: {
        role: 'button' as const,
        name: 'Add',
    },
    // ======================================================
    // PARTY FIELDS
    // ======================================================
    nameTextbox: {
        role: 'textbox' as const,
        name: 'Name',
    },
    emailTextbox: {
        role: 'textbox' as const,
        name: 'Email',
    },
    phoneTextbox: {
        role: 'textbox' as const,
        name: /Phone/i,
    },
    addressTextbox: {
        role: 'textbox' as const,
        name: /Address/i,
    },
    // ======================================================
    // ROLE
    // ======================================================
    chooseRoleDropdown: {
        role: 'combobox' as const,
        name: 'Choose Role',
    },
    respondentRole: 'Respondent',
    // ======================================================
    // CLAIM DETAILS
    // ======================================================
    disputeAmount: {
        role: 'textbox' as const,
        name: /Dispute Amount/i,
    },
    contract: {
        role: 'textbox' as const,
        name: /Loan\/Contract\/Agreement/i,
    },
    jurisdiction: {
        role: 'textbox' as const,
        name: /Jurisdiction/i,
    },
    // ======================================================
    // DISPUTE TYPE
    // ======================================================
    disputeTypeContainer:
        '._inner-container_1ynrb_10',
    disputeType: 'Arbitration',
    // ======================================================
    // CLAIM TYPE
    // ======================================================
    claimType: {
        role: 'textbox' as const,
        name: 'Claim Type *',
    },
    claimTypeOption: 'Loan Default',
    // ======================================================
    // SUMMARY
    // ======================================================
    summary: {
        role: 'textbox' as const,
        name: 'Summary *',
    },

    // ======================================================
    // LOG CLAIM
    // ======================================================
    logClaimButton: {
        role: 'button' as const,
        name: 'Log Claim',
    },
    // ======================================================
    // TOAST
    // ======================================================
    toastMessage: {
        testId: 'toast-message',
    },
    // ======================================================
    // CLAIM DISPLAY NAME
    // ======================================================
    claimDisplayName:
        /BSE_UAT.*\d+.*\d{4}/i,
};