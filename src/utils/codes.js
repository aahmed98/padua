// codes.js
export const PADUA_CODES = {
    activeCancer: {
        SNOMED: ["444814009"], // TEST
        ICD10: [], // Broad range of cancer ICD codes
    },
    previousVTE: {
        SNOMED: [], // History of DVT
        ICD10: ["I26", "I82.91", "O22.3"],
    },
    reducedMobility: {
        SNOMED: [], // Immobility syndrome
        ICD10: [],      // Reduced mobility
    },
    knownThrombophilia: {
        SNOMED: [],  // Thrombophilia
        ICD10: ["D68.1", "D68.6"],      // Specific ICD for thrombophilia
    },
    recentTraumaSurgery: {
        SNOMED: [], // Recent surgery
        ICD10: [],     // History of surgery/trauma
    },
    elderlyAge: null, // Will check patient birthdate
    heartRespiratoryFailure: {
        SNOMED: [], // Heart failure
        ICD10: ["I50", "J96"],        // Heart failure ICD codes
    },
    acuteMIIschemicStroke: {
        SNOMED: [], // Myocardial infarction
        ICD10: ["I21", "I63", "I61", "I62.9"], // Ischemic stroke ICD codes
    },
    acuteInfectionRheumDisorder: {
        SNOMED: [], // Rheumatoid arthritis
        ICD10: [], // Rheumatic disorders ICD codes
    },
    obesity: {
        SNOMED: [], // Obesity
        ICD10: [],        // Obesity ICD
    },
    hormonalTreatment: {
        RxNorm: [],    // Oral contraceptive
    },
};