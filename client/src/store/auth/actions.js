import * as types from './types';

export const fetchUserSuccess = (payload) => {
  return ({ type: types.FETCH_USER_SUCCESS, payload });
};

export const createTokenSuccess = (payload) => {
  return ({ type: types.FETCH_USER_SUCCESS, payload });
};
