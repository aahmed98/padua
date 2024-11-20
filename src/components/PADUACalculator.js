import { useState, useEffect } from "react";
import InputField from "./InputField";
import PADUAScore from "./PADUAScore";
import { deduceRiskFactors } from "../utils/fhirUtils";

const PADUACalculator = ({ patientData, client }) => {
    const riskFactors = [
        { field: "activeCancer", label: "Active Cancer", score: 3 },
        { field: "previousVTE", label: "Previous VTE (excluding superficial vein thrombosis)", score: 3 },
        { field: "reducedMobility", label: "Reduced Mobility", score: 3 },
        { field: "thrombophilicCondition", label: "Already Known Thrombophilic Condition", score: 3 },
        { field: "recentTraumaOrSurgery", label: "Recent (≤1 month) Trauma and/or Surgery", score: 2 },
        { field: "elderlyAge", label: "Elderly Age (≥70 years)", score: 1 },
        { field: "heartOrRespiratoryFailure", label: "Heart and/or Respiratory Failure", score: 1 },
        { field: "acuteMIOrStroke", label: "Acute MI and/or Ischemic Stroke", score: 1 },
        { field: "acuteInfectionOrRheumatologic", label: "Acute Infection and/or Rheumatologic Disorder", score: 1 },
        { field: "obesity", label: "Obesity (BMI ≥30)", score: 1 },
        { field: "hormonalTreatment", label: "Ongoing Hormonal Treatment", score: 1 },
    ];

    const [inputs, setInputs] = useState(
        riskFactors.reduce((acc, rf) => ({ ...acc, [rf.field]: null }), {})
    );

    useEffect(() => {
        const fetchRiskFactors = async () => {
            try {
                const extractedInputs = await deduceRiskFactors(client, patientData);
                setInputs(inputs => ({ ...inputs, ...extractedInputs }));
            } catch (error) {
                console.error("Error deducing PADUA risk factors:", error);
            }
        };

        fetchRiskFactors();
    }, [patientData, client]);

    const handleInputChange = (field, value) => {
        setInputs(inputs => ({ ...inputs, [field]: value }));
    };

    return (
        <div>
            <h2>Inputs</h2>
            {riskFactors.map(rf => (
                <InputField
                    key={rf.field}
                    field={rf.field}
                    label={rf.label}
                    value={inputs[rf.field]} // default: null
                    onChange={handleInputChange}
                />
            ))}
            <PADUAScore inputs={inputs} riskFactors={riskFactors} />
        </div>
    );
};

export default PADUACalculator;
