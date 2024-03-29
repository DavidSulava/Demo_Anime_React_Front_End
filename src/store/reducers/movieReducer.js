import get_set_LocalStorageData from '../../helpers/localStorageFunction';
import { ADD_M_ARTICLE, ADD_M_DATA, ADD_M_FILTER, ADD_SEARCH, DELL_M_DATA, SET_M_GET_PARAM } from '../constants';


const initState = {movie: [], filter: [], article: [], search: [], getParam: null}


function appMainReducer(state = get_set_LocalStorageData(initState, 'movie_data_*18'), action) {
  switch (action.type) {
    case ADD_M_DATA: {
      return {...state, 'movie': action.movie}
    }
    case DELL_M_DATA: {
      return {...state, 'movie': []}
    }
    case ADD_M_FILTER: {
      return {...state, 'filter': action.filter}
    }
    case ADD_SEARCH: {
      return {...state, 'search': action.search}
    }
    case ADD_M_ARTICLE: {
      return {...state, 'article': action.article}
    }
    case SET_M_GET_PARAM: {
      return {...state, 'getParam': action.getParam}
    }

    default:
      return state
  }
}


export default appMainReducer;
