import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { Link, NavLink, withRouter }    from 'react-router-dom'

import { getMovie }         from '../store/actions/getMovieAction'



export class Pagination extends Component {
    activeStyle={
                    fontWeight: "bold",
                    color     : "white",
                    backgroundColor: 'rgb(0, 138, 230)'
                };

    componentDidMount()
        {

            let refreshUrl  = /page=([\d]+)/i.exec( this.props.location.search ); // ---Old

            if(  Array.isArray( refreshUrl ) && refreshUrl[1] > 1 )
                {
                    // ----[ for the Edge compatibility ( not supports positive lookBehind) ]----
                    var reversed_str = this.props.location.search.split('').reverse().join('');
                    var reversed_par = 'page='.split('').reverse().join('');
                    var reg          = new RegExp(`[\\d]+(?=${reversed_par})`, 'i');

                    this.props.location.search = reversed_str.replace( reg, 1 ).split('').reverse().join('');

                    // this.props.location.search = this.props.location.search.replace( /(?<=page=)[\d]+/, 1 );// ---Old
                    window.location.href       = this.props.location.search
                }

        }
    curPage( location, index )
        {

            let curLocation = /page=([\d]+)/i.exec(location.search);

            if( Array.isArray( curLocation ) && parseInt(curLocation[1]) === index)
                return true
            return false
        }
    goToPage( href )
        {
            this.props.addMovie( href )
        }
    getState()
        {
            let movie      =  this.props.movie && this.props.movie.data?  this.props.movie.data : [];

            let params     =  this.props.movie && this.props.movie.params ? this.props.movie.params : {} ;
            let str_Params = Object.keys(params).map( key => { if (key !== 'page') return key + '=' + params[key] } ).join('&');

            let totalPages =  this.props.movie.totalPages ? this.props.movie.totalPages  : 0;
            let span       = 7;
            let pages      =  totalPages > 1 ? totalPages >= span ? span : totalPages : 0;
            let curPage    = params.page ? parseInt( params.page )  : 1  ;
            let prevPage   = ( curPage >1 ) ? `${str_Params}&page=${curPage - 1}` : `${str_Params}&page=${ 1 }` ;
            let nextPage   = ( totalPages > 1 && curPage < totalPages )? `${str_Params}&page=${ curPage + 1}` : `${str_Params}&page=${ curPage }` ;



            let subComponent =  movie.length > 0 && pages? (

                    <ul className="pagination"  style={{'listStyleType': 'none'}} >
                        {/* Start Page */}
                        {

                            ( curPage > 1 )  &&
                            <li className="page-item" style={{cursor:'pointer'}}  >
                                <NavLink exact to= { `?${str_Params}&page=${1}` } onClick ={()=>this.goToPage( `${str_Params}&page=${1}` )} className='page-link' > 1 </NavLink>
                            </li>

                        }
                        {/* Prev Page */}
                        {

                            ( curPage > 1 )  &&
                            <li className="page-item" style={{cursor:'pointer'}}  >
                                <Link to= { `?${prevPage}` } onClick ={()=>this.goToPage( prevPage )} className='page-link' > prev </Link>
                            </li>

                        }
                        {
                            [...new Array(pages)].map( (el, index)=>
                                {
                                    index    = index + 1// Start numeration from: 1
                                    let href = `${str_Params}&page=${index}`;

                                    if( curPage >= 5 && curPage <= (totalPages - 4) )
                                        {
                                            index +=  curPage-4;
                                            href   = `${str_Params}&page=${index}`;
                                        }
                                    else if ( curPage >= 5 && curPage > (totalPages - 4) )
                                        {
                                            index += totalPages-pages;
                                            href   = `${str_Params}&page=${index}`;
                                        };

                                    return (
                                        <li className="page-item" key={ index } >
                                            <NavLink exact to= { `?${href}` } onClick={ ()=>this.goToPage( href ) } isActive={(match, location)=>this.curPage(location, index )}  className='page-link' activeStyle={this.activeStyle}  > { index }  </NavLink>
                                        </li>
                                    )

                                })
                        }
                        {

                            ( totalPages > 1 && curPage < totalPages )  &&
                            <li className="page-item" style={{cursor:'pointer'}}  >
                                <Link  to= { `?${nextPage}` } onClick ={()=>this.goToPage( nextPage )} className='page-link' > next </Link>
                            </li>

                        }
                        {/* Last Page Page */}
                        {

                            ( totalPages > 1  && curPage < totalPages )  &&
                            <li className="page-item" style={{cursor:'pointer'}}  >
                                <NavLink exact to= { `?${str_Params}&page=${totalPages}` } onClick ={()=>this.goToPage( `${str_Params}&page=${totalPages}` )} className='page-link' > {totalPages} </NavLink>
                            </li>

                        }
                    </ul>
                ): <p></p>
            return subComponent;
        }

    render(){

        return (
            this.getState()
        )
    }



}

const mapStateToProps = ( state )=>
    {
        return { ...state.movieReducer }
    }
const mapDispatchToProps = ( dispatch )=>
    {
        return {  addMovie : (params) => { dispatch( getMovie(params) ) }  }
    }

export default connect( mapStateToProps, mapDispatchToProps )( withRouter(Pagination) )