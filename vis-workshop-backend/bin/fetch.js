const axios = require('axios');
const auth = require('./auth');

/**
 * Calls the endpoint with authorization bearer token.
 * @param {string} endpoint 
 * @param {string} accessToken 
 */
async function callApi(endpoint, payload) {
    console.log('request made to Verifiable Credentials endpoint at: ' + new Date().toString());
    try {
        const authResponse = await auth.getToken(auth.tokenRequest);
        const response = await axios.post(endpoint,
            JSON.stringify(payload),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authResponse.accessToken}`
                }
            });

        const result = await response.json;
        console.log("Success:", result);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
};

module.exports = {
    callApi: callApi
};