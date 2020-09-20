import React, { useState } from 'react';
import { Formik } from 'formik';
import { makeStyles, Box, Paper } from '@material-ui/core';
import { validationSchema } from '../validationSchema';
import { Body } from './Body';
import { View } from './View';

const styles = ({ spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: spacing(2),
    overflow: 'hidden'
  }
});

const useStyles = makeStyles(styles);

export const Form = () => {
  const classes = useStyles();
  const [ isNext, setIsNext ] = useState(false);

  const handleToggleNext = () => {
    setIsNext(state => !state);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" py={2}>
      <Paper component={Box} width="50%" minWidth={300} height={500}>
        <Formik
          enableReinitialize
          initialValues={{
            title: null,
            subject: null,
            body: null,
            recipients: [null]
          }}
          initialTouched={{
            field: true
          }}
          validateOnMount
          validationSchema={validationSchema}
          onSubmit={null}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className={classes.root}>
              {isNext
                ? <View onToggleNext={handleToggleNext} />
                : <Body onToggleNext={handleToggleNext} />
              }
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};
