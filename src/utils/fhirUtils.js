import { PADUA_CODES } from "./codes";

/**
 * Fetch all patient conditions.
 * @param {Object} client - The FHIR client instance.
 * @returns {Promise<Array>} - List of Condition resources.
 */
const fetchPatientConditions = async (client) => {
    return client.request(`/Condition?patient=${client.patient.id}`, {
        resolveReferences: ["code.coding"],
        graph: true,
    }).then((conditionResource) => {
        if (!conditionResource.entry || !conditionResource.entry.length) {
            return [];
        }
        return conditionResource.entry;
    });
};

/**
 * Fetch all patient medication requests.
 * @param {Object} client - The FHIR client instance.
 * @returns {Promise<Array>} - List of MedicationRequest resources.
 */
const fetchPatientMedications = async (client) => {
    return client.request(`/MedicationRequest?patient=${client.patient.id}`, {
        resolveReferences: ["medicationReference"],
        graph: true,
    }).then((medicationResource) => {
        if (!medicationResource.entry || !medicationResource.entry.length) {
            return [];
        }
        return medicationResource.entry;
    });
};

/** 
 * Check if a set of codes is valid (at least one ontology is defined AND non-emtpy)
 * @param {Object} codes - Object with SNOMED, ICD10, and/or RxNorm codes.
 * @return {Boolean} - True if the set of codes is valid.
*/
const isCodesetValid = (codes) => {
    const { SNOMED, ICD10, RxNorm } = codes;
    if (SNOMED?.length > 0 || ICD10?.length > 0 || RxNorm?.length > 0) {
        return true;
    }
    return false;
}

const startsWithAny = (codeList, code) => {
    return codeList.some(prefix => code.startsWith(prefix));
}

/**
 * Check if a resource contains any of the specified codes.
 * @param {Object} codes - Object with SNOMED, ICD10, and/or RxNorm codes.
 * @param {Object} resource - Single FHIR resource (e.g., Condition or MedicationRequest).
 * @returns {Boolean} - True if the resource contains any matching codes.
 */
const isCodeInResource = (codes, resource) => {
    if (!codes || !resource) return null;

    const { SNOMED, ICD10, RxNorm } = codes;

    const codings = resource.code?.coding || resource.medicationCodeableConcept?.coding || [];  // List[code]

    return codings.some((coding) =>
        (SNOMED && startsWithAny(SNOMED, coding.code)) ||
        (ICD10 && startsWithAny(ICD10, coding.code)) ||
        (RxNorm && startsWithAny(RxNorm, coding.code))
    );
};

/**
 * Deduce PADUA risk factors based on FHIR data.
 * @param {Object} client - The FHIR client instance.
 * @returns {Promise<Object>} - Risk factors with boolean values.
 */
export const deduceRiskFactors = async (client, patientData) => {
    const conditions = await fetchPatientConditions(client);
    const medications = await fetchPatientMedications(client);

    // console.log(conditions);

    return {
        activeCancer: isCodesetValid(PADUA_CODES.activeCancer)
            ? conditions.some((c) => isCodeInResource(PADUA_CODES.activeCancer, c.resource))
            : null,
        previousVTE: isCodesetValid(PADUA_CODES.previousVTE)
            ? conditions.some((c) => isCodeInResource(PADUA_CODES.previousVTE, c.resource))
            : null,
        reducedMobility: isCodesetValid(PADUA_CODES.reducedMobility)
            ? conditions.some((c) => isCodeInResource(PADUA_CODES.reducedMobility, c.resource))
            : null,
        knownThrombophilia: isCodesetValid(PADUA_CODES.knownThrombophilia)
            ? conditions.some((c) => isCodeInResource(PADUA_CODES.knownThrombophilia, c.resource))
            : null,
        recentTraumaSurgery: isCodesetValid(PADUA_CODES.recentTraumaSurgery)
            ? conditions.some((c) => isCodeInResource(PADUA_CODES.recentTraumaSurgery, c.resource))
            : null,
        elderlyAge: patientData.birthDate
            ? calculateAge(patientData.birthDate) >= 70
            : null,
        heartRespiratoryFailure: isCodesetValid(PADUA_CODES.heartRespiratoryFailure)
            ? conditions.some((c) => isCodeInResource(PADUA_CODES.heartRespiratoryFailure, c.resource))
            : null,
        acuteMIIschemicStroke: isCodesetValid(PADUA_CODES.acuteMIIschemicStroke)
            ? conditions.some((c) => isCodeInResource(PADUA_CODES.acuteMIIschemicStroke, c.resource))
            : null,
        acuteInfectionRheumDisorder: isCodesetValid(PADUA_CODES.acuteInfectionRheumDisorder)
            ? conditions.some((c) => isCodeInResource(PADUA_CODES.acuteInfectionRheumDisorder, c.resource))
            : null,
        obesity: isCodesetValid(PADUA_CODES.obesity)
            ? conditions.some((c) => isCodeInResource(PADUA_CODES.obesity, c.resource))
            : null,
        hormonalTreatment: isCodesetValid(PADUA_CODES.hormonalTreatment)
            ? medications.some((m) => isCodeInResource(PADUA_CODES.hormonalTreatment, m.resource))
            : null,
    };
};

/**
 * Calculate age from a birth date.
 * @param {String} birthDate - Patient's birth date in YYYY-MM-DD format.
 * @returns {Number} - Patient's age.
 */
const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
};