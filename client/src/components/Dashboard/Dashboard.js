import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Fab, Tooltip, Typography, Zoom } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export const Dashboard = () => {
  return (
    <Box position="relative" height="100%">
      Dashboard

      <Box position="absolute" bottom={16} right={16}>
        <Zoom
          in
          unmountOnExit
          style={{ transitionDelay: '500ms' }}
        >
          <Tooltip arrow title={<Typography>Add survey</Typography>}>
            <Fab
              color="secondary"
              component={Link}
              to="/surveys/new"
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Zoom>
      </Box>
    </Box>
  );
};
