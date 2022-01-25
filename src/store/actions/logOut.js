import { DELL_USER, USER_EXIST } from '../constants';
import Api from '../../services/api';


export const logOut = (path = '/user/logOut') => {
  return async (dispatch, getState) => {
    try {
      const authToken = `Bearer ${getState().userReducer.accessToken}`
      const body = getState().userReducer.user

      const response = await Api.logOut(path, authToken, body);

      if (response.status === 200) {

        const data = await response.json();

        if (data && data.user) {
          dispatch({'type': USER_EXIST, 'user': data.user})
        } else
          dispatch({'type': DELL_USER});

      } else {
        dispatch({'type': DELL_USER});
      }
    } catch (e) {
      console.log(e)
    }
  }
}