import React, { Component } from 'react'
import { connect          } from 'react-redux'
import { withRouter       } from 'react-router-dom'

import { updateUserData }      from '../../store/actions/updateUserData'

export class emailConfirm extends Component {

    constructor(props){
      super(props);
      this.state = { ...props };

    };

    componentDidMount( ){

      if ( this.props.match.params.token ){
        var formData = new FormData( );
            formData.append('email', this.props.match.params.email )
            formData.append('token', this.props.match.params.token )
        var path = '/user/email/confirmation';

        this.props.checkUser( path, formData );

      }
    };


    static getDerivedStateFromProps(props, state){
      //  if message has changed, then change it
      if( props.msg &&  ( JSON.stringify(props.msg) !== JSON.stringify(state.msg) ) ){
        return { ...props  }
      }
      return null
    };

    localSection (){

      let wrapperStyle = { height: '100vh', margin: '20px auto' };
      let alertStyle   = { padding: '20px' };

      if ( this.props.user && this.props.user.isVerified ){
        this.props.history.push("/")
      }
      if (  this.props.msg && this.props.msg.emailConfirmed ){

        let element = ( <div style={ wrapperStyle }> <div style={ alertStyle }  className="alert alert-success" role="alert">{ this.props.msg.emailConfirmed } </div> </div>);
        return element
      }
      else if( this.props.msg && this.props.msg.timeErr ){
        return <div style={ wrapperStyle } > <div className="alert alert-danger">{ this.props.msg.timeErr } </div> </div>
      }
      else if( this.props.msg && this.props.msg.errorCred ){
        return <div style={ wrapperStyle } > <div className="alert alert-danger">{ this.props.msg.errorCred } </div> </div>
      }
      else{
        return (
          <div className="text-center spinner mx-auto">
            <div className="spinner-border" role="status"></div>
          </div>
        )
      }
    }
    render() {
      return (
        <div  className='email_confirmation_wrapper'>
          {this.localSection()}
        </div>
      )
    }

}


const mapStateToProps = ( state, ownProps )=>{
  return { ...state.userReducer  }
}
const mapDispatchToProps = ( dispatch )=>{
  return {
    checkUser    : ( path, params) => {  dispatch( updateUserData( path, params ) ) },
    dellMessages : ()              => {  dispatch( { 'type': 'DELL_ALL_MSG' } ) }
  }
}

// export default withRouter( NavBar );
export default connect( mapStateToProps, mapDispatchToProps )( withRouter( emailConfirm ) )