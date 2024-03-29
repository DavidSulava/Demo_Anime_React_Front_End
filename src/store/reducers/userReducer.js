import get_set_LocalStorageData from '../../helpers/localStorageFunction';
import {
  DELL_ALL_MSG,
  DELL_USER,
  REG_ERROR,
  REG_SUCCESS,
  SET_ACCESS_EXPIRES_AT,
  SET_ACCESS_TOKEN,
  SUCCESS_MSG,
  USER_EXIST
} from '../constants';


const initState = {user: null, accessToken: '', accessTokenExpiresAt: ''}

function userReducer(state = {...get_set_LocalStorageData(initState, 'movie_user_*18'), msg: []}, action) {
  switch (action.type) {

    case (USER_EXIST):
    case (REG_SUCCESS): {
      return {...state, 'user': action.user}
    }
    case (SET_ACCESS_TOKEN): {
      return {...state, 'accessToken': action.accessToken}
    }
    case (SET_ACCESS_EXPIRES_AT): {
      return {...state, 'accessTokenExpiresAt': action.accessTokenExpiresAt}
    }
    case REG_ERROR: {
      return {...state, 'msg': action.msg}
    }
    case SUCCESS_MSG: {
      return {...state, 'msg': action.msg}
    }
    case DELL_USER: {
      return {...state, 'user': null}
    }
    case DELL_ALL_MSG: {
      return {...state, 'msg': []}
    }
    default:
      return state
  }
}


export default userReducer;