import { useState, useEffect } from "react";
import { oauth2 as SMART } from "fhirclient";
import PADUACalculator from "./components/PADUACalculator";

const App = () => {
  const [patientData, setPatientData] = useState(null);
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SMART.ready().then(client => {
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

  if (isLoading) {
    return <div>Loading patient data...</div>;
  }

  return (
    <div>
      <h1>PADUA Risk Calculator</h1>
      <PADUACalculator patientData={patientData} client={client} />
    </div>
  );
};

export default App;