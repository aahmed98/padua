import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { oauth2 as SMART } from "fhirclient";
import PADUACalculator from "./components/PADUACalculator";
import queryString from "query-string";
import { jwtDecode } from 'jwt-decode';
const FHIR = require('fhirclient');

const App = () => {
  const [patientData, setPatientData] = useState(null);
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { code } = queryString.parse(location.search);
  const baseUrl = "https://launch.smarthealthit.org/v/r4/fhir/";

  useEffect(() => {
    // extract patientId from URL
    const decodedToken = jwtDecode(code);
    const patientId = decodedToken?.context?.patient;

    SMART.ready().then(client => {
      if (client.patient.id != patientId) {
        // manually instantiate client if new patient is selected
        // access token is still valid
        client = manuallyCreateClient(code, patientId);
      }
      setClient(client);
      client.patient.read()
        .then(patient => {
          setPatientData(patient);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    }).catch(console.error);

  }, []);

  const manuallyCreateClient = (access_token, patient_id) => {
    const client = FHIR.client(
      {
        serverUrl: baseUrl,
        tokenResponse: {
          access_token: access_token,
          token_type: "Bearer", // This is typically "Bearer"
          patient: patient_id
        }
      });
    return client;
  }

  if (isLoading) {
    return <div>Loading patient data...</div>;
  }

  return (
    <div>
      <h1>PADUA Risk Calculator</h1>
      <h2>Patient Name: {patientData?.name[0].given[0]} {patientData?.name[0].family}</h2>
      <PADUACalculator patientData={patientData} client={client} />
    </div>
  );
};

export default App;