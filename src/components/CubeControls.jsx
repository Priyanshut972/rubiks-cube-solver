import React from 'react';
import { Button, ButtonGroup, Typography, Box } from '@mui/material';

export default function CubeControls({ onRotate, onScramble, onReset, onSolve }) {
  const rotations = [
    { face: 'U', dir: 1, label: 'U' },
    { face: 'U', dir: -1, label: 'U\'' },
    { face: 'D', dir: 1, label: 'D' },
    { face: 'D', dir: -1, label: 'D\'' },
    { face: 'F', dir: 1, label: 'F' },
    { face: 'F', dir: -1, label: 'F\'' },
    { face: 'B', dir: 1, label: 'B' },
    { face: 'B', dir: -1, label: 'B\'' },
    { face: 'L', dir: 1, label: 'L' },
    { face: 'L', dir: -1, label: 'L\'' },
    { face: 'R', dir: 1, label: 'R' },
    { face: 'R', dir: -1, label: 'R\'' }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Manual Rotations</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {rotations.map((rot, i) => (
          <Button 
            key={i}
            variant="contained"
            onClick={() => onRotate(rot.face, rot.dir)}
          >
            {rot.label}
          </Button>
        ))}
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="secondary" onClick={onScramble}>
          Scramble Cube
        </Button>
        <Button variant="contained" color="primary" onClick={onSolve}>
          Solve Cube
        </Button>
        <Button variant="contained" onClick={onReset}>
          Reset Cube
        </Button>
      </Box>
    </Box>
  );
}