// codes.js
export const PADUA_CODES = {
    activeCancer: {
        SNOMED: ["444814009"], // Malignant neoplastic disease
        ICD10: [], // Broad range of cancer ICD codes
    },
    previousVTE: {
        SNOMED: [], // History of DVT
        ICD10: [],     // Chronic VTE
    },
    reducedMobility: {
        SNOMED: [], // Immobility syndrome
        ICD10: [],      // Reduced mobility
    },
    knownThrombophilia: {
        SNOMED: [],  // Thrombophilia
        ICD10: [],      // Specific ICD for thrombophilia
    },
    recentTraumaSurgery: {
        SNOMED: [], // Recent surgery
        ICD10: [],     // History of surgery/trauma
    },
    elderlyAge: null, // Will check patient birthdate
    heartRespiratoryFailure: {
        SNOMED: [], // Heart failure
        ICD10: [],        // Heart failure ICD codes
    },
    acuteMIIschemicStroke: {
        SNOMED: [], // Myocardial infarction
        ICD10: [], // Ischemic stroke ICD codes
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