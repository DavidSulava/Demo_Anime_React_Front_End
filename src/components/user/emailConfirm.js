import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, withRouter } from 'react-router-dom'
import { updateUserData } from '../../store/actions/updateUserData'
import { DELL_ALL_MSG } from '../../store/constants';


export const EmailConfirm = (props) => {
  const history = useHistory()

  useEffect(() => {
    if (props.match.params.token) {
      const formData = new FormData();
      formData.append('email', props.match.params.email)
      formData.append('token', props.match.params.token)
      const path = '/user/email/confirmation';

      props.checkUser(path, formData);
    }
  }, [])


  const localSection = () => {

    const wrapperStyle = {height: '100vh', margin: '20px auto'};
    const alertStyle = {padding: '20px'};

    if (props.user && props.user.isVerified) {
      history.push("/")
    }
    if (props.msg && props.msg.emailConfirmed) {
      return (
        <div style={wrapperStyle}>
          <div style={alertStyle} className="alert alert-success" role="alert">{props.msg.emailConfirmed} </div>
        </div>
      );
    } else if (props.msg && props.msg.timeErr) {
      return (
        <div style={wrapperStyle}>
          <div className="alert alert-danger">{props.msg.timeErr} </div>
        </div>
      )
    } else if (props.msg && props.msg.errorCred) {
      return (
        <div style={wrapperStyle}>
          <div className="alert alert-danger">{props.msg.errorCred} </div>
        </div>
      )
    } else {
      return (
        <div className="text-center spinner mx-auto">
          <div className="spinner-border" role="status"></div>
        </div>
      )
    }
  }

  return (
    <div className='email_confirmation_wrapper'>
      {localSection()}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {...state.userReducer}
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkUser: (path, params) => {
      dispatch(updateUserData(path, params))
    },
    dellMessages: () => {
      dispatch({'type': DELL_ALL_MSG})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EmailConfirm))