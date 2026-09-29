// ==========================================================
// PROCEEDINGS LOCATORS
// ==========================================================

export const ProceedingsLocators = {

    // ======================================================
    // RESPOND
    // ======================================================

    respondMessage: {
        text: 'Respond',
    },


    // ======================================================
    // MESSAGE TYPE
    // ======================================================

    messageTypeDropdown: {
        role: 'combobox' as const,
        name: 'Message Type',
    },


    searchOptions: {
        role: 'combobox' as const,
        name: 'Search options',
    },


    messageTypeOption: {
        role: 'option' as const,
    },


    // ======================================================
    // AWARD DATE
    // ======================================================

    awardDate: {
        role: 'textbox' as const,
        name: 'Award Date *',
    },


    // ======================================================
    // AWARD AMOUNT
    // ======================================================

    awardAmount: {
        role: 'textbox' as const,
        name: 'Award Amount *',
    },


    // ======================================================
    // STATEMENT
    // ======================================================

    statementOfClaimDefense: {
        role: 'textbox' as const,
        name:
            'Statement of Claim/Defense (quote specific dates, time and events), Grounds for Interim Relief (if any), Add Attachments as appropriate (Agreements, Evidence in Support, ID proof, Authority Letter, Relevant Correspondence etc.) These will be made part of the arbitration proceedings. Feel free to submit as many responses as necessary.',
    },


    // ======================================================
    // FILE INPUT
    // ======================================================

    fileInput:
        'input[type="file"]',


    // ======================================================
    // SELECT TAG
    // ======================================================

    selectTag: {
        role: 'combobox' as const,
        name: 'Select Tag',
    },


    // ======================================================
    // TAG OPTION
    // ======================================================

    tagOption: {
        role: 'option' as const,
    },


    // ======================================================
    // FINAL RESPOND
    // ======================================================

    finalRespond: {
        role: 'button' as const,
        name: 'Respond',
    },


    // ======================================================
    // OK
    // ======================================================

    okButton: {
        role: 'button' as const,
        name: 'OK',
    },
};