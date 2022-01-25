import React, { useEffect } from 'react'
import { Link, useHistory, useLocation, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getArticle } from '../store/actions/getArticle'
import { SET_M_GET_PARAM } from '../store/constants';


export const Article = ({addArticle, setGetParams, article, match}) => {
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    addArticle()
  }, [])
  useEffect(() => {
    addArticle()
  }, [location.pathname])


  const getAll = (e) => {
    // ----[ for the Edge compatibility ( not supports positive lookBehind) ]----
    const getParameters = e.target.href.match(/(?=\?).*/gi)[0].split('?')[1];

    setGetParams(getParameters);
    history.replace({pathname: '/filtered'});

  }

  const trailer_display = (ev) => {

    ev.stopPropagation();

    const wrap_elem = document.querySelector('.trailerWrapper');
    const frame_src = document.querySelector('.trilerFrame');


    if ((wrap_elem && frame_src) && wrap_elem.style.display === 'block') {

      wrap_elem.style.display = 'none'
      frame_src.src = ''
    } else if ((wrap_elem && frame_src) && wrap_elem.style.display === 'none') {

      frame_src.src = article.trailer
      wrap_elem.style.display = 'block'
    }
  }

  const compArticle = () => {
    const item = article;

    let loading = (
      <div className="text-center spinner_article">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
    return item.title && (item._id == match.params.id) ? (

      <div className="content_container">
        <div className='a_container'>
          <div className="content_title">
            <h2>{item.title}</h2>
            {
              item.trailer &&
              <span className="trailerButtonWrapper">
								<a
                  onClick={(e) => trailer_display(e)}
                  className="btn btn-primary trailerButton" style={{display: "block"}}
                >
									<i className="fa fa-video-camera mr5"></i>
									Trailer
								</a>
							</span>
            }

          </div>
          <br/>
          <div className="img">
            <img src={item.img || item.imgU2} alt="error"/>
          </div>

          <div className="info">
            {
              item.start_year &&
              <dl>
                <dt>Start Year:</dt>
                <dd> {item.start_year} </dd>
              </dl>
            }
            {
              item.media_type &&
              <dl>
                <dt>Media type:</dt>
                <dd> {item.media_type} </dd>
              </dl>
            }
            {
              item.rating &&
              <dl>
                <dt>Rating:</dt>
                <dd> {item.rating} </dd>
              </dl>
            }
            {
              item.episodes &&
              <dl>
                <dt>Episodes:</dt>
                <dd> {item.episodes} </dd>
              </dl>
            }
            {
              item.time &&
              <dl>
                <dt>Runtime:</dt>
                <dd> {item.time} </dd>
              </dl>
            }
            {item.status &&
            <dl>
              <dt>Status:</dt>
              <dd> {item.status} </dd>
            </dl>
            }

            {/* Director */}
            {
              (item.director && item.director.length > 0) &&
              <dl className="director">
                <dt>Director:</dt>
                <dd>
                  {
                    item.director.map((el, index, array) => {
                      if (el && el != '')
                        return (<Link to={`/filtered/?Director=${el}`} onClick={e => getAll(e)} style={{
                          cursor: "pointer",
                          textDecoration: "none"
                        }}> {el} {array.length - 1 == index ? ' ' : ', '}  </Link>)
                    })
                  }
                </dd>
              </dl>
            }

            {/* Genre */}
            {
              (item.genre && item.genre.length > 0) &&
              <dl className="genres">
                <dt>Genre:</dt>
                <dd>
                  {
                    item.genre.map((el, index, array) => {

                      if (el && el != '')
                        return (
                          <Link
                            to={`/filtered/?Genre=${el}`} onClick={e => getAll(e)}
                            style={{cursor: "pointer", textDecoration: "none"}}
                            key={index}> {el}{array.length - 1 == index ? ' ' : ', '}
                          </Link>
                        )
                    })
                  }
                </dd>
              </dl>
            }

          </div>

          <div className="description">
            <br/>
            <p>{item.description}</p>
          </div>

          <div className="trailerWrapper" onClick={(e) => trailer_display(e)} style={{display: 'none'}}>
            <div className="trailer">
							<span className="closeMeWrapper">
								<a
                  onClick={(e) => trailer_display(e)}
                  className="closeMe trailerClose"
                >❌</a>
								<br/>
							</span>
              <iframe
                className="trilerFrame"
                sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
                src='' frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen=""
              ></iframe>
            </div>
          </div>

        </div>
      </div>

    ) : loading;

  }

  return (
    <div id="content_render_m">
      <div className="wrapper_content">
        {compArticle()}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {...state.movieReducer}
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    addArticle: () => {
      dispatch(getArticle(props.match.params.id))
    },
    setGetParams: (params = null) => {
      dispatch({'type': SET_M_GET_PARAM, 'getParam': params})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Article))

