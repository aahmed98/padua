import { useEffect } from "react";
import { oauth2 as SMART } from "fhirclient";

const Launch = () => {
  useEffect(() => {
    console.log("reauthorizing...");
    SMART.authorize({
      clientId: "my_web_app",
      scope: "launch/patient",
      redirectUri: "/app",
    });
  });

  return <div>Launching...</div>;
};

export default Launch;