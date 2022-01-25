import HttpClient, { Method } from '../../services/http.clien';
import { ADD_M_FILTER } from '../constants';
import Api from '../../services/api';


export const getFilterCategories = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const filter_len = Object.keys(state.movieReducer.filter).length

      if (!filter_len) {
        const data = await Api.getFilterCategories();

        if (data && data.length) {
          const el_filter = (data) => {
            return data.filter(el => {
              return el !== '' && el !== '0' && el
            })
          }
          const country = () => {
            return {country: data[0].country[0] ? data[0].country[0].country : []}
          };
          const genre = () => {
            return {genre: data[0].genre[0] ? data[0].genre[0].genre : []}
          };
          const type = () => {
            return {type: data[0].type[0] ? el_filter(data[0].type[0].media_type) : []}
          };
          const year = () => {
            return {year: data[0].year[0] ? el_filter(data[0].year[0].years) : []}
          };

          dispatch({
            'type': ADD_M_FILTER,
            'filter': {
              ...country(),
              ...genre(),
              ...type(),
              year: year().year.sort((a, b) => b - a)
            }
          });
        }

      }

    } catch (e) {
      console.log(e)
    }

  }
}