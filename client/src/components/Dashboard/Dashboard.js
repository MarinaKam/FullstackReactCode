import React from 'react';
import { Box, Fab, Tooltip, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <Box position="relative" height="100%">
      Dashboard

      <Box position="absolute" bottom={16} right={16}>
        <Tooltip arrow title={<Typography>Add survey</Typography>}>
          <Fab
            color="secondary"
            component={Link}
            to="/surveys/new"
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Box>
  );
};
