import React, { Component } from 'react'
import { connect }          from 'react-redux'

import { getUser }      from '../store/actions/getUser'


export class FooterComp extends Component {

    constructor(props)
      {
        super(props);
        this.state = { ...props };

      };

    static getDerivedStateFromProps(props, state)
        {
            //  if message has changed, then change it
            if( props.msg && JSON.stringify(props.msg) !== JSON.stringify(state.msg) )
                {
                    return { ...state, msg:  props.msg  }
                }
            return null
        }

    sendMessage = (ev)=>
        {
            ev.preventDefault();

            var inputEm   = document.querySelector('.emessageWrap .sender');
            var emailErr  = document.querySelector('.emessageWrap .mailErr small');
            var messageEm = document.querySelector('.emessageWrap textarea');
            var messErr   = document.querySelector('.emessageWrap .textErr small');

            if (!inputEm.checkValidity())
                {
                    emailErr.innerText = inputEm.validationMessage;
                }
            else if (inputEm.value === '')
                {
                    emailErr.innerText = 'Email fild cannot be empty!';
                }
            else if (messageEm.value === '')
                {
                    emailErr.innerText = '';
                    messErr.innerText = 'Massege fild cannot be empty!';
                }
            else
                {
                    emailErr.innerText = '';
                    messErr.innerText = '';

                    var formData = new FormData( ev.target );

                    this.props.sendEmail( '/users/contact/email', formData)
                }

        }

    contactForm (){
        return  (
            <form onSubmit={ (ev)=> this.sendMessage(ev) } method="POST" action='/users/contact/email'  className=" col-11  col-md-6 ">

                {
                    (this.state.msg && this.state.msg.contact) &&
                        <label className="alert alert-success" role="alert" >{ this.state.msg.contact }</label>
                }

                <a  className="closeMe foterCl ">×</a><br/>

                <div className="form-group">
                    <label>Email:</label><br/>
                    <input ref="email" type="email" name='email' className="sender form-control" placeholder="Enter your email"/>

                    <span className="mailErr text-danger"><small ref="email_error"></small></span><br/>
                </div>


                <div className="form-group">
                    <label htmlFor="comment">Message:</label>
                    <textarea ref="comment" name='msg' className="form-control" rows="5" id="comment" type="text" placeholder="Enter your message"></textarea>
                    <span className="textErr text-danger"><small ref="comment_error"></small></span>
                </div>

                <label className="dummy"></label>

                <div className="input-group">
                    <div className="g-recaptcha" > {/*  to do capcha_siteKay */}
                    </div>
                </div>

                {/* MSG from Server */}
                <span  className="mailErr   text-danger">
                    <small ref="send_email_error"></small>
                </span><br/>

                <span  className="mailOk  text-success">
                    <small ref="send_email_OK">   </small><br/>
                </span><br/>

                {/* Send Button */}
                <input   type='submit'  value="SEND" className="btn btn-success form-control"/><br/>


            </form>
        )
    }

    render() {
        return (
            <footer>
                <div  className="footer_wrapper">

                    <div className="emessageWrap container-fluid"  style = {{ display:"none" }}>


                       {this.contactForm()}


                    </div>

                    <div className="disc">
                        <p  className="contact">Contact as : <span title="Click to send a message">✉</span></p>
                        <p className="f_2">
                            <span>Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties.</span>
                        </p>
                    </div>


                </div>

            </footer>
        )
    }
}

const mapStateToProps = ( state )=>
    {
        return { ...state.userReducer  }
    }
const mapDispatchToProps = ( dispatch )=>
    {
        return { sendEmail    : ( path, params) => {  dispatch( getUser( path, params ) ) } }
    }

export default connect( mapStateToProps, mapDispatchToProps )(FooterComp)