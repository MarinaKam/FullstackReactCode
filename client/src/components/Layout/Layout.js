import React from 'react';
import { mdiGoogle } from '@mdi/js';
import { Icon } from '@mdi/react';
import { Box, AppBar, Toolbar, Typography, Button, Link } from '@material-ui/core';
import { SvgIcon } from '../SvgIcon';

export const Layout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" height="100%" overflow="hidden">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component={Box} flexGrow={1}>
            Emaily
          </Typography>

          <Button
            color="inherit"
            component={Link}
            href="/auth/google"
            startIcon={<SvgIcon><Icon path={mdiGoogle} /></SvgIcon>}
          >
            Login with Google
          </Button>
        </Toolbar>
      </AppBar>

      <Box flexGrow={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
