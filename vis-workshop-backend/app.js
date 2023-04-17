const express = require('express')
require('dotenv').config();
const fetch = require('./bin/fetch');
const auth = require('./bin/auth');
const app = express()
const port = 5050

app.get('/request-credential', async (req, res) => {
     try {
        const authResponse = await auth.getToken(auth.tokenRequest);
        const response = await fetch.callApi(auth.apiConfig.requestUri, authResponse.accessToken);
        console.log(response);
    } catch (error) {
        console.log(error);
    } 
    res.send('token');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})