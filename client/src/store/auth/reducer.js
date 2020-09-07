import { createReduxReducer } from '../../hooks';
import * as types from './types';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  authToken: ''
};

export const reducer = createReduxReducer(initialState, {
  [types.LOGIN_REQUEST]: (state) => {
    return {
      ...state,
      isLoading: true,
      isAuthenticated: false
    };
  },

  [types.LOGIN_SUCCESS]: (state, { token }) => {
    return {
      ...state,
      isLoading: false,
      isAuthenticated: true,
      authToken: token
    };
  },

  [types.LOGIN_FAIL]: (state) => {
    return {
      ...state,
      isLoading: false,
      isAuthenticated: false
    };
  }
});
