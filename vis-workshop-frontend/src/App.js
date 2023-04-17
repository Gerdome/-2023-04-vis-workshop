import './App.css';
import { TextField, Button, AppBar, Box } from '@mui/material';


const callback = () => {
  console.log("Callback successful");
}

// TODO: Callback erstellen (html tag: success)

async function getCredential() {
  try {
    const response = await fetch("https://localhost:5050/request-credential", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
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

        <Button style={{ margin: "20px" }} variant="contained" color="primary" onClick={() => getCredential()}>
          save
        </Button>
      </form>
    </div>
  );
}

export default App;
