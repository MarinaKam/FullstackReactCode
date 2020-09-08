import axios from 'axios';

export const fetchUser = () => {
  return axios.get('/api/current-user')
    .then(({ data }) => data)
    .catch(({ data }) => { throw data; });
};

export const createToken = (token) => {
  return axios.post('/api/stripe', token)
    .then(({ data }) => data)
    .catch(({ data }) => { throw data; });
};
