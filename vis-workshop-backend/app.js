const express = require('express')
const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser');
const fetch = require('./bin/fetch');
const app = express()
const port = 5050

var issuanceCallbackState = "inactive"; 
var verificationCallbackState = "inactive"; 
var verificationCallbackClaims; 

const whitelist = ["http://localhost:3001"]
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

// TODO
app.post("/request-credential", async (req, res) => {
    endpoint = "https://verifiedid.did.msidentity.com/v1.0/verifiableCredentials/createIssuanceRequest";
    payload = {
        "includeQRCode": true,
        "callback": {
            "url": "https://c54d-2a04-ee41-3-2369-6896-1082-704b-3b0b.ngrok-free.app/issuance-callback",
            "state": ""
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

app.post("/issuance-callback", async (req, res) => {
    console.log("Issuance callback received");
    issuanceCallbackState = req.body.requestStatus;
    console.log("Issuance state set to:", issuanceCallbackState);
    res.send();
})

app.get("/request-credential-state", async (req, res) => {
    res.send({
        "state": issuanceCallbackState
    });
})

// TODO
app.post("/request-verification", async (req, res) => {
    endpoint = "https://verifiedid.did.msidentity.com/v1.0/verifiableCredentials/createPresentationRequest";
    payload = {
        "includeQRCode": true,
        "authority": "did:web:auxiliary.ipt.ch",
        "registration": {
            "clientName": "VerifizierBAR Verifier"
        },
        "callback": {
            "url": "https://c54d-2a04-ee41-3-2369-6896-1082-704b-3b0b.ngrok-free.app/verification-callback",
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

app.post("/verification-callback", async (req, res) => {
    console.log("Verification callback received");
    if (req.body) {
        if (req.body.verifiedCredentialsData) verificationCallbackClaims = req.body.verifiedCredentialsData[0].claims;
        if (req.body.requestStatus) verificationCallbackState = req.body.requestStatus;
    }
    res.send();
})

app.get("/request-verification-state", async (req, res) => {
    res.send({
        "state": verificationCallbackState,
        "claims": verificationCallbackClaims
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

app.get("/reset", async (req, res) => {
    issuanceCallbackState = "inactive"; 
    verificationCallbackState = "inactive"; 
    verificationCallbackClaims = "inactive";
    res.send();
})

app.get("/ping", async (req, res) => {
    res.send({"ping": true});
})