// ==========================================================
// PARTY TEST DATA
// ==========================================================

export const partyData = {

    // ======================================================
    // CLAIMANT
    // ======================================================

    claimant: {

        name: 'Mary',

        email: 'mary@yop.com',

        phone: '0099887766',

        address: 'Bangalore',
    },


    // ======================================================
    // CLAIMANT REPRESENTATIVE
    // ======================================================

    claimantRepresentative: {

        name: 'Bruno',

        email: 'bruno@yop.com',

        phone: '0088997788',

        address: 'Bangalore',

        role: 'Claimant Representative',

        representativeFor: 'Mary',

        // IMPORTANT:
        // This is exactly how the representative
        // appears in the claim UI.

        displayName: 'Rep: Bruno',
    },


    // ======================================================
    // RESPONDENT
    // ======================================================

    respondent: {

        name: 'Luca',

        email: 'luca@yop.com',

        phone: '0000998899',

        address: 'Bangalore',

        role: 'Respondent',
    },


    // ======================================================
    // RESPONDENT REPRESENTATIVE
    // ======================================================

    respondentRepresentative: {

        name: 'Paul',

        email: 'paul@yop.com',

        phone: '0099009988',

        address: 'Bangalore',

        role: 'Respondent Representative',

        representativeFor: 'Luca',

        // IMPORTANT:
        // This is exactly how the representative
        // appears in the claim UI.

        displayName: 'Rep: Paul',
    },
};