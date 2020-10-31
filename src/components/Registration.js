import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { withRouter }       from 'react-router-dom'
import  Recaptcha           from 'react-recaptcha'

import { getUser } from '../store/actions/getUser'


export class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = { ...props, form: { 'name': '', 'email': '', 'firstName': '', 'lastName': '',  'phone': '', 'password': '', 'password_confirmation':'' } };

        this.valueChanged = this.valueChanged.bind(this);
        this.submForm     = this.submForm.bind(this);
    }

    componentDidMount( ){
      this.props.dellMessages();
    };

    valueChanged(ev){

      var ch_key = ev.target.name;
      var ch_val = ev.target.value

      this.setState( { form: { ...this.state.form, [ ch_key ]: ch_val } } );
    };

    submForm(ev){
      ev.preventDefault()
      var path =  '/users/register'

      var formData = new FormData( ev.target );

      this.props.getData( path, formData );
    }

    localSection()
      {
        if( this.props.msg && this.props.msg.loginSuccess )
          {
            this.props.history.push("/");
            return null
          }
        else if( this.props.msg && this.props.msg.regSuccess )
          {
            var wrapperStyle = { height: '100vh', margin: '20px auto' };
            var alertStyle   = { padding: '20px' }
            var element = ( <div style={ wrapperStyle }> <div style={ alertStyle }  className="alert alert-success" role="alert">{ this.props.msg.regSuccess } </div> </div>);

            (function( props )
              {
                setTimeout( ()=>{  props.history.push("/");  }, 3000);
              }
            )(this.props)


            return  element;
          }
        else
          {
            return (

                <form onSubmit={ this.submForm }  method = "POST" className="regForm" action='users/register'>
                    <div className="Registration">
                        { ( this.props.msg && this.props.msg.errorCred ) && <div className="alert alert-danger">{ this.props.msg.errorCred } </div> }
                        <input type="hidden" name='sender'   value='' /> <br/>

                        <input type="text"  onChange={this.valueChanged} name='name'      className="username"  placeholder="Username"  value= { this.state.form.username }  /><br/>
                        { ( this.props.msg && this.props.msg.errorUsername) && <div className="alert alert-danger">{ this.props.msg.errorUsername } </div> }

                        <input type="text"  onChange={this.valueChanged} name='email'     className="email"     placeholder="E-mail"     value= { this.state.form.email } / ><br/>
                        { ( this.props.msg && this.props.msg.emailErr) && <div className="alert alert-danger">{ this.props.msg.emailErr } </div> }

                        <input type="text"  onChange={this.valueChanged} name='firstName' className="firstName" placeholder="First Name" value= { this.state.form.firstName } /><br/>

                        <input type="text"  onChange={this.valueChanged} name='lastName'  className="lastName"  placeholder="Last Name"  value= { this.state.form.lastName } /><br/>

                        <input type="text"  onChange={this.valueChanged} name='phone'     className="phone"     placeholder="Phone Number" value= { this.state.form.phone } /><br/><br/>

                        <input type="password" onChange={this.valueChanged} name='password' placeholder="Password"  className="password" value= { this.state.form.password}></input>
                        { ( this.props.msg && this.props.msg.errorPassword)  && <div className="alert alert-danger">{ this.props.msg.errorPassword } </div> }

                        <input type="password" onChange={this.valueChanged} name='password_confirmation'  placeholder="Confirm Password" className="pasConfirm" value= { this.state.form.password_confirmation} />
                        { ( this.props.msg && this.props.msg.errorPass_confirm ) && <div className="alert alert-danger">{ this.props.msg.errorPass_confirm } </div> }
                        <br/>
                        { (  this.props.msg && this.props.msg.regSuccess && !this.props.errorCred) && <div className="alert alert-success" role="alert">{ this.props.regSuccess } </div> }

                        <br/>
                        { (this.props.msg && this.props.msg.erCaptcha) && <div className="alert alert-danger">{ this.props.msg.erCaptcha } </div> }
                        <Recaptcha sitekey={ process.env.REACT_APP_RECAPCHA_KEY  } render="explicit" hl={window.navigator.userLanguage || window.navigator.language} />
                        <br/>

                        <button type="submit"  name="submitReg" className="submitRreg" >SUBMIT</button>
                    </div>

                </form>

            )
          }
      }
    render(){
      return (
        <div>
          { this.localSection() }
        </div>


      )
    }
};


const mapStateToProps = ( state )=>
    {
      return { ...state.userReducer }
    };
const mapDispatchToProps = ( dispatch )=>
    {
        return { getData : ( path, params) => {  dispatch( getUser( path, params ) ) }, dellMessages : ()=> {  dispatch( { 'type': 'DELL_ALL_MSG' } ) }  }
    };

{/* export default withRouter( Registration ); */}
export default connect( mapStateToProps, mapDispatchToProps )( withRouter( Registration ) )