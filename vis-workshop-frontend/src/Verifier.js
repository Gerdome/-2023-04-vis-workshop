import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import './App.css';
import { useInterval } from './customHooks';

export function Verifier() {
    const [qrCodeString, setQrCodeString] = useState(null);
    const [state, setState] = useState("inactive");
    const [claims, setClaims] = useState(null);
  
    useInterval(async () => {
      if (qrCodeString && ["inactive", "request_retrieved"].includes(state)) {
        try {
          const response = await fetch("http://localhost:5050/request-verification-state");
          const result = await response.json();
          setState(result.state);
          setClaims(result.claims);
        }
        catch (error) {
          console.error("Error:", error);
        }
      }
    }, 2000)
  
    async function verifyCredential() {
      try {
        const response = await fetch("http://localhost:5050/request-verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const result = await response.json();
        setQrCodeString(result.qrCode);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
    async function startNewProcess() {
      setState("inactive");
      setQrCodeString(null);
      await fetch("http://localhost:5050/reset");
      verifyCredential();
    }
  
    return (
      <>
        {state === "inactive" ? <Button variant='contained' onClick={verifyCredential}>
          Verify some credential
        </Button> : null}
  
        {qrCodeString && state === "inactive" ?
          <div>
            <img src={qrCodeString} alt='qrCode' />
          </div> : null}
  
        {state === "request_retrieved" ?
          <div>
            <CircularProgress />
          </div>
          : null}
  
        {state === "presentation_verified" ? <div>
          <p>Success</p>
          <p>Given Name: {claims.givenName} </p>
          <p>Family Name: {claims.familyName} </p>
          <p>Age: {claims.age} </p>
  
  
  
          <Button variant='outlined' onClick={startNewProcess}>
            Verify another ID
          </Button>
        </div> : null}
      </>
    )
  }