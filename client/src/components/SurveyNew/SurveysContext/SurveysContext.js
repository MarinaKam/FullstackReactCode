import React, { createContext, useEffect, useReducer } from 'react';
import * as surveysApi from '../../../api';
import { initialState } from './initialState';
import { reducer } from './reducer';
import * as types from './types';

export const SurveysContext = createContext();

export const SurveysProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const fetchSurveys = () => {
    dispatch({ type: types.FETCH_SURVEY_REQUEST });

    surveysApi.fetchSurveys().then((data) => {
      dispatch({ type: types.FETCH_SURVEY_SUCCESS, payload: data.reverse() });
    })
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const providerValue = {
    ...state,

    // functions
   fetchSurveys
  };

  return (
    <SurveysContext.Provider value={providerValue}>
      {children}
    </SurveysContext.Provider>
  );
};
