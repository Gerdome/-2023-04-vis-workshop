const axios = require('axios');

/**
 * Calls the endpoint with authorization bearer token.
 * @param {string} endpoint 
 * @param {string} accessToken 
 */
async function callApi(endpoint, accessToken) {

    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    console.log('request made to Verifiable Credentials endpoint at: ' + new Date().toString());
    /* 
        try {
            const response = await axios.post(endpoint, options);
            return response.data;
        } catch (error) {
            console.log(error)
            return error;
        } */

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
            "given_name": "Conradin",
            "family_name": "Roffler"
        },
        "pin": {
            "value": "3539",
            "length": 4
        }
    };

    try {
        const response = await axios.post("https://verifiedid.did.msidentity.com/v1.0/verifiableCredentials/createIssuanceRequest", {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        console.log("Success:", result);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
};

module.exports = {
    callApi: callApi
};