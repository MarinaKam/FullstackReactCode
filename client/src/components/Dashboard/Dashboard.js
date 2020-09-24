import { truncate } from 'lodash';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Box,
  Fab,
  Tooltip,
  Typography,
  Card,
  CardContent,
  CardActions,
  Divider,
  Zoom
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Loader } from '../Loader';
import { SurveysContext } from '../SurveyNew/SurveysContext';

export const Dashboard = () => {
  const { isFetched, surveys } = useContext(SurveysContext);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
      height="100%"
      overflow="hidden"
    >
      <Loader p={3} loading={!isFetched} render={
        () => (!surveys.length ?
          <Box p={3}>
            <Typography align="center">No surveys found</Typography>
          </Box>
        :
          <Grid
            container
            spacing={3}
            direction="column"
            wrap="nowrap"
            alignItems="center"
            component={Box}
            flexGrow={1}
            overflow="auto"
            py={2}
          >
            {surveys?.map((item) => (
              <Grid key={item._id} item xs={10} md={4}>
                <Box width={500}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {item.title}
                      </Typography>

                      <Tooltip arrow title={<Typography>{item.body}</Typography>}>
                        <Typography paragraph color="textSecondary">
                          {truncate(item.body, { length: 110 })}
                        </Typography>
                      </Tooltip>

                      <Box pt={1} textAlign="right">
                        <Typography variant="subtitle2">
                          Sent on: {new Date(item.dateSent).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </CardContent>

                    <Divider />

                    <CardActions>
                      <Box color="warning.main" p={1} display="flex" alignItems="center">
                        <Typography variant="button" color="inherit">
                          Yes: {item.yes}
                        </Typography>

                        <Box ml={2}>
                          <Typography variant="button" color="inherit">
                            No: {item.no}
                          </Typography>
                        </Box>
                      </Box>
                    </CardActions>
                  </Card>
                </Box>
              </Grid>
            ))
            }
          </Grid>
        )
      }
      />

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
