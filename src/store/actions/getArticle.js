import HttpClient, { Method } from '../../services/http.clien';
import { ADD_M_ARTICLE } from '../constants';
import Api from '../../services/api';


export const getArticle = (id) => {
  return async (dispatch, getState) => {
    try {

      const data = await Api.getArticle(id);

      if (data._id) {
        dispatch({'type': ADD_M_ARTICLE, 'article': data});
      } else {
        dispatch({'type': ADD_M_ARTICLE, 'article': []});
      }
    } catch (e) {
      console.log(e)
    }
  }
}