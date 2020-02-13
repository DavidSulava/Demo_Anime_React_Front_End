import React, { Component }          from 'react'
import { connect }                   from 'react-redux'
import { withRouter  } from 'react-router-dom'


import { getUser }      from '../../store/actions/getUser'


export class emailConfirm extends Component {

    constructor(props)
      {
        super(props);
        this.state = { ...props };

      };

    componentDidMount( )
      {

        if ( this.props.match.params.token )
            {
                var formData = new FormData( );
                    formData.append('email', this.props.match.params.email )
                    formData.append('token', this.props.match.params.token )
                var path = '/users/email/confirmation';

                this.props.checkUser( path, formData );

            }
      };


    static getDerivedStateFromProps(props, state)
      {
        //  if message has changed, then change it
        if( props.msg &&  ( JSON.stringify(props.msg) !== JSON.stringify(state.msg) ) )
          {
            return { ...props  }
          }
        return null
      };

    localSection ()
        {
            var wrapperStyle = { height: '100vh', margin: '20px auto' };
            var alertStyle   = { padding: '20px' };

            if ( this.props.user && this.props.user.isVerified)
                {
                    this.props.history.push("/")
                }
            if (  this.state.msg && this.state.msg.emailConfirmed )
                {


                    var element      = ( <div style={ wrapperStyle }> <div style={ alertStyle }  className="alert alert-success" role="alert">{ this.state.msg.emailConfirmed } </div> </div>);

                    return element
                }
            else if( this.state.msg && this.state.msg.timeErr )
                {
                    return <div style={ wrapperStyle } > <div className="alert alert-danger">{ this.state.msg.timeErr } </div> </div>
                }
            else if( this.state.msg && this.state.msg.errorCred )
                {
                    return <div style={ wrapperStyle } > <div className="alert alert-danger">{ this.state.msg.errorCred } </div> </div>
                }
            else
                {
                    return <p style={ wrapperStyle } >Loading...</p>
                }
        }
    render() {
        return (
            <div>
              {this.localSection()}
            </div>

        )
    }

}


const mapStateToProps = ( state, ownProps )=>
    {
      return { ...state.userReducer  }
    }
const mapDispatchToProps = ( dispatch )=>
    {
        return { checkUser    : ( path, params) => {  dispatch( getUser( path, params ) ) },
                 dellMessages : ()=> {  dispatch( { 'type': 'DELL_ALL_MSG' } ) }}
    }

// export default withRouter( NavBar );
export default connect( mapStateToProps, mapDispatchToProps )( withRouter( emailConfirm ) )