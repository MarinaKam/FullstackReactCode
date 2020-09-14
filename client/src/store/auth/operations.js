import * as userApi from '../../api';
import { createTokenSuccess, fetchUserSuccess } from './actions';

export const fetchUser = () => (dispatch) => {
  return userApi.fetchUser().then((data) => {
    dispatch(fetchUserSuccess(data));
  });
};

export const createToken = (token) => (dispatch) => {
  return userApi.createToken(token).then((data) => {
    dispatch(createTokenSuccess(data));
  });
};
