import React, { Component }          from 'react'
import { connect }                   from 'react-redux'
import {  withRouter, Redirect  } from 'react-router-dom'


import { getUser }      from '../../store/actions/getUser'
import { checkUserSession } from '../../store/actions/checkUserSession'





function importAll(r)
  {
    const cache = [];
    r.keys().map(( item ) => { cache.push( item.replace('./', '/') ) });
    return cache;
  }
const images = importAll(require.context('../../../public/img/', false, /\.(png|jpg|jpeg|gif)?$/));



export class Profile extends Component {

    constructor(props)
      {
        super(props);
        this.state = { ...props,
                          form : {  'name'     : props.user.name,
                                    'email'    : props.user.email,
                                    'firstName': props.user.firstName,
                                    'lastName' : props.user.lastName,
                                    'phone'    : props.user.phone,
                                    'password' : '',
                                    'password_confirmation':''},
                          imgEl: 'none',
                     };

        this.valueChanged = this.valueChanged.bind(this);
        this.updateUser   = this.updateUser.bind(this);
      };


    componentDidMount( )
      {
        this.props.dellMessages();
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

    valueChanged(ev)
      {

        var ch_key = ev.target.name;
        var ch_val = ev.target.value

        this.setState( { ...this.state, form: { ...this.state.form, [ ch_key ]: ch_val } } );

      };

    updateUser( ev, path='/users/updateUser' )
      {
        ev.preventDefault();
        var formData = new FormData( ev.target );

        this.state.updateUser( path, formData)
      };

    emailConfirm = ( ev )=>
      {
        ev.preventDefault();

        var formData = new FormData( );
            formData.append( 'email'    , this.props.user.email );

        var path = '/users/email/sendVerification';

        this.state.updateUser( path, formData );
      }
    showImgEl = ( ev, bool=true )=>
      {
        ev.stopPropagation();
        // ev.nativeEvent.stopImmediatePropagation();

        this.setState( { ...this.state, imgEl: bool ? 'block': 'none' } ,
          ()=>
            {
              var imgEl           = document.querySelector( '.avatarWrapper' );
              imgEl.style.display = this.state.imgEl;
            }
        );



      }
    imgSel    = ( ev ) =>
      {
        ev.stopPropagation();

        var imgSrc  = ev.target.src;
        var imgName = imgSrc.replace( /.*(?<=img\/)/, '');

        var formData = new FormData( );
            formData.append('img', imgName );

        this.state.updateUser( '/users/updateImg', formData)

        this.showImgEl( ev, false )
      }


    localSection()
      {
        if ( this.props.user )
            {
                let section = (
                  <div>
                    {/* ---------------[ Verify Email ]----------- */}
                    { !this.props.user.isVerified &&
                      <div className="avatarWrapperWrapper">
                        <label className="error alert alert-danger">Email is not verified </label><br/>
                        {
                          this.props.msg.regSuccess &&
                            <p className="alert alert-success" role="alert" >{ this.props.msg.regSuccess }</p>

                        }

                        <br/>
                        <button onClick={ (ev)=> this.emailConfirm( ev )} type="submit"  className="submit_profile"> Verify </button>
                      </div>
                    }

                    {/* ---------------[ Avatar change ]----------- */}
                    <div className="avatarWrapperWrapper">
                      <label className="profile_chang"> Add/change Avatar </label>
                      <br/>
                      <h4 style={{ marginLeft: '20px'}} >Select avatar</h4>
                      <br/>
                      <button onClick={ (ev)=> this.showImgEl( ev )} type="submit"  className="submit_profile"> Select </button>
                    </div>

                      <div onClick={ ( ev )=> this.showImgEl( ev, false )} className="avatarWrapper" style={{ display: 'none'}}>


                      <div onClick={ ( ev )=> this.showImgEl( ev )} className="avatarIMG_canvas_wrapper">

                        <div className="close_cropper_wrapper">
                          <a onClick={ ( ev )=> this.showImgEl( ev, false )} className="close_cropper" style={{textDecoration: 'none'}} > &#x2612; </a>
                        </div>

                        <div className='img_sel_holder'>
                          {
                            images.map( function ( el, index )
                              {
                                var imgPath = process.env.PUBLIC_URL + '/img';
                                var imgStyle= { padding: '2px', cursor:'pointer'}
                                return <img onClick={ (ev)=> this.imgSel(ev) } src={ imgPath + el} key={index} style={imgStyle} alt="" height="72" width="72"></img>
                              }, this )
                          }
                        </div>

                      </div>



                    </div>

                    {/*  --------------[ Profile change ]---------------------- */}
                    <div className="profWrapper">

                        <label className="profile_change">Profile</label>

                        <form onSubmit={ (ev)=> this.updateUser(ev) } method="POST" action='/users/updateUser' className="profile_forms">
                            <br/>
                            {/*--Profile Successfully changed  TO DO.... */}
                            { ( this.state.msg && this.state.msg.userUpdated ) &&
                                    <label className="alert alert-success" role="alert" >{ this.state.msg.userUpdated }</label>
                            }
                            <br/>


                            <label htmlFor="username">Username</label><br/>
                            <input type="text" name='name' className="username" id="username" onChange={this.valueChanged} defaultValue={ this.props.user.name  } placeholder={ this.props.user.name }  />

                            { ( this.state.msg.errorUsername ) &&
                                <label className="error alert alert-danger">{ this.state.msg.errorUsername }</label>
                            }

                            <br/>

                            <label htmlFor="">E-mail</label><br/>
                            <input type="text" name='email' className="email" onChange={this.valueChanged}  defaultValue={ this.props.user.email }  placeholder={ this.props.user.email } />

                            {/*--EMAIL error  */}
                            { ( this.state.msg.emailErr ) &&
                                <label className="error alert alert-danger">{ this.state.msg.emailErr }</label>
                            }



                            <br/>

                            <label htmlFor="">First Name</label><br/>
                            <input type="text" name='firstName' className="firstName" onChange={this.valueChanged} defaultValue={  this.props.user.firstName }  placeholder={ this.props.user.firstName } />

                            {/*--FierstName error  TO DO.... */}
                                    {/* <label className="error alert alert-danger">{{ $message }}</label>
                                    <br/> */}

                            <br/>
                            <label htmlFor="">Last Name</label><br/>
                            <input type="text" name='lastName' className="lastName" onChange={this.valueChanged} defaultValue={ this.props.user.lastName } placeholder={ this.props.user.lastName } />
                            {/*--lastName error  TO DO.... */}
                                    {/* <label className="error alert alert-danger">{{ $message }}</label>
                                    <br/> */}

                            <br/>
                            <label htmlFor="">Phone Number</label><br/>
                            <input type="text" name='phone' className="phone"  onChange={this.valueChanged}  defaultValue={ this.props.user.phone }  placeholder={ this.props.user.phone }/>
                            {/*--phone error  TO DO.... */}
                                {/* <label className="error alert alert-danger">{{ $message }}</label>
                                <br/> */}

                            <br/><br/>
                            <button type="submit" name="submit_profile_change" className="submit_profile">Change</button>
                        </form>
                    </div>

                    {/*----------------[ Password change ] --------------------- */}
                    <div className="passChange">

                      <label className="Pas_Change">Password</label><br/>


                      <form method="POST" onSubmit={ (ev)=> this.updateUser(ev, '/users/newPassword') } action='/users/newPassword' className="profile_forms">
                          <br/>

                          <label htmlFor="">Old Password</label><br/>
                          <input type="password"  name='password' className="password" placeholder='Old Password'/>

                          <br/>
                          <label htmlFor="">New Password</label><br/>
                          <input type="password"  name='new_assword' className="password" placeholder='New Password'/>


                          { (this.state.msg && this.state.msg.erPassword) &&
                              <label className="error alert alert-danger">{ this.state.msg.erPassword }</label>
                          }

                          {
                              //--Password change success
                              ( this.state.msg && this.state.msg.passUpdated ) &&
                                  <label className='success alert alert-success'>{ this.state.msg.passUpdated  }</label>
                          }
                          <br/>  <br/>
                          <button type="submit" name="submitPassChange" className="submit_profile">Change</button>
                      </form>
                    </div>

                    {/*----------------[ Delete Your Account ] --------------------- */}
                    <div className="deleteAccount">
                      <label className="Pas_Change"><h4 style={{color: 'red' }}>Delete Your Account</h4><br/></label>

                      <form onSubmit={ (ev)=> this.updateUser(ev, '/users/deleteUser') } method="POST" action='/users/deleteUser' className="profile_forms">

                        <br/>
                        <label htmlFor="">Type in your email  to confirm account deletion.</label><br/>
                        <input type="text" name='email' className="email"/>
                        { this.state.msg.emailErr &&
                            <label className="error alert alert-danger">{ this.state.msg.emailErr }</label>
                        }

                        <br/>
                        <label htmlFor="">Also, type in your password.</label><br/>
                        <input type= "password"  name='password' className= "password"></input>
                        { this.state.msg.errorPassword &&
                          <label className="error alert alert-danger">{ this.state.msg.errorPassword }</label>
                        }


                        { this.state.msg.acDeleted &&
                          <label className='success' style={{color: 'green' }}>{ this.state.msg.acDeleted }</label>
                        }

                        <br/>
                        <button type="submit" name="submitDelete" className="submit_profile">Delete</button>
                      </form>
                    </div>
                  </div>
                )

                return section
            }
        else
            {
                // this.props.history.push('/home')
                return <Redirect to='/home'  />
            }
        return <p>no user</p>

      };

    render() {
        return (
            this.localSection()
        )
    }
}

const mapStateToProps = ( state, ownProps )=>
    {
      return { ...state.userReducer  }
    }
const mapDispatchToProps = ( dispatch )=>
    {
        return { updateUser   : ( path, params) => {  dispatch( getUser( path, params ) ) },
                 checkUserSess: ( path ) => {  dispatch( checkUserSession( path ) ) } ,
                 dellMessages : ()=> {  dispatch( { 'type': 'DELL_ALL_MSG' } ) }}
    }

// export default withRouter( NavBar );
export default connect( mapStateToProps, mapDispatchToProps )( withRouter( Profile ) )