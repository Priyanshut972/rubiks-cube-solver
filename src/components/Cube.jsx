import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CubeDisplay from './CubeDisplay';
import CubeControls from './CubeControls';
import StepList from './StepList';
import { RubiksCube } from '../models/RubiksCube';

export default function Cube() {
  const [cube, setCube] = useState(new RubiksCube());
  const [steps, setSteps] = useState([]);

  const handleRotate = (face, dir) => {
    const newCube = new RubiksCube();
    Object.assign(newCube, JSON.parse(JSON.stringify(cube)));
    newCube.rotateFace(face, dir);
    setCube(newCube);
  };

  const handleScramble = () => {
    const newCube = new RubiksCube();
    Object.assign(newCube, JSON.parse(JSON.stringify(cube)));
    newCube.scramble();
    setCube(newCube);
    setSteps([]);
  };

  const handleReset = () => {
    setCube(new RubiksCube());
    setSteps([]);
  };

  const handleSolve = () => {
    const newCube = new RubiksCube();
    Object.assign(newCube, JSON.parse(JSON.stringify(cube)));
    const solutionSteps = newCube.solve();
    setSteps(solutionSteps);
    setCube(newCube);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 4 }}>
      <Typography variant="h4" align="center">Rubik's Cube Solver</Typography>
      
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1 }}>
          <CubeDisplay cube={cube} />
        </Box>
        <Box sx={{ flex: 2 }}>
          <CubeControls 
            onRotate={handleRotate}
            onScramble={handleScramble}
            onReset={handleReset}
            onSolve={handleSolve}
          />
          <StepList steps={steps} />
        </Box>
      </Box>
    </Box>
  );
}