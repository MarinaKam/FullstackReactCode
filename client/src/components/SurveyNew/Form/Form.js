import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { makeStyles, Box, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import * as surveysApi from '../../../api';
import { fetchUser } from '../../../store/auth/operations';
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
  const dispatch = useDispatch();
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();
  const [ isNext, setIsNext ] = useState(false);

  const handleToggleNext = () => {
    setIsNext(state => !state);
  };

  const createSurvey = (values, { isSubmitting, setErrors }) => {
    if (isSubmitting) {
      return;
    }

    return surveysApi.createSurvey(values).then((data) => {
      console.log(data);
      dispatch(fetchUser());
      history.push('/surveys');
      enqueueSnackbar('Successfully send', { variant: 'success' });
    }).catch(({ data: { message }, ...error }) => {
      if (error) {
        setErrors(error);
        enqueueSnackbar(message || 'Something went wrong', { variant: 'error' });
      }
    });
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" py={2}>
      <Paper component={Box} width="50%" minWidth={300}>
        <Formik
          enableReinitialize
          initialValues={{
            title: null,
            subject: null,
            body: null,
            recipients: [{ email: null }]
          }}
          initialTouched={{
            field: true
          }}
          validateOnMount
          validationSchema={validationSchema}
          onSubmit={createSurvey}
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
