import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { Link, withRouter }    from 'react-router-dom'

import { getSearch }        from '../store/actions/getSearch'



export class SearchBar extends Component {

    searchTitle = '';

    makeReq(e) {
        this.searchTitle = e.target.value;
        this.props.getData(`title=${this.searchTitle}`)
    }
    getAll(e) {

        e.preventDefault();

        if (this.props.search && (this.props.search.data && this.props.search.data.length > 0))
            this.props.history.push({
                pathname: '/filtered',
                state   : {
                    c_param: `title=${this.searchTitle}`
                }
            });


    }
    mobBtn() {
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
    showResults() {
        let results = document.querySelector('.search-suggest ul');
        if (results)
            results.style = 'display:block;'
    }
    hideResults() {
        document.onclick = function (event) {
            let results = document.querySelector('.search-suggest ul');

            if (results && !results.innerHTML.includes(event.target.innerHTML))
                results.style = 'display:none;'

        }
    }
    getState(){

        let SubComponent = this.props.search && this.props.search.data &&  this.props.search.data[0]._id ? (

            <div  className="search-suggest row  col-11 col-sm-11 col-md-11 col-lg-4 col-xl-3" style={{display: 'block'}}>
                    <ul style={{ listStyleType: 'none' }}>

                        {
                            this.props.search.data.map( ( el, index ) =>{

                                return(
                                    <li key={index}>

                                        <Link to={`/article/${el._id}`}  style={{ 'backgroundSize': 'cover', 'display': 'block', 'width': '50px', 'height': '70px', 'backgroundImage': `url(${ el.img })` }}></Link>

                                        <div>
                                            <Link to={`/article/${el._id}`}> { el.title } </Link>
                                            <p  > { el.media_type } </p>
                                            <p  > { el.start_year } </p>
                                        </div>

                                    </li>
                                )
                            })
                        }
                        <li className="ss-bottom" style={{'padding': '0px', 'borderBottom': 'none', 'borderRadius': '0px 0px 5px 5px'}}>
                            <Link to={`?title=${this.searchTitle }`}  onClick={ (e)=> this.getAll(e) }  id="finde_all" >View all</Link>
                        </li>

                    </ul>
            </div>
        ): '';

        return SubComponent;
    }
    render()
        {
            return (
                  <div>

                    <div className="search-content">

                        <div onClick={ ()=> this.mobBtn() }  className="mobile-search active">
                            <label  htmlFor="fa-search" className="fa fa-search "></label>
                        </div>

                        <div className="inputCont">
                            <input onFocus={ ()=>this.showResults() } onBlur={ ()=>this.hideResults() } onChange ={ (e)=> this.makeReq(e) }   name="keyword" type="text" className="form-control search-input" placeholder="Type to search..."/>
                            <Link  onClick={ (e)=> this.getAll(e) }  className="search-submit  col-md-1" to={`?title=${this.searchTitle }`} title="Search"><i    className="fa fa-search"></i></Link>
                        </div>

                    </div>

                    { this.getState() }

                    <div  className="wrapper_MbSearch col-12" style={{display: 'none'}}>
                        <div  className="inputCont mobileBar" >
                                <input onFocus={()=>this.showResults()} onBlur={()=>this.hideResults()} onChange={ (e)=> this.makeReq(e) }  name="keyword" type="text"    className="form-control search-input" placeholder="Type to search..."/>
                                <Link  onClick={ (e)=> this.getAll(e) }  className="search-submit " to={`?title=${this.searchTitle }`} title="Search"><i    className="fa fa-search"></i></Link>
                        </div>
                    </div>
                </div>
            )
        }

}


const mapStateToProps = ( state )=>{
    return { ...state.movieReducer }
}
const mapDispatchToProps = ( dispatch )=>{
    return {  getData : (params) => { dispatch( getSearch(params) ) } }
}

export default connect( mapStateToProps, mapDispatchToProps )( withRouter(SearchBar) )