import { Check } from '@mui/icons-material';
import HouseIcon from '@mui/icons-material/House';
import { AppBar, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Form } from './Form';
import { Home } from './Home';
import { Verifier } from './Verifier';


export function ButtonAppBar() {
  const navigate = useNavigate();
  const [connectedToServer, setConnectedToServer] = useState(false);


  useEffect(() => {
    async function ping() {
      try {
        const response = await fetch("http://localhost:5050/ping");
        const result = await response.json();
        if (result.ping) setConnectedToServer(true);
      }
      catch (error) {
        console.error("Error:", error);
      }
    }
    ping();
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <HouseIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            VerifizierBAR
          </Typography>
            {connectedToServer ? <Check/> : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ButtonAppBar />
        <Box height={'20px'} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issue" element={<Form />} />
          <Route path="/verify" element={<Verifier />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
