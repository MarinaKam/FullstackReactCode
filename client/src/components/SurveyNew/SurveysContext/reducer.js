import { createHookReducer } from '../../../hooks';
import * as types from './types';

export const reducer = createHookReducer({
  [types.FETCH_SURVEY_REQUEST]: (state) => {
    return {
      ...state,
      isFetching: true
    }
  },

  [types.FETCH_SURVEY_SUCCESS]: (state, payload) => {
    return {
      ...state,

      isFetched: true,
      isFetching: false,
      surveys: payload
    }
  },

  [types.ADD_SURVEY]: ({ surveys, ...state }, payload) => {
    return {
      ...state,
      surveys: [ ...surveys,  payload ]
    }
  },
});
