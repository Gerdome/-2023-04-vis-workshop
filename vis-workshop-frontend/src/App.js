import './App.css';
import { TextField, Button, AppBar, Box } from '@mui/material';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const callback = () => {
  console.log("Callback successful");
}

// TODO: Callback erstellen (html tag: success)
function App() {
  return (
    <div className="App">
      <AppBar>
        <toolbar>
          <h1>VerifizierBAR</h1>
        </toolbar>
      </AppBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(null);
  const [qrCodeString, setQrCodeString] = useState(null);
  const [pin, setPin] = useState(null);

  async function getCredential() {
    setPin(Math.floor(1000 + Math.random() * 9000));
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
      setQrCodeString(result.qrCode.split(',')[1]);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <div className="App">
        <Box height={'100px'} />
        <form>
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
        </form>
      </div>

      {qrCodeString ?
        <div>
          <img src={`data:image/png;base64,${qrCodeString}`} />
          <p>{pin}</p>
        </div> : null}
    </>
  );
}

export default App;
