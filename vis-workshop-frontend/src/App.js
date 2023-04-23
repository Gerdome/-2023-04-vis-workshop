import HouseIcon from '@mui/icons-material/House';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Form } from './Form';
import { Home } from './Home';
import { Verifier } from './Verifier';


export function ButtonAppBar() {
  const navigate = useNavigate();

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
          <Button color="inherit">IPT & VIS</Button>
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
