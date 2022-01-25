import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMovie } from '../store/actions/getMovieAction'
import Filter from '../components/Filter'
import Pagination from '../components/Pagination'
import { DELL_M_DATA } from '../store/constants'


export const Body = (props) => {

  useEffect(() => {
    props.addMovie(props.getParam || props.c_param)

    return () => {
      props.dellMovie()
    }
  }, [])


  const check_length = (el) => {
    return el.episodes > 1
  };
  const get_translation = (el) => {
    const reverse_str = el.split('').reverse().join('');
    const reversed_params = 'Sub|Dub'.split('').reverse().join('');
    const reg = new RegExp(`(?!\\))${reversed_params}(?=\\()`, 'i');
    const status = reg.exec(reverse_str);

    return status ? status[0].split('').reverse().join('').toUpperCase() : 'SUB'
  };
  const get_img = (el) => {
    return el.imgU2 ? el.imgU2 : el.img ? el.img : 'img/NoImageFound.png'
  };
  const element_li = () => {
    const loading = (
      <div className="text-center spinner">
        <div className="spinner-border" role="status"></div>
      </div>
    );

    const subComponent = props.movie && (props.movie.data && props.movie.data.length) ? (
      props.movie.data.map((el, index) => {
        return (
          <li className="m_data" key={index}>
            {
              check_length(el) &&
              <span className='m_info_e'> Eps <i>{el.episodes}</i> </span>
            }
            <span className='m_info_l'> {get_translation(el.title)} </span>
            <Link
              to={`/article/${el._id}`} style={{'backgroundImage': 'url(' + get_img(el) + ')'}}
              className='back_img'>
            </Link>
            <Link to={`/article/${el._id}`} className='m_title'> {el.title}  </Link>
          </li>
        )
      })
    ) : loading;

    return subComponent;
  };


  return (
    <div className="body_wrapper">
      <Filter/>
      <p className="alert alert-success">This web app is only a demo. No illegal links presented !</p>
      <ul className="m_i_v" style={{'listStyleType': 'none'}}>
        {element_li()}
      </ul>
      <Pagination/>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {...state.movieReducer}
}
const mapDispatchToProps = (dispatch) => {
  return {
    addMovie: (params) => {
      dispatch(getMovie(params))
    },
    dellMovie: () => {
      dispatch({'type': DELL_M_DATA});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Body))



