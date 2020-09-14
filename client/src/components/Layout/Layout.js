import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, AppBar, Toolbar, Button, Link } from '@material-ui/core';
import { mdiGoogle } from '@mdi/js';
import { Icon } from '@mdi/react';
import { Payments } from '../Payments';
import { SvgIcon } from '../SvgIcon';

export const Layout = ({ children }) => {
  const user = useSelector(({ auth }) => auth.user);

  return (
    <Box display="flex" flexDirection="column" height="100%" overflow="hidden">
      <AppBar position="static">
        <Toolbar>
          <Box flexGrow={1}>
            <Link
              underline="none"
              variant="h4"
              color="inherit"
              component={RouterLink}
              to={!!user ? '/surveys' : '/'}
            >
              Emaily
            </Link>
          </Box>

          {!user ?
            <Button
              color="inherit"
              component={Link}
              href="/auth/google"
              startIcon={<SvgIcon><Icon path={mdiGoogle} /></SvgIcon>}
            >
              Login with Google
            </Button>
          :
            <>
              <Box mx={2}>
                <Payments />
              </Box>

              <Button
                color="inherit"
                component={Link}
                underline="none"
                href="/api/logout"
                startIcon={<SvgIcon><Icon path={mdiGoogle} /></SvgIcon>}
              >
                Log out
              </Button>
            </>
          }
        </Toolbar>
      </AppBar>

      <Box flexGrow={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
