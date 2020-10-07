import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect }          from 'react-redux'

import { getMovie }         from '../store/actions/getMovieAction'

import Filter           from '../components/Filter';
import Pagination       from '../components/Pagination';

export class Body extends Component {
    constructor(props){
        super(props)
        this.state = {...props}
    }

    async componentDidMount( ){
        this.props.addMovie( this.props.c_param );
    }
    componentDidUpdate (prevProps){
        if(  !new RegExp(this.props.c_param).test(prevProps.c_param) )
            this.props.addMovie( this.props.c_param );
    }
    componentWillUnmount(){
        this.props.dellMovie( );
    }


    check_length(el) { return el.episodes > 1 };
    get_translation(el){
        var reverse_str     = el.split('').reverse().join('');
        var reversed_params = 'Sub|Dub'.split('').reverse().join('');
        var reg             = new RegExp(`(?!\\))${reversed_params}(?=\\()`, 'i');
        var status          = reg.exec(reverse_str);

        return status ? status[0].split('').reverse().join('').toUpperCase() : 'SUB'
    };
    get_img(el) { return el.imgU2 ? el.imgU2  : el.img ? el.img : 'img/NoImageFound.png' };

    getState(){

        let loading = (
                <div className="text-center spinner">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
        );

        let subComponent = this.props.movie && ( this.props.movie.data && this.props.movie.data.length )  ?(
            this.props.movie.data.map( ( el, index ) =>{
                return (
                    <li className="m_data" key={ index }>
                        {
                            this.check_length(el) &&
                            <span  className='m_info_e'> Eps <i>{el.episodes}</i> </span>
                        }
                        <span  className='m_info_l' > { this.get_translation(el.title) } </span>
                        <Link to= { `/article/${el._id}` } style={{'backgroundImage': 'url('+this.get_img(el)+')' }} className='back_img'>  </Link>
                        <Link to= { `/article/${el._id}` } className='m_title'> {el.title}  </Link>
                    </li>
                )
            })
        ) : loading ;

        return subComponent ;
    }
    render() {
        return (
            <div >
                <Filter />
                <p className="alert alert-success">This web app is only a demo. No illegal links presented !</p>
                <ul className="m_i_v" style={{'listStyleType': 'none'}}>

                        { this.getState() }

                </ul>
                <Pagination />
            </div>
        )
    }
}

const mapStateToProps = ( state, ownProps )=>
    {
        return { ...state.movieReducer }
    }
const mapDispatchToProps = ( dispatch )=>
    {
        return { addMovie : (params) => { dispatch( getMovie(params) ) },  dellMovie : () => { dispatch({ 'type': 'DELL_M_DATA' }); } }
    }

export default connect( mapStateToProps, mapDispatchToProps )( withRouter(Body) )



