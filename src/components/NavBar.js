import React, { Component }          from 'react'
import { connect }                   from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom'


import { getUser }      from '../store/actions/getUser'
import { checkUserSession } from '../store/actions/checkUserSession'

//--components
import SearchBar   from './searchBar';


export class NavBar extends Component{

    constructor(props){
        super(props);
        this.state = { ...props };

        this.submForm  = this.submForm.bind(this);
        this.logOut    = this.logOut.bind(this);
    }

    componentDidMount() {
        this.props.checkUserSess();
    }
    submForm(ev) {
        ev.preventDefault();

        let formEl = ev.currentTarget.parentNode
        var path   = "/users/login";

        var formData = new FormData(formEl);

        this.props.login(path, formData);
    }
    imgSection(){


        if( this.props.msg && this.props.msg.errorCred && !this.props.user )

            return ( <div className="alert alert-danger" style={{ width:'auto', margin:'0 7px'}}>{ this.props.msg.errorCred } </div> );

        else if (  this.props.user && this.props.user.img )

            return (<img src  = { process.env.PUBLIC_URL + '/img/' + this.props.user.img }
                    alt   = "avatar " className="avatarlogged "
                    title = { `${ this.props.user.name }\n${ this.props.user.email }` } /> );

        else if ( this.props.user && !this.props.user.img)

            return (<i className="fa fa-user avatarlogged"   style={{ fontSize: '4vmin', color: 'rgb(39, 217, 187)', cursor:'pointer' }}  alt="avatar " title={ `${ this.props.user.name }&#13;${ this.props.user.email }` }></i>);

    }

    logOut(ev) {
        ev.preventDefault();

        this.props.checkUserSess('/users/logOut');

    }

    formSection(){
        if ( !this.props.user || !this.props.user.email) {
            return (
                <div>
                    <div className="loginButtons  ">
                        <button className="enter ">LOGIN</button>
                    </div>

                    <form  className="loginForm" method="POST" >
                        <a className="closeMe">&times;</a>
                        <div className="imgContainer">
                            { this.imgSection() }
                        </div>

                        <label htmlFor="uname">Email</label>
                        <input id="uname" type="text" placeholder="Email" name="email" />


                        <br/>

                        <label htmlFor="pass">Password</label>
                        <input id="pass" type="password" placeholder="Enter Password" name="password" ></input>

                        <br/>

                        <button className="singin" type="submit" name="singin" onClick={ this.submForm }>Login</button>

                        <button className="singup"  name="singup" >
                            <a href="/registration">Sing-Up</a>
                        </button>
                        <br/>
                        {/* <Link to="password/reset">Forgot password?</Link> */}

                    </form>
                </div>
            )
        }
        else if ( this.props.user && this.props.user.email  ){
            return (
                <div>
                    { this.imgSection() }
                    <form className="logged " action='/users/logout' method="POST" style = {{ display: 'none'}}  >

                        <div className="fold" style = {{ display: 'block'}}>
                            <h4>{ this.props.user.name }</h4><p>{this.props.user.email}</p>
                            <Link to="/user/profile" >Profile</Link>
                            <button className="logout" onClick={ this.logOut } type="submit" name="logout">Log-Out</button>
                        </div>
                    </form>
                </div>

            )
        }
    }

    render() {
        return (

            <nav id="nav" className= 'container-fluid row' style={{padding:'0'}} >

                <input type="checkbox" className="toggle" id="mMenu" style = {{ display:"none" }} />
                <label htmlFor="mMenu"  className="box col-1 col-sm-1 col-md-1">
                    <i className="fa fa-align-justify "></i>
                </label>

                {/* CANVAS */}
                <div className='canvasWrapper col-7 col-sm-8 col-md-8 col-lg-2 '>
                    <canvas className="logo" ></canvas>
                </div>

                <ul className="nPanel col-12 col-sm-12 col-md-12 col-lg-6 col-xl-7 ">
                    <li><NavLink  to="/home"    >HOME</NavLink></li>
                    <li><NavLink  to="/latest"  >LATEST</NavLink></li>
                    <li><NavLink  to="/movies"  >MOVIES</NavLink></li>
                    <li><NavLink  to="/tv"      >TV</NavLink></li>
                </ul>

                <div id='search_wrapper'>
                    <SearchBar/>
                </div>

                {/* Login */}
                <div className="loginContainer col-2 col-sm-2 col-md-1 col-lg-1 col-xl-1">
                    { this.formSection() }
                </div>

            </nav>
        )
    }
}

const mapStateToProps = ( state )=>{
    return {  ...state.userReducer  }
}
const mapDispatchToProps = ( dispatch )=>{
    return { login : ( path, params) => {  dispatch( getUser( path, params ) ) }, checkUserSess: ( path ) => {  dispatch( checkUserSession( path ) ) }  }
}

// export default withRouter( NavBar );
export default connect( mapStateToProps, mapDispatchToProps )( withRouter( NavBar ) )


