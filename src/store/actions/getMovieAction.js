import { ADD_M_DATA, SET_M_GET_PARAM } from '../constants';
import Api from '../../services/api';


export const getMovie = (getParams = '') => {
  return async (dispatch, getState) => {

    if (getParams.hasOwnProperty('page' || 'Type'))
      getParams = Object.keys(getParams).map(oKey => oKey + '=' + getParams[oKey]).join('&')

    try {
      const data = await Api.getMovie(getParams)

      if (data.data) {
        dispatch({'type': SET_M_GET_PARAM, 'getParam': data.params});
        dispatch({'type': ADD_M_DATA, 'movie': data});
      } else {
        dispatch({'type': SET_M_GET_PARAM, 'getParam': null});
        dispatch({'type': ADD_M_DATA, 'movie': []});
      }
    } catch (error) {
      console.log('----', error);
    }

  }
}