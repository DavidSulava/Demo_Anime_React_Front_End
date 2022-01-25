import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { getMovie } from '../store/actions/getMovieAction'


export const Pagination = (props) => {

  const activeStyle = {
    fontWeight: "bold",
    color: "white",
    backgroundColor: 'rgb(0, 138, 230)'
  };


  const curPageF = (location, index) => {

    let curLocation = /page=([\d]+)/i.exec(location.search);

    if (Array.isArray(curLocation) && parseInt(curLocation[1]) === index)
      return true
    return false
  }
  const goToPage = (href) => {
    props.addMovie(href)
  };
  const getState = () => {
    const movie = props.movie && props.movie.data ? props.movie.data : [];

    const params = props.movie && props.movie.params ? props.movie.params : {};
    const str_Params = Object.keys(params).map(key => {
      if (key !== 'page') return key + '=' + params[key]
    }).join('&');

    const totalPages = props.movie.totalPages ? props.movie.totalPages : 0;
    const span = 7;
    const pages = totalPages > 1 ? totalPages >= span ? span : totalPages : 0;
    const curPage = params.page ? parseInt(params.page) : 1;
    const prevPage = (curPage > 1) ? `${str_Params}&page=${curPage - 1}` : `${str_Params}&page=${1}`;
    const nextPage = (totalPages > 1 && curPage < totalPages) ? `${str_Params}&page=${curPage + 1}` : `${str_Params}&page=${curPage}`;

    const subComponent = movie.length > 0 && pages ? (

      <ul className="pagination" style={{'listStyleType': 'none'}}>
        {/* Start Page */}
        {

          (curPage > 1) &&
          <li className="page-item">
            <NavLink exact to={`?${str_Params}&page=${1}`} onClick={() => goToPage(`${str_Params}&page=${1}`)}
                     className='page-link'> 1 </NavLink>
          </li>

        }
        {/* Prev Page */}
        {

          (curPage > 1) &&
          <li className="page-item">
            <Link to={`?${prevPage}`} onClick={() => goToPage(prevPage)} className='page-link'> {"<<"} </Link>
          </li>

        }
        {
          [...new Array(pages)].map((el, index) => {
            index = index + 1// Start numeration from: 1
            let href = `${str_Params}&page=${index}`;

            if (curPage >= 5 && curPage <= (totalPages - 4)) {
              index += curPage - 4;
              href = `${str_Params}&page=${index}`;
            } else if (curPage >= 5 && curPage > (totalPages - 4)) {
              index += totalPages - pages;
              href = `${str_Params}&page=${index}`;
            }
            ;

            return (
              <li className="page-item" key={index}>
                <NavLink
                  exact to={`?${href}`} onClick={() => goToPage(href)}
                  isActive={(match, location) => curPageF(location, index)} className='page-link'
                  activeStyle={activeStyle}> {index}
                </NavLink>
              </li>
            )

          })
        }
        {
          (totalPages > 1 && curPage < totalPages) &&
          <li className="page-item" style={{cursor: 'pointer'}}>
            <Link to={`?${nextPage}`} onClick={() => goToPage(nextPage)} className='page-link'>{">>"} </Link>
          </li>

        }
        {/* Last Page Page */}
        {

          (totalPages > 1 && curPage < totalPages) &&
          <li className="page-item" style={{cursor: 'pointer'}}>
            <NavLink
              exact to={`?${str_Params}&page=${totalPages}`}
              onClick={() => goToPage(`${str_Params}&page=${totalPages}`)}
              className='page-link'> {totalPages} </NavLink>
          </li>

        }
      </ul>
    ) : <p></p>

    return subComponent;
  }

  return getState()
}

const mapStateToProps = (state) => {
  return {...state.movieReducer}
}
const mapDispatchToProps = (dispatch) => {
  return {
    addMovie: (params) => {
      dispatch(getMovie(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Pagination))