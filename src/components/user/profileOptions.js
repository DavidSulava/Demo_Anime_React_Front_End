import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Redirect} from 'react-router-dom'
import {updateUserData} from '../../store/actions/updateUserData'

function importAll(r) {
    const cache = [];
    r.keys().map((item) => {
        return cache.push(item.replace('./', '/'))
    });
    return cache;
}

const images = importAll(require.context('../../../public/img/', false, /\.(png|jpg|jpeg|gif)?$/));
const revSTR = (str) => {
    return str.split('').reverse().join('')
}

export class Profile extends Component {
    constructor(props) {

        super(props);
        this.state = {
            ...props,
            form: {
                'name': props.user ? props.user.name : '',
                'email': props.user ? props.user.email : '',
                'firstName': props.user ? props.user.firstName : '',
                'lastName': props.user ? props.user.lastName : '',
                'phone': props.user ? props.user.phone : '',
                'password': '',
                'password_confirmation': ''
            },
            imgEl: 'none',
        };

        this.valueChanged = this.valueChanged.bind(this);
        this.updateUser = this.updateUser.bind(this);
    };

    componentDidMount() {
        this.props.dellMessages();
    };

    static getDerivedStateFromProps(props, state) {
        //  if message has changed, then change it
        if (props.msg && JSON.stringify(props.msg) !== JSON.stringify(state.msg)) {

            return {...state, msg: props.msg}
        }
        return null
    }

    valueChanged(ev) {
        const ch_key = ev.target.name;
        const ch_val = ev.target.value

        this.setState({...this.state, form: {...this.state.form, [ch_key]: ch_val}});

    };

    updateUser(ev, path = '/user/updateUser') {
        ev.preventDefault();
        const formData = new FormData(ev.target);

        this.state.updateUser(path, formData)
    };

    emailConfirm = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('email', this.props.user.email);

        const path = '/user/email/sendVerification';

        this.state.updateUser(path, formData);
    }
    showImgEl = (ev, bool = true) => {
        ev.stopPropagation();
        // ev.nativeEvent.stopImmediatePropagation();
        this.setState({...this.state, imgEl: bool ? 'block' : 'none'},
            () => {
                var imgEl = document.querySelector('.avatarWrapper');
                imgEl.style.display = this.state.imgEl;
            }
        );
    }
    imgSel = (ev) => {
        ev.stopPropagation();
        // ----[ for the Edge compatibility ( not supports positive lookBehind) ]----
        const imgSrc = revSTR(ev.target.src);
        let imgName = imgSrc.replace(new RegExp(`(?=\/${ revSTR( 'img' ) }).*`, 'i'), '');
        imgName = revSTR(imgName)

        const formData = new FormData();
        formData.append('img', imgName);

        this.state.updateUser('/user/updateAvatar', formData)

        this.showImgEl(ev, false)
    }

    localSection() {
        if (!this.props.user)
            return <Redirect to='/home'/>

        return (
            <div>
                {/* ---------------[ Verify Email ]----------- */}
                {
                    !this.props.user.isVerified &&
                    <div className="avatarWrapperWrapper">
                        <label className="error alert alert-danger">Email is not verified </label><br/>
                        {
                            this.props.msg.verLinkSend &&
                            <p className="alert alert-success" role="alert">{this.props.msg.verLinkSend}</p>
                        }
                        <br/>
                        <button
                            onClick={this.emailConfirm}
                            type="submit"
                            className="submit_profile btn btn-success btn-sm"
                        >
                            Verify
                        </button>
                    </div>
                }

                {/* ---------------[ Avatar change ]----------- */}
                <div className="avatarWrapperWrapper">
                    <label className="profile_chang">Add/change Avatar </label>
                    <br/>
                    <h4 style={{marginLeft: '20px'}}>Select avatar</h4>
                    <br/>
                    <button
                        type="submit"
                        className="submit_profile btn btn-success btn-sm"
                        onClick={this.showImgEl}
                    >
                        Select
                    </button>
                </div>

                <div
                    className="avatarWrapper"
                    style={{display: 'none'}}
                    onClick={this.showImgEl}
                >
                    <div onClick={(ev) => this.showImgEl(ev)} className="avatarIMG_canvas_wrapper">
                        <div className="close_cropper_wrapper">
                            <a
                                className="close_cropper"
                                style={{textDecoration: 'none'}}
                                onClick={this.showImgEl}
                            >
                                &#x2612;
                            </a>
                        </div>

                        <div className='img_sel_holder'>
                            {
                                images.map(function (el, index) {
                                    const imgPath = process.env.PUBLIC_URL + '/img';
                                    const imgStyle = {padding: '2px', cursor: 'pointer'}
                                    return (
                                        <img
                                            src={imgPath + el}
                                            key={index}
                                            style={imgStyle}
                                            alt=""
                                            height="72"
                                            width="72"
                                            onClick={this.imgSel}
                                        ></img>
                                    )
                                }, this)
                            }
                        </div>
                    </div>
                </div>
                {/*  --------------[ Profile change ]---------------------- */}
                <div className="profWrapper">
                    <label className="profile_change">Profile</label>
                    <form
                        method="POST"
                        action='/users/updateUser'
                        className="profile_forms"
                        onSubmit={this.updateUser}
                    >
                        <br/>
                        {/*--Profile Successfully changed  TO DO.... */}
                        {
                            (this.state.msg && this.state.msg.userUpdated) &&
                            <label className="alert alert-success" role="alert"
                            >
                                {this.state.msg.userUpdated}
                            </label>
                        }
                        <br/>
                        <label htmlFor="username">Username</label><br/>
                        <input
                            type="text" name='name' className="username" id="username"
                            onChange={this.valueChanged}
                            defaultValue={this.props.user.name} placeholder={this.props.user.name}
                        />

                        {
                            (this.state.msg.errorUsername) &&
                            <label className="error alert alert-danger"
                            >
                                {this.state.msg.errorUsername}
                            </label>
                        }
                        <br/>
                        <label htmlFor="">E-mail</label><br/>
                        <input
                            type="text"
                            name='email'
                            className="email"
                            defaultValue={this.props.user.email}
                            placeholder={this.props.user.email}
                            onChange={this.valueChanged}
                        />
                        {/*--EMAIL error  */}
                        {
                            (this.state.msg.emailErr) &&
                            <label
                                className="error alert alert-danger"
                            >
                                {this.state.msg.emailErr}
                            </label>
                        }
                        <br/>
                        <label htmlFor="">First Name</label><br/>
                        <input
                            type="text"
                            name='firstName'
                            className="firstName"
                            defaultValue={this.props.user.firstName}
                            placeholder={this.props.user.firstName}
                            onChange={this.valueChanged}
                        />
                        <br/>
                        <label htmlFor="">Last Name</label><br/>
                        <input
                            type="text"
                            name='lastName'
                            className="lastName"
                            defaultValue={this.props.user.lastName}
                            placeholder={this.props.user.lastName}
                            onChange={this.valueChanged}
                        />
                        <br/>
                        <label htmlFor="">Phone Number</label><br/>
                        <input
                            type="text"
                            name='phone'
                            className="phone"
                            defaultValue={this.props.user.phone}
                            placeholder={this.props.user.phone}
                            onChange={this.valueChanged}
                        />
                        <br/><br/>
                        <button
                            type="submit"
                            name="submit_profile_change btn btn-success btn-sm"
                            className="submit_profile"
                        >
                            Change
                        </button>
                    </form>
                </div>
                {/*----------------[ Password change ] --------------------- */}
                <div className="passChange">
                    <label className="Pas_Change">Password</label>
                    <br/>
                    <form
                        method="POST"
                        action='/users/newPassword'
                        className="profile_forms"
                        onSubmit={(ev) => this.updateUser(ev, '/user/newPassword')}
                    >
                        <br/>
                        <label htmlFor="">Old Password</label><br/>
                        <input type="password" name='password' className="password" placeholder='Old Password'/>
                        <br/>
                        <label htmlFor="">New Password</label><br/>
                        <input
                            type="password"
                            name='new_password'
                            className="password"
                            placeholder='New Password'
                        />
                        {
                            (this.state.msg && this.state.msg.erPassword) &&
                            <label
                                className="error alert alert-danger"
                            >
                                {this.state.msg.erPassword}
                            </label>
                        }

                        {
                            //--Password change success
                            (this.state.msg && this.state.msg.passChanged) &&
                            <label
                                className='success alert alert-success'
                            >
                                {this.state.msg.passChanged}
                            </label>
                        }
                        <br/> <br/>
                        <button
                            type="submit"
                            name="submitPassChange"
                            className="submit_profile btn btn-success btn-sm"
                        >
                            Change
                        </button>
                    </form>
                </div>
                {/*----------------[ Delete Your Account ] --------------------- */}
                <div className="deleteAccount">
                    <label
                        className="Pas_Change"
                    >
                        <h4
                            style={{color: 'red'}}
                        >
                            Delete Your Account
                        </h4>
                        <br/>
                    </label>
                    <form
                        method="POST"
                        action='/users/deleteUser'
                        className="profile_forms"
                        onSubmit={(ev) => this.updateUser(ev, '/user/deleteUser')}
                    >
                        <br/>
                        <label htmlFor="">Type in your email to confirm account deletion.</label><br/>
                        <input type="text" name='email' className="email"/>
                        {
                            this.state.msg.emailErr &&
                            <label className="error alert alert-danger">{this.state.msg.emailErr}</label>
                        }
                        <br/>
                        <label htmlFor="">Also, type in your password.</label><br/>
                        <input type="password" name='password' className="password"></input>
                        {
                            this.state.msg.errorPassword &&
                            <label className="error alert alert-danger">{this.state.msg.errorPassword}</label>
                        }
                        {
                            this.state.msg.acDeleted &&
                            <label
                                className='success'
                                style={{color: 'green'}}
                            >
                                {this.state.msg.acDeleted}
                            </label>
                        }

                        <br/>
                        <button
                            type="submit"
                            name="submitDelete"
                            className="submit_profile btn btn-danger btn-sm"
                        >
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        )

    };

    render() {
        return (
            this.localSection()
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {...state.userReducer}
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (path, params) => {
            dispatch(updateUserData(path, params))
        },
        dellMessages: () => {
            dispatch({'type': 'DELL_ALL_MSG'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))