import React, { Component } from 'react';
import { connect }          from 'react-redux';
import {  withRouter } from 'react-router-dom'
import { getFilterCategories } from '../store/actions/getFilterCategories';
import { getMovie }            from '../store/actions/getMovieAction'



export class Filter extends Component {

    constructor(props)
        {
            super(props)
            this.props = props;

            this.v_filter_section = true;
            this.v_filter_btn     = 'none';
            this.v_ul_Show        = { fOrder : 'none', fType: 'none', fGenre : 'none', fCountry : 'none', fYear : 'none', fLang : 'none'  };
            this.styleObject      = { 'backgroundColor':'rgb(37, 181, 121)'};

            this.state = {
                            // ...this.props,
                            v_filter_section: this.v_filter_section,
                            v_filter_btn    : this.v_filter_btn,
                            v_ul_Show       : this.v_ul_Show,
                            styleObject     : this.styleObject
                        };

        };


     componentDidMount()
        {
            this.props.getFilter();
        };


    check_li = (ev)=>
        {
             //--hide a li elements after click----
             ev.target.parentNode.previousElementSibling.innerText = ev.target.innerText;

             let f_kay = ev.target.classList[1];
             this.setState({ ...this.state, v_ul_Show: { ...this.state.v_ul_Show, [f_kay]: 'none' } });

             //--change a BG-Color of a li elements
             ev.target.style.backgroundColor = this.state.styleObject['backgroundColor'];

             var parent_el = ev.target.parentNode.children;

             for (const iterator of parent_el)
                 {
                    if ( ev.target.innerText !== iterator.innerText )
                        iterator.style.backgroundColor = '';

                 }
        }
    checkdisplay = ( p_el )=>
        {

            let new_v_ul_Show = {};

            let el_show  = this.state.v_ul_Show[p_el] === 'none' ?  'block': 'none';

            for ( var kay in this.state.v_ul_Show)
                {
                    new_v_ul_Show[kay] = ( kay !== p_el ) ? 'none' : el_show;
                }

            this.setState({ ...this.state , v_ul_Show: new_v_ul_Show  });

        };
    showHideBTN = ()=>
        {
            let el_show    = this.state.v_filter_btn === 'none' ?  'block': 'none';
            let v_ul_Show  = { fOrder : 'none', fType: 'none', fGenre : 'none', fCountry : 'none', fYear : 'none', fLang : 'none'  };//hide all subElements

            this.setState({ ...this.state, v_filter_btn: el_show, v_ul_Show  });
        };
    get_li(category)
        {
            let extract_str = category.slice(1).toLowerCase();
            var preDefault  =   (
                                    <div className= {category} >
                                        Type:
                                        <button onClick={ ()=> this.checkdisplay(  category ) } >All</button>
                                        <ul  style= {{"display": this.state.v_ul_Show[category] }}>
                                            <li className={`li ${category}`} onClick={(e)=>this.check_li(e) } style= { this.state.styleObject } >All</li>
                                        </ul>
                                    </div>
                                );

            var subComponent = this.props.filter && this.props.filter[extract_str]   ?
                    (
                        <div className={category}>
                            {category.slice(1)}:
                                <button onClick={ ()=> this.checkdisplay( category )}>All</button>
                                <ul   style= {{"display": this.state.v_ul_Show[category] }}>

                                    <li className={`li ${category}`} onClick={(e)=>this.check_li(e) }  style= { this.state.styleObject } >All</li>

                                    {this.props.filter[extract_str].map( ( el, index ) =>
                                        { return ( <li className={`li ${category}`} onClick={ (e)=>this.check_li(e) } key={ index } >{el}</li> ) }  )
                                    }
                                </ul>
                        </div>
                    )
                    : preDefault ;
            return subComponent ;
        }
    async get_filteredData(e)
        {

            let buttons = e.target.parentNode.children;
            let get_str = '';

            for (const iterator of buttons)
                {
                    if(iterator.localName === 'div')
                    {
                        var [kay, value] = iterator.outerText.split(':');
                        value.trim();

                        value = value.includes('Movies name') ? 'title'      : value ;
                        value = value.includes('Raiting')     ? 'rating'     : value ;
                        value = value.includes('Release Year')? 'year'       : value ;
                        value = value.includes('New Update')  ? 'updatedAt'  : value ;

                        get_str +=`${kay}=${value}&`;
                    }

                }

            this.props.history.push({ pathname: '/filtered',  state: { c_param: get_str} });
        }
    render() {

        return (

                <div className='filter_section'  >
                    <div className="fButton_wrapper"  >

                        <input type="checkbox" className="toggle_f" id="mMenu_f" style={{"display":"none"}} />

                        <label htmlFor="mMenu_f" className="fButton"  onClick = { this.showHideBTN }>
                            <svg viewBox="0 0 24 24" style={{'height': '0.8em'}}><path d="M3,2H21V2H21V4H20.92L14,10.92V22.91L10,18.91V10.91L3.09,4H3V2Z" ></path></svg>
                            Filter
                        </label>

                    </div>



                    <div className="filter_wraper"  style={{"display": this.state.v_filter_btn }}>
                        <div className="fOrder">
                            Order:
                            <button onClick={ ()=> this.checkdisplay( "fOrder" ) }>Default</button>

                                <ul style= {{"display": this.state.v_ul_Show.fOrder }} >
                                    <li className="li fOrder" onClick={(e)=>this.check_li(e) } style= { this.state.styleObject }>Default</li>
                                    <li className="li fOrder" onClick={(e)=>this.check_li(e) }>New Update</li>
                                    <li className="li fOrder" onClick={(e)=>this.check_li(e) }>Raiting</li>
                                    <li className="li fOrder" onClick={(e)=>this.check_li(e) }>Release Year</li>
                                    <li className="li fOrder" onClick={(e)=>this.check_li(e) }>Movies name</li>
                                </ul>

                        </div>

                        { this.get_li('fType')  }
                        { this.get_li('fGenre') }
                        { this.get_li('fYear')  }
                        { this.get_li('fCountry') }

                        <div className="fLang">
                            Language:
                            <button onClick={ ()=> this.checkdisplay( "fLang" ) }>All</button>

                                <ul style= {{"display": this.state.v_ul_Show.fLang }} >
                                    <li className="li fLang" onClick={(e)=>this.check_li(e) } style= { this.state.styleObject }>All</li>
                                    <li className="li fLang" onClick={(e)=>this.check_li(e) }>Subbed</li>
                                    <li className="li fLang" onClick={(e)=>this.check_li(e) }>Dubbed</li>
                                </ul>

                        </div>

                        <button style={{"marginTop":"20px"}} onClick={ (e)=>this.get_filteredData(e)}>Show</button>
                    </div>

                </div>


        )
    }
};


const mapStateToProps = ( state, ownProps )=>
    {
        return { ...state.movieReducer }
    }
const mapDispatchToProps = ( dispatch )=>
    {
        return { getFilter : () => { dispatch( getFilterCategories() ) }, addMovie : (params) => { dispatch( getMovie(params) ) } }
    }

export default connect( mapStateToProps, mapDispatchToProps )( withRouter(Filter))