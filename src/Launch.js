import { useEffect } from "react";
import { oauth2 as SMART } from "fhirclient";

const Launch = () => {
  useEffect(() => {
    SMART.authorize({
      clientId: "my_web_app",
      scope: "launch openid fhirUser patient/*.read",
      redirectUri: "/app", // This is where your main app lives
    });
  }, []);

  return <div>Launching...</div>;
};

export default Launch;