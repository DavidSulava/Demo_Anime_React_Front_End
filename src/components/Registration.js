import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
// import  Recaptcha           from 'react-recaptcha'
import {getUser} from '../store/actions/getUser'

export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            form: {
                'name': '',
                'email': '',
                'firstName': '',
                'lastName': '',
                'phone': '',
                'password': '',
                'password_confirmation': ''
            }
        };
    }

    componentDidMount() {
        this.props.dellMessages();
    };

    componentDidUpdate(prevProps) {

        if (this.props.user) {
            this.props.history.push('/')
        }

        //--- Check Server Messages ----
        if (this.props.msg) {
            let currentMsg = Object.entries(this.props.msg).sort().toString();
            let prevMsg = Object.entries(prevProps.msg).sort().toString();

            if (currentMsg !== prevMsg)
                this.setState((state, props) => ({msg: {...props.msg}}));
        }
    };

    valueChanged = (ev) => {
        var ch_key = ev.target.name;
        var ch_val = ev.target.value

        this.setState({form: {...this.state.form, [ch_key]: ch_val}});
    };
    submForm = (ev) => {
        ev.preventDefault()
        const path = '/user/register'
        const formData = new FormData(ev.target);

        if (!this.validateInput(this.state.form)) return;
        // window.grecaptcha.reset();
        this.props.getData(path, formData);
    };
    validateInput = (form) => {
        const msg = {};

        if (!form.name)
            msg.errorUsername = "Username field is empty"
        if (!form.email)
            msg.emailErr = "Email field is empty"
        if (!form.password)
            msg.errorPassword = "Password field is empty"
        if (form.password !== form.password_confirmation)
            msg.errorPass_confirm = "Passwords do not match"

        this.setState((state, props) => ({msg: {...props.msg, ...msg}}));

        return !!(form.name && form.email && form.password && (form.password === form.password_confirmation))
    };
    regForm = () => {
        if (this.props.msg && this.props.msg.loginSuccess) {
            this.props.history.push("/");
            return null
        } else if (this.props.msg && this.props.msg.regSuccess) {
            const wrapperStyle = {height: '100vh', margin: '20px auto'};
            const alertStyle = {padding: '20px'}
            const element = (
                <div style={wrapperStyle}>
                    <div
                        style={alertStyle}
                        className="alert alert-success"
                        role="alert"
                    >
                        {this.props.msg.regSuccess}
                    </div>
                </div>
            );

            (function (props) {
                    setTimeout(() => {
                        props.history.push("/");
                    }, 3000);
                }
            )(this.props)

            return element;
        } else {
            return (
                <form
                    className="regForm"
                    action='users/register'
                    method="POST"
                    onSubmit={this.submForm}
                >
                    <div className="Registration">
                        {
                            (this.props.msg && this.props.msg.errorCred) &&
                            <div className="alert alert-danger">
                                {this.props.msg.errorCred}
                            </div>
                        }
                        <input type="hidden" name='sender' value=''/>
                        <br/>

                        <input
                            type="text"
                            name='name'
                            className="username"
                            placeholder="Username"
                            value={this.state.form.username}
                            onChange={this.valueChanged}
                        />
                        <br/>
                        {
                            (this.state.msg && this.state.msg.errorUsername) &&
                            <div className="alert alert-danger">
                                {this.state.msg.errorUsername}
                            </div>
                        }

                        <input
                            type="text"
                            name='email'
                            className="email"
                            placeholder="E-mail"
                            value={this.state.form.email}
                            onChange={this.valueChanged}
                        />
                        <br/>
                        {
                            (this.state.msg && this.state.msg.emailErr) &&
                            <div className="alert alert-danger">
                                {this.state.msg.emailErr}
                            </div>
                        }

                        <input
                            type="text"
                            name='firstName'
                            className="firstName"
                            placeholder="First Name" value={this.state.form.firstName}
                            onChange={this.valueChanged}
                        />
                        <br/>

                        <input
                            type="text"
                            name='lastName'
                            className="lastName"
                            placeholder="Last Name"
                            value={this.state.form.lastName}
                            onChange={this.valueChanged}
                        />
                        <br/>

                        <input
                            type="text"
                            name='phone'
                            className="phone"
                            placeholder="Phone Number"
                            value={this.state.form.phone}
                            onChange={this.valueChanged}
                        />
                        <br/><br/>

                        <input
                            type="password"
                            name='password'
                            placeholder="Password"
                            className="password"
                            value={this.state.form.password}
                            onChange={this.valueChanged}
                        />
                        {
                            (this.state.msg && this.state.msg.errorPassword) &&
                            <div className="alert alert-danger">
                                {this.state.msg.errorPassword}
                            </div>
                        }

                        <input
                            type="password"
                            name='password_confirmation'
                            placeholder="Confirm Password" className="pasConfirm"
                            value={this.state.form.password_confirmation}
                            onChange={this.valueChanged}
                        />
                        {
                            (this.state.msg && this.state.msg.errorPass_confirm) &&
                            <div className="alert alert-danger">
                                {this.state.msg.errorPass_confirm}
                            </div>
                        }
                        <br/>
                        {
                            (this.props.msg && this.props.msg.regSuccess && !this.props.errorCred) &&
                            <div className="alert alert-success" role="alert">
                                {this.props.regSuccess}
                            </div>
                        }

                        <br/>
                        {
                            (this.props.msg && this.props.msg.erCaptcha) &&
                            <div className="alert alert-danger">
                                {this.props.msg.erCaptcha}
                            </div>
                        }
                        {/* <Recaptcha
                         sitekey = { process.env.REACT_APP_RECAPCHA_KEY  }
                         render  = "explicit"
                         hl      = { window.navigator.userLanguage || window.navigator.language }
                         /> */}

                        <br/>
                        <button
                            type="submit"
                            name="submitReg"
                            className="submitRreg"
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
            )
        }
    }

    render() {
        return (
            <div>
                {this.regForm()}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {...state.userReducer}
};
const mapDispatchToProps = (dispatch) => {
    return {
        getData: (path, params) => {
            dispatch(getUser(path, params))
        },
        dellMessages: () => {
            dispatch({'type': 'DELL_ALL_MSG'})
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Registration));