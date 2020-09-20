import axios from 'axios';

export const fetchSurvey = () => {
  return axios.get('/api/surveys')
    .then(({ data }) => data)
    .catch((error) => { throw error; });
};

export const createSurvey = (survey) => {
  return axios.post('/api/surveys', survey)
    .then(({ data }) => data)
    .catch((error) => { throw error.response; });
};
