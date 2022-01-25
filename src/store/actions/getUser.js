import { DELL_USER, REG_ERROR, REG_SUCCESS, SET_ACCESS_EXPIRES_AT, SET_ACCESS_TOKEN, SUCCESS_MSG } from '../constants';
import Api from '../../services/api';


export const getUser = (path = '/user/login', getParams = '') => {
  return async (dispatch, getState) => {
    try {
      const r_body = getParams;
      const authToken = getState().userReducer.accessToken ? `Bearer ${getState().userReducer.accessToken}` : '';

      const response = await Api.getUser(authToken, r_body, path);

      if (response.status >= 200 && response.status <= 299) {

        const data = await response.json();

        if (data.success) {
          dispatch({'type': REG_SUCCESS, 'user': data.user});
          dispatch({'type': SET_ACCESS_TOKEN, 'accessToken': data.user.accessToken});
          dispatch({'type': SET_ACCESS_EXPIRES_AT, 'accessTokenExpiresAt': data.user.accessTokenExpiresAt});
          dispatch({'type': SUCCESS_MSG, 'msg': data.success});
        } else if (data.msg && data.msg.contact) {
          dispatch({'type': SUCCESS_MSG, 'msg': data.msg})
        } else if (data.msg && data.msg.userDeleted) {
          dispatch({'type': DELL_USER});
        }
        ;
      } else if (response.status === 401) {
        const regErrors = await response.json();
        dispatch({'type': REG_ERROR, 'msg': regErrors});
        dispatch({'type': DELL_USER});
      }
    } catch (e) {
      console.log(e)
    }
  }
}