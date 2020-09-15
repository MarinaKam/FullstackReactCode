import * as userApi from '../../api';
import { createTokenSuccess, fetchUserSuccess } from './actions';

export const fetchUser = () => (dispatch) => {
  return userApi.fetchUser().then((data) => {
    dispatch(fetchUserSuccess(data));
  });
};

export const createToken = (token, enqueueSnackbar) => (dispatch) => {
  return userApi.createToken(token).then((data) => {
    dispatch(createTokenSuccess(data));
    enqueueSnackbar('Successfully payed', { variant: 'success' })
  }).catch((error) => error && enqueueSnackbar('Something went wrang', { variant: 'error' }));
};
