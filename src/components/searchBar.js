import React, { useState, useEffect, useRef  } from 'react';
import { connect }          from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { getMovie }         from '../store/actions/getMovieAction'
import { getSearch }        from '../store/actions/getSearch'


const SearchBar = (props)=>{

    const [searchTitle  , setSearchTitle]   = useState('');
    const [resultElement, setResultElement] = useState(false)
    const [resultsSearch, setResultsSearch] = useState([]);

    const addedEl = useRef(null);

    // --UseEffect Section
    useEffect(()=>{ props.clearSearch() }, [] );

    useEffect(()=>{ setResultsSearch(props.search) }, [props.search]);

    useEffect(()=>{
        if ( resultsSearch.length )
            setResultElement(true)
        else
            setResultElement(false);
    },[resultsSearch])

    // --Component Functions Section
    let makeSearch = (e)=> {

        setSearchTitle(e.target.value)

        if( e.target.value.length >= 3 )
            props.getData(`title=${e.target.value}`);

        else if( !e.target.value ||  e.target.value.length < 3)
            props.clearSearch();

    }

    let docClickListener = (lastSearchValue)=>(event)=>{


        if( addedEl && addedEl.current && addedEl.current.innerHTML.includes(event.target.outerHTML) && lastSearchValue)
            setResultElement(true)

        else if ( ( addedEl && addedEl.current && !addedEl.current.innerHTML.includes(event.target.outerHTML) ) || !lastSearchValue )
            setResultElement(false)

        else
            setResultElement(!resultElement)


    }

    let hideResults = (eventSearch=null)=> {

        let lastSearchValue = eventSearch && eventSearch.target.value;

        document.removeEventListener('click', docClickListener);
        document.onclick = docClickListener(lastSearchValue);

    }

    let mobBtn = ()=> {
        let searchBar = document.querySelector('.wrapper_MbSearch');

        if (searchBar && searchBar.style.display === 'none')
            searchBar.style.display = 'block';

        else if (searchBar && searchBar.style.display === 'block') {

            searchBar.style.display = 'none';

            let results = document.querySelector('.search-suggest ul');

            if (results)
                results.style = 'display:none;'

        }
    }

    let getAll = (e)=> {
        e.preventDefault();

        let redirectPaths = new RegExp('(?!\/)article|registration|profile|authentication');
        let checkPathName = redirectPaths.test(props.location.pathname )

        if ( resultsSearch.length && !checkPathName ){
            props.addMovie(`title=${searchTitle}`);
            hideResults(e)
        }
        else if (resultsSearch.length && checkPathName){
            props.history.push({
                pathname : '/filtered',
                c_param  : `title=${searchTitle}`
            });
            hideResults(e);
        }
    }

    let elementResults = ()=>{

        let SubComponent = resultsSearch && resultsSearch.length ? (

            <div  className="search-suggest row  col-11 col-sm-11 col-md-11 col-lg-3 col-xl-3 " style={{display: 'block'}}>
                    <ul ref={addedEl}  style={{ listStyleType: 'none' }}>

                        {
                            resultsSearch.map( ( el, index ) =>{

                                return(
                                    <li key={index}>

                                        <Link to={`/article/${el._id}`}  style={{ 'backgroundSize': 'cover', 'display': 'block', 'width': '50px', 'height': '70px', 'backgroundImage': `url(${ el.img })`, 'cursor': 'pointer' }}></Link>

                                        <div >
                                            <Link on onClick={ ()=>hideResults() } to={`/article/${el._id}`} style={{'cursor': 'pointer'}}> { el.title } </Link>
                                            <p  > { el.media_type } </p>
                                            <p  > { el.start_year } </p>
                                        </div>

                                    </li>
                                )
                            })
                        }

                        <li className="ss-bottom" >
                            <Link to={`?title=${searchTitle }`}  onClick={ (e)=> getAll(e) }  id="finde_all" >View all</Link>
                        </li>

                    </ul>
            </div>
        ): '';

        return SubComponent;
    }

    return (
        <div>

            <div className="search-content">

                <div onClick={ ()=> mobBtn() }  className="mobile-search active">
                    <label  htmlFor="fa-search" className="fa fa-search "></label>
                </div>

                <div className="inputCont">
                    <input onFocus={ (e)=>hideResults(e) } onBlur={ (e)=>hideResults(e) } onChange ={ makeSearch }  name="keyword" type="text" className="form-control search-input" placeholder="Type to search..."/>
                    <Link  onClick={ (e)=>getAll(e) }  className="search-submit  col-md-1" to={`?title=${searchTitle}`} title="Search"><i className="fa fa-search"></i></Link>
                </div>

            </div>


            <div  className="wrapper_MbSearch col-12" style={{display: 'none'}}>
                <div  className="inputCont mobileBar" >
                        <input  onFocus={(e)=>hideResults(e)} onBlur={(e)=>hideResults(e)} onChange={ makeSearch }  name="keyword" type="text" className="form-control search-input" placeholder="Type to search..."/>
                        <Link  onClick={ (e)=>getAll(e) }  className="search-submit " to={`?title=${searchTitle}`} title="Search"><i className="fa fa-search"></i></Link>
                </div>
            </div>

            { resultElement && elementResults() }
        </div>
    )

}


const mapStateToProps = ( state )=>{
    return { ...state.movieReducer }
}
const mapDispatchToProps = ( dispatch )=>{
    return {
        getData      : (params) => { dispatch( getSearch(params) ) },
        clearSearch  : ( )      => { dispatch({ 'type': 'ADD_SEARCH', 'search': [] }) },
        addMovie     : (params) => { dispatch( getMovie(params) ) },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( withRouter(SearchBar) )