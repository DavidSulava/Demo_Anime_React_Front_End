import { DELL_USER, SET_ACCESS_EXPIRES_AT, SET_ACCESS_TOKEN, USER_NO } from '../constants';
import Api from '../../services/api';


let attempts = 0;

export const getTokensSilently = (path = '/user/get_new_tokens') => {
  return async (dispatch, getState) => {
    try {
      const corsAPI = `${process.env.REACT_APP_LOGIN_SERVER_API}${path}`;
      const authToken = getState().userReducer.accessToken ? `Bearer ${getState().userReducer.accessToken}` : '';

      const response = await Api.getTokensSilently(corsAPI, authToken);

      if (response.status === 200) {
        attempts = 0;
        const data = await response.json();

        if (!data || !data.accessToken || !data.accessTokenExpiresAt) {
          dispatch({'type': USER_NO, 'user': null});
        }

        dispatch({'type': SET_ACCESS_TOKEN, 'accessToken': data.accessToken});
        dispatch({'type': SET_ACCESS_EXPIRES_AT, 'accessTokenExpiresAt': data.accessTokenExpiresAt});

      } else if (response.status === 401) {

        attempts += 1;

        if (attempts >= 2)
          dispatch({'type': DELL_USER});
        else
          dispatch(getTokensSilently());

      } else {
        dispatch({'type': DELL_USER});
      }
    } catch (e) {
      console.log(e)
    }

  }
}