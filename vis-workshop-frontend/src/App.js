import './App.css';
import { TextField, Button, AppBar, Box } from '@mui/material';

const callback = () => {
  console.log("Callback successful");
}

// TODO: Callback erstellen (html tag: success)

async function test() {
  fetch('https://login.microsoftonline.com/a9080dcf-8589-4cb6-a2e2-21398dc6c671/oauth2/v2.0/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'client_id=6dbe8828-facb-42b9-b3a2-1c6e8a670edd&scope=3db474b9-6a0c-4840-96ac-1fceb342124f/.default&client_secret={secret}&grant_type=client_credentials'})
}

async function getAzureToken() {
  try {
    const response = await fetch("https://login.microsoftonline.com/a9080dcf-8589-4cb6-a2e2-21398dc6c671/oauth2/v2.0/token", {
      body: "client_id=6dbe8828-facb-42b9-b3a2-1c6e8a670edd&scope=3db474b9-6a0c-4840-96ac-1fceb342124f/.default&client_secret={secret}&grant_type=client_credentials",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function postCall(payload, token) {
  try {
    const response = await fetch("https://verifiedid.did.msidentity.com/v1.0/verifiableCredentials/createIssuanceRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

const requestCredential = (firstName, lastName) => {
  let payload = {
    "includeQRCode": true,
    "callback": {
      "url": "https://www.contoso.com/api/issuer/issuanceCallback",
      "state": "de19cb6b-36c1-45fe-9409-909a51292a9c",
      "headers": {
        "api-key": "OPTIONAL API-KEY for CALLBACK EVENTS"
      }
    },
    "authority": "did:web:auxiliary.ipt.ch",
    "registration": {
      "clientName": "VerifizierBAR"
    },
    "type": "VerifiedCredentialExpert",
    "manifest": "https://verifiedid.did.msidentity.com/v1.0/tenants/a9080dcf-8589-4cb6-a2e2-21398dc6c671/verifiableCredentials/contracts/15483301-cfb2-a101-4683-52b0bc4b7eac/manifest",
    "claims": {
      "given_name": firstName,
      "family_name": lastName
    },
    "pin": {
      "value": "3539",
      "length": 4
    }
  };
  postCall(payload, "some-token");
}

function App() {
  return (
    <div className="App">
      <AppBar>
        <toolbar>
          <h1>VerifizierBAR </h1>
        </toolbar>
      </AppBar>

      <Box height={'100px'} />
      <form>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Vorname"
          variant="outlined"
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Nachname"
          variant="outlined"
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="number"
          label="Alter"
          variant="outlined"
        />
        <br />

        <Button style={{ margin: "20px" }} variant="contained" color="primary" onClick={() => test()}>
          save
        </Button>
      </form>
    </div>
  );
}

export default App;
