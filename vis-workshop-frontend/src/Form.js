import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import './App.css';
import { useInterval } from './customHooks';

export function Form() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(null);
    const [qrCodeString, setQrCodeString] = useState(null);
    const [pin, setPin] = useState(null);
    const [state, setState] = useState("inactive");
  
    useInterval(async () => {
      if (qrCodeString && ["inactive", "request_retrieved"].includes(state)) {
        try {
          const response = await fetch("http://localhost:5050/request-credential-state");
          const result = await response.json();
          setState(result.state);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }, 2000)
  
    async function startNewProcess() {
      setState("inactive");
      setPin(null);
      setFirstName("");
      setLastName("");
      setAge(null);
      setQrCodeString(null);
      await fetch("http://localhost:5050/reset");
    }
  
    // TODO
    async function getCredential() {
      let pin = Math.floor(1000 + Math.random() * 9000);
      try {
        const response = await fetch("http://localhost:5050/request-credential", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "age": age,
            "pin": pin
          })
        });
  
        const result = await response.json();
        setQrCodeString(result.qrCode);
        setPin(pin);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
    return (
      <>
        {state === "inactive" ? <form>
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="Vorname"
            variant="outlined"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <br />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="Nachname"
            variant="outlined"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <br />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="number"
            label="Alter"
            variant="outlined"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
          <br />
  
          <Button style={{ margin: "20px" }} variant="contained" color="primary" onClick={getCredential}>
            save
          </Button>
        </form> : null}
  
  
        {qrCodeString && state === "inactive" ?
          <div>
            <img src={qrCodeString} alt='qrCode' />
          </div> : null}
  
        {state === "request_retrieved" ?
          <div>
            <CircularProgress />
            <p>{pin}</p>
          </div>
          : null}
  
        {state === "issuance_successful" ? <div>
          <p>Success</p>
  
          <Button variant='contained' onClick={startNewProcess}>
            Issue new Verifiable ID
          </Button>
        </div> : null}
      </>
    );
  }
  