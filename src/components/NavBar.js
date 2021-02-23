import React, { useState, useEffect, useRef } from 'react'
import { connect                            } from 'react-redux'
import { Link, NavLink, withRouter          } from 'react-router-dom'

import { getUser          } from '../store/actions/getUser'
import { logOut }           from '../store/actions/logOut'
import { getTokensSilently }from '../store/actions/getNewTokens'

import { logo } from '../js/logo'

//--components
import SearchBar   from './searchBar';

const NavBar = (props)=>{

    const [formVisibility  , setFormVisibility ] = useState(false);

    const userFormRef    = useRef(null);
    const formTriggerRef = useRef(null);
    const closeMeRef     = useRef(null);

    let timeOutFunction = null;

    useEffect(()=>{

        document.addEventListener('click', showForm());
        logo( process.env.NODE_ENV !== 'development' ? process.env.PUBLIC_URL : '' );

        return () => {
            document.removeEventListener('click', showForm )
        }

    }, [] );
    useEffect(()=>{

        showForm(false)();

    }, [props.user] );

    // Silently Refresh Tokens
    useEffect(()=>{

        let time    = props.accessTokenExpiresAt - new Date().getTime();

        if( timeOutFunction ) clearTimeout(timeOutFunction);
        if( time && props.accessTokenExpiresAt )
            timeOutFunction = setTimeout( function (){ props.acquireTokenSilently() } , time );

    }, [props.accessTokenExpiresAt] );


    const showForm = (closeManual=true)=>(ev=null)=>{

        let formEl      = userFormRef.current    ? userFormRef.current    : '';
        let formTrigger = formTriggerRef.current ? formTriggerRef.current : '';
        let closeMe     = closeMeRef.current     ? closeMeRef.current     : '';

        if(!ev){
            setFormVisibility(closeManual);
            return;
        }

        if( ( formEl && !formEl.outerHTML.includes(ev.target.outerHTML) ) ||
            ( closeMe && closeMe.outerHTML.includes( ev.target.outerHTML ) ) ||
            !closeManual )

            setFormVisibility(false);

        else if( formEl && formEl.outerHTML.includes(ev.target.outerHTML) )
            setFormVisibility(true);

        else if( ev.target.outerHTML && formTrigger.outerHTML.includes(ev.target.outerHTML))
            setFormVisibility(!formVisibility);
    };

    const submForm = (ev)=> {
        ev.preventDefault();

        let formEl = ev.currentTarget.parentNode
        var path   = "/user/login";

        var formData = new FormData(formEl);

        props.login(path, formData);
    };

    const loginOut = (ev)=> {
        ev.preventDefault();

        props.logOut('/user/logOut');
    };

    //  --- [ elements ] ---
    const imgSection = ()=>{

        // -- Error Credentials MSG
        if( props.msg && props.msg.error && !props.user )
            return (
                <div className="alert alert-danger" style={{ width:'auto', margin:'0 7px'}}>
                    { props.msg.error }
                </div>
            );
        // -- User Avatar
        else if (  props.user && props.user.email  ){

            if( !props.user.img )
                return (
                    <i
                        className = "fa fa-user avatarlogged default"
                        style     = {{ fontSize: '4vmin', color: 'rgb(39, 217, 187)', cursor:'pointer' }}
                        alt       = "avatar "
                        title     = { `${ props.user.name }&#13;${ props.user.email }` }
                        style     = {{ cursor: 'pointer'}}
                    ></i>);

            return (
                <img
                    src     = { process.env.PUBLIC_URL + '/img/' + props.user.img }
                    alt     = "avatar " className="avatarlogged "
                    title   = { `${ props.user.name }\n${ props.user.email }` }
                    style   = {{ cursor: 'pointer'}}
                />
            );
        }


    };

    const loginFormElement = ()=>{

        if ( !props.user || !props.user.email) {
            return (
                <div>
                    <div className="loginButtons  ">
                        <button ref={formTriggerRef} className="enter ">LOGIN</button>
                    </div>

                    {
                        formVisibility &&
                        <div className='overlay'>
                            <form ref={userFormRef} className="loginForm" method="POST" >
                                <a ref={closeMeRef} className="closeMe">&times;</a>
                                <div className="imgContainer">
                                    { imgSection() }
                                </div>
                                <br/>

                                <input id="uname" type="text" placeholder="...Email" name="email" />
                                <br/><br/>

                                <input id="pass" type="password" placeholder="...Enter Password" name="password" ></input>
                                <br/><br/>

                                <button className="singin" type="submit" name="singin" onClick={ submForm }>Login</button>

                                <button className="singup"  name="singup" >
                                    <Link onClick={()=>showForm(false)()} to="/registration">Sing-Up</Link>
                                </button>
                                <br/>
                                {/* <Link to="password/reset">Forgot password?</Link> */}

                            </form>
                        </div>

                    }

                </div>
            )
        }
        else if ( props.user && props.user.email  ){
            return (
                <div>
                    <div ref={formTriggerRef}>
                        { imgSection() }
                    </div>


                    {
                        formVisibility &&
                            <form ref={userFormRef} className="logged " action='/users/logout' method="POST" >
                                <div className="fold" >
                                    <a  ref={closeMeRef} className="closeMe">&times;</a><br/>
                                    <h4>{ props.user.name }</h4><p>{props.user.email}</p>
                                    <Link onClick={()=>showForm(false)()} to="/user/profile" >Profile</Link>
                                    <button className="logout" onClick={ loginOut } type="submit" name="logout">Log-Out</button>
                                </div>
                            </form>
                    }

                </div>

            )
        }
    };
    return(
        <nav id="nav" className= 'container-fluid row' style={{padding:'0'}} >

            <input type="checkbox" className="toggle" id="mMenu" style = {{ display:"none" }} />
            <label htmlFor="mMenu"  className="box col-1 col-sm-1 col-md-1">
                <i className="fa fa-align-justify "></i>
            </label>

            {/* CANVAS */}
            <div className='canvasWrapper col-7 col-sm-8 col-md-8 col-lg-2'>
                <canvas className="logo" ></canvas>
            </div>

            <ul className="nPanel col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ml-auto">

                <li><NavLink  to="/home"   onClick={() => props.clearGetParams() } >HOME</NavLink></li>
                <li><NavLink  to="/latest" onClick={() => props.clearGetParams() } >LATEST</NavLink></li>
                <li><NavLink  to="/movies" onClick={() => props.clearGetParams() } >MOVIES</NavLink></li>
                <li><NavLink  to="/tv"     onClick={() => props.clearGetParams() } >TV</NavLink></li>
            </ul>

            <div id='search_wrapper'>
                <SearchBar/>
            </div>

            {/* Login */}
            <div className="loginContainer col-2 col-sm-2 col-md-1 col-lg-1 ">
                { loginFormElement() }
            </div>

        </nav>
    )

}


const mapStateToProps = ( state )=>{
    return {  ...state.userReducer  }
}
const mapDispatchToProps = ( dispatch )=>{
    return {
        login                : ( path, params) => {  dispatch( getUser( path, params ) ) },
        acquireTokenSilently : ( )             => {  dispatch( getTokensSilently () ) },
        logOut               : ( path )        => {  dispatch( logOut( path ) ) },
        clearGetParams       : ( )             => {  dispatch({ 'type': 'SET_M_GET_PARAM', 'getParam': null }) }
    }

}

export default connect( mapStateToProps, mapDispatchToProps )( withRouter( NavBar ) )


