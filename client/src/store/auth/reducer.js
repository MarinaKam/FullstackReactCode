import { createReduxReducer } from '../../hooks';
import * as types from './types';

const initialState = {
  isFetched: false,
  user: {}
};

export const reducer = createReduxReducer(initialState, {
  [types.FETCH_USER_SUCCESS]: (state, payload) => {
    return {
      ...state,
      isFetched: true,
      user: payload || null
    };
  }
});
