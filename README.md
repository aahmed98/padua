# PADUA Risk Calculator SMART on FHIR App

This SMART on FHIR application calculates the **PADUA Risk Score** for **Venous Thromboembolism (VTE)** based on patient data fetched from an EHR system. The app automatically pulls relevant information from FHIR resources and calculates the risk score. If necessary, users can manually input missing data.

## Features

- Fetch patient data from FHIR server (via SMART on FHIR).
- Automatically deduce PADUA risk factors from FHIR resources (e.g., problems list, medications).
- Allow manual input for missing or unavailable data.
- Display the calculated PADUA risk score with clinical guidance similar to MDCalc.
- User-friendly interface built with React.

## Prerequisites

Before you run the app, make sure you have the following:

1. **Node.js** and **npm** installed on your machine.
   - You can download and install Node.js from [https://nodejs.org/](https://nodejs.org/).
2. An active **SMART on FHIR** environment and credentials to register the app with a client ID.
   - You can use the SMART sandbox at [http://launch.smarthealthit.org](http://launch.smarthealthit.org) for testing.
3. Familiarity with React and JavaScript.

## Getting Started

Follow these steps to run the app on your local machine:

### Step 1: Clone the repository

```bash
git clone https://github.com/aahmed98/padua.git
cd padua
```

### Step 2: Install dependencies

In your project directory, run the following command to install the necessary dependencies:

```bash
npm install
```

### Step 3: Set up the environment

You need to set up the SMART on FHIR app by registering it with a client ID and configuring the authorization settings. For testing purposes, you can use the SMART sandbox.

1. **Configure your `clientId`* and `redirectUri`** in the React components:
   - In `Launch.js`, the `clientId` should match the one registered with your SMART on FHIR environment.
   - The `redirectUri` will point to your local server (e.g., `http://localhost:3000/app`).

*Skip setting `clientId` if you are querying public (i.e. sandbox) FHIR servers.

2. **Launch the authorization flow** from the `Launch` component:
   - The `Launch` component triggers the SMART on FHIR authorization flow and redirects the user back to the `App` after successful authentication.

### Step 4: Running the App Locally

Use the following command to start a local development server:

```bash
npm start
```

This will start the app on `http://localhost:3000`. 

You can now launch the app using the SMART Sandbox or an actual EHR system.

### Step 5: Launching the App with the SMART Sandbox

To test the app with the SMART sandbox:

1. Go to [http://launch.smarthealthit.org](http://launch.smarthealthit.org).
2. Type `http://localhost:3000/` into the  App's Launch URL.
3. Click **Launch**. This will initiate the SMART on FHIR authorization flow.
4. Once the patient is selected and the authorization process is completed, the app will load with the patient's data.

## Features and Usage

### 1. **PADUA Risk Score Calculation**

Once the patient is authorized and data is fetched, the app will attempt to automatically extract the following PADUA risk factors:

- **Active Cancer**
- **Previous VTE (Excluding superficial vein thrombosis)**
- **Reduced Mobility**
- **Already Known Thrombophilic Condition**
- **Recent Trauma/Surgery**
- **Elderly Age (≥70 years)**
- **Heart/Respiratory Failure**
- **Acute MI/Ischemic Stroke**
- **Acute Infection/Rheumatologic Disorder**
- **Obesity (BMI ≥30)**
- **Ongoing Hormonal Treatment**

If any of these are not available from the FHIR resources, you will be prompted to manually input the data.

### 2. **Input Fields**

For each risk factor, there will be a field where:

- If data is available from FHIR resources, it is pre-filled.
- If data is missing, you can manually input the value (e.g., "Yes" or "No" for each factor).

### 3. **Clinical Guidance**

The app will calculate the PADUA score based on the provided inputs and display the result, along with clinical guidance similar to how MDCalc presents risk scores.

## File Structure

- **`src/index.js`**: The entry point for the app, which sets up routing between the `Launch` and `App` components.
- **`src/Launch.js`**: Component that initiates the SMART on FHIR authorization flow.
- **`src/App.js`**: Main React component that handles the user interface and PADUA score calculation.
- **`src/utils/fhirUtils.js`**: Utility functions for fetching data from the FHIR server and extracting relevant risk factors.
- **`src/utils/codes.js`**: List of codes for each risk factor used to calculated PADUA.

## Development

If you wish to contribute to this project or make changes:

1. Fork the repository.
2. Make changes in your fork.
3. Submit a pull request with a detailed description of your changes.

### To add or modify codes

The `codes.js` file contains a list of codes (SNOMED, ICD10, RxNorm) used to check for the existence of certain conditions in the FHIR resources. You can modify these lists to add or remove codes as needed. These codes are essential for determining the presence of various risk factors in the patient's medical records.

## Troubleshooting

If you encounter issues, here are some things to check:

1. Ensure your SMART on FHIR environment is properly set up.
2. Verify the `clientId` and `redirectUri` in the `Launch.js` and `App.js` components.
3. Check the console for errors related to missing data or authorization issues.

If you need further assistance, feel free to open an issue on the GitHub repository!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.