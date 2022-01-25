import React, { useRef, useImperativeHandle } from 'react';


const EmailForm = (props, ref) => {

  const emailRef = useRef();
  const mailErr = useRef();
  const comment = useRef();
  const comment_error = useRef();

  //--To Do...
  const send_email_error = useRef();

  useImperativeHandle(ref, () => ({
    get email() {
      return emailRef.current
    },
    get email_error() {
      return mailErr.current
    },
    get comment() {
      return comment.current
    },
    get comment_error() {
      return comment_error.current
    },
  }));


  return (
    <form
      onSubmit={(ev) => props.sendMessage(ev)} method="POST" action='/users/contact/email'
      className=" col-11  col-md-6 "
    >

      {
        (props.msg && props.msg.contact) &&
        <label className="alert alert-success" role="alert">{props.msg.contact}</label>
      }

      <a onClick={() => {
        props.showForm()
      }} className="closeMe foterCl ">×</a><br/>

      <div className="form-group">
        <label>Email:</label><br/>
        <input ref={emailRef} type="email" name='email' className="sender form-control" placeholder="Enter your email"/>

        <span className="mailErr text-danger"><small ref={mailErr}></small></span><br/>
      </div>


      <div className="form-group">
        <label htmlFor="comment">Message:</label>
        <textarea
          ref={comment} name='msg' className="form-control" rows="5" id="comment" type="text"
          placeholder="Enter your message"
        ></textarea>
        <span className="textErr text-danger"><small ref={comment_error}></small></span>
      </div>

      <label className="dummy"></label>

      <div className="input-group">
        <div className="g-recaptcha"> {/*  to do capcha_siteKay */}
        </div>
      </div>

      {/* MSG from Server */}
      <span className="mailErr   text-danger">
				<small ref={send_email_error}></small>
			</span><br/>


      {/* Send Button */}
      <input type='submit' value="SEND" className="btn btn-success form-control"/><br/>

    </form>
  )

}


export default React.forwardRef(EmailForm)