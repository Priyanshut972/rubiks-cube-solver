import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import Cube from './components/Cube';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Cube />
      </Container>
    </>
  );
}

export default App;