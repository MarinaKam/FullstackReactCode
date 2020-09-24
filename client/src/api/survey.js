import axios from 'axios';

export const fetchSurveys = () => {
  return axios.get('/api/surveys')
    .then(({ data }) => data)
    .catch((error) => { throw error.response; });
};

export const createSurvey = (survey) => {
  return axios.post('/api/surveys', survey)
    .then(({ data }) => data)
    .catch((error) => { throw error.response; });
};
