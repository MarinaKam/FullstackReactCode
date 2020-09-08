import * as userApi from '../../api';
import { fetchUserSuccess } from './actions';

export const fetchUser = () => (dispatch) => {
  return userApi.fetchUser().then((data) => {
    dispatch(fetchUserSuccess(data));
  });
};
