const express = require('express')
const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser');
const fetch = require('./bin/fetch');
const auth = require('./bin/auth');
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
    let response;
     try {
        const authResponse = await auth.getToken(auth.tokenRequest);
        response = await fetch.callApi(req.body, authResponse.accessToken);
    } catch (error) {
        console.log(error);
        response = error;
    } 
    res.send(response);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})