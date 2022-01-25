import HttpClient, { Method } from '../../services/http.clien';
import { ADD_SEARCH } from '../constants';
import Api from '../../services/api';


export const getSearch = (getParams = '') => {
  return async (dispatch, getState) => {
    try {
      // --- [ reverse regex for edge browser ~~edge supports only  Lookahead ?~~ ] ---
      const pr_str = getParams.split("").reverse().join("");
      const param = 'title'.split("").reverse().join("");
      const pattern = new RegExp(`.*(?=\=${param}\?)`, "i");

      const searchLen = pattern.exec(pr_str);

      if (!searchLen[0] && searchLen[0].length <= 2)
        dispatch({'type': ADD_SEARCH, 'search': {}});

      const data = await Api.getSearch(getParams);

      if (data && data.length)
        dispatch({'type': ADD_SEARCH, 'search': data});
      else if (data && !data.length)
        dispatch({'type': ADD_SEARCH, 'search': []});

    } catch (e) {
      console.log(e)
    }

  }
}