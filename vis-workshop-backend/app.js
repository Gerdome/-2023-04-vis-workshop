const express = require('express')
const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser');
const fetch = require('./bin/fetch');
const app = express()
const port = 5050

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))
app.use(bodyParser.json());

app.post('/request-credential', async (req, res) => {
    endpoint = "https://verifiedid.did.msidentity.com/v1.0/verifiableCredentials/createIssuanceRequest";
    payload = {
        "includeQRCode": true,
        "callback": {
            "url": "https://www.contoso.com/api/issuer/issuanceCallback",
            "state": "de19cb6b-36c1-45fe-9409-909a51292a9c",
        },
        "authority": "did:web:auxiliary.ipt.ch",
        "registration": {
            "clientName": "VerifizierBAR"
        },
        "type": "VerifizierBAR",
        "manifest": "https://verifiedid.did.msidentity.com/v1.0/tenants/a9080dcf-8589-4cb6-a2e2-21398dc6c671/verifiableCredentials/contracts/0c035ed1-2e13-c786-a03a-eee4459541dd/manifest",
        "claims": {
            "given_name": req.body.firstName,
            "last_name": req.body.lastName,
            "age": req.body.age
        },
        "pin": {
            "value": req.body.pin.toString(),
            "length": 4
        }
    };

    let response = null;
     try {
        response = await fetch.callApi(endpoint, payload);
    } catch (error) {
        console.log(error);
        response = error;
    } 
    res.send(response);
})

app.post("/request-verification", async (req, res) => {
    endpoint = "https://verifiedid.did.msidentity.com/v1.0/verifiableCredentials/createPresentationRequest";
    payload = {
        "includeQRCode": true,
        "authority": "did:web:auxiliary.ipt.ch",
        "registration": {
            "clientName": "VerifizierBAR Verifier"
        },
        "callback": {
            "url": "https://www.contoso.com/api/verifier/presentationCallback",
            "state": "92d076dd-450a-4247-aa5b-d2e75a1a5d58",
            "headers": {
                "api-key": "OPTIONAL API-KEY for CALLBACK EVENTS"
            }
        },
        "requestedCredentials": [
            {
                "type": "VerifizierBAR",
                "purpose": "Damit wir überprüfen können, ob du Bier trinken darfst",
                "acceptedIssuers": [
                    "did:web:auxiliary.ipt.ch",
                ],
                "configuration": {
                    "validation": {
                        "allowRevoked": false,
                        "validateLinkedDomain": false
                    }
                }
            }
        ]
    }
    let response = null;
    try {
        response = await fetch.callApi(endpoint, payload);
    } catch (error) {
        response = error;
        console.log(error);
    } 
    return res.send(response);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})