import React from 'react';
import { Box } from '@mui/material';

const colorClassMap = {
  'w': 'sticker-white',
  'y': 'sticker-yellow',
  'g': 'sticker-green',
  'b': 'sticker-blue',
  'o': 'sticker-orange',
  'r': 'sticker-red'
};

export default function CubeDisplay({ cube }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2,
      backgroundColor: '#f0f0f0',
      p: 2,
      borderRadius: 2
    }}>
      {/* Up face */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {cube.faces.U.map((row, i) => (
          <Box key={`U-${i}`} sx={{ display: 'flex' }}>
            {row.map((color, j) => (
              <Box 
                key={`U-${i}-${j}`}
                className={colorClassMap[color]}
                sx={{
                  width: 30,
                  height: 30,
                  border: '1px solid #333',
                  margin: 0.5
                }}
              />
            ))}
          </Box>
        ))}
      </Box>
      
      {/* Middle faces */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        {['L', 'F', 'R', 'B'].map(face => (
          <Box key={face}>
            {cube.faces[face].map((row, i) => (
              <Box key={`${face}-${i}`} sx={{ display: 'flex' }}>
                {row.map((color, j) => (
                  <Box 
                    key={`${face}-${i}-${j}`}
                    className={colorClassMap[color]}
                    sx={{
                      width: 30,
                      height: 30,
                      border: '1px solid #333',
                      margin: 0.5
                    }}
                  />
                ))}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      
      {/* Down face */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {cube.faces.D.map((row, i) => (
          <Box key={`D-${i}`} sx={{ display: 'flex' }}>
            {row.map((color, j) => (
              <Box 
                key={`D-${i}-${j}`}
                className={colorClassMap[color]}
                sx={{
                  width: 30,
                  height: 30,
                  border: '1px solid #333',
                  margin: 0.5
                }}
              />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}