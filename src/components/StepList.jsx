import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

export default function StepList({ steps }) {
  return (
    <Paper sx={{ padding: 2, maxHeight: 300, overflow: 'auto', mt: 2 }}>
      <Typography variant="h6">Solution Steps</Typography>
      {steps.length === 0 ? (
        <Typography>No steps yet</Typography>
      ) : (
        <List dense>
          {steps.map((step, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={`Step ${index + 1}: ${step.face}${step.dir === -1 ? "'" : ""}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}