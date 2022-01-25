import { DELL_USER, REG_ERROR, REG_SUCCESS, SUCCESS_MSG } from '../constants';
import Api from '../../services/api';


export const updateUserData = (path = '', formData) => {
  return async (dispatch, getState) => {
    try {
      const r_body = formData;
      r_body.append('currentEmail', getState().userReducer.user.email)
      const authToken = getState().userReducer.accessToken ? `Bearer ${getState().userReducer.accessToken}` : '';

      const response = await Api.updateUserData(path, authToken, r_body);

      if (response.status >= 200 && response.status <= 299) {

        const data = await response.json();

        if (data.user) {
          dispatch({'type': REG_SUCCESS, 'user': data.user});
          dispatch({'type': SUCCESS_MSG, 'msg': data.msg});
        } else if (data.msg && (!data.user || !data.msg.userDeleted)) {
          dispatch({'type': SUCCESS_MSG, 'msg': data.msg})
        } else if (data.msg && data.msg.userDeleted) {
          dispatch({'type': DELL_USER});
        }
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