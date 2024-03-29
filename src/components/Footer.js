import React, {Component, useState, useEffect, useRef,} from 'react'
import {connect} from 'react-redux'
import {getUser} from '../store/actions/getUser'
import EmailForm from './subComponents/sendEmailForm';

const FooterComp = (props) => {
    const [state, setState] = useState({
        ...props,
        showForm: false,
    })

    const refs = useRef();

    useEffect(() => {

        if (props.msg)
            setState({...state, msg: props.msg})
    }, [props.msg])

    const sendMessage = (ev) => {
        ev.preventDefault();

        const inputEm = refs.current.email;
        const emailErr = refs.current.email_error;
        const messageEm = refs.current.comment;
        const messErr = refs.current.comment_error;

        if (!inputEm.checkValidity()) {
            emailErr.innerText = inputEm.validationMessage;

        } else if (inputEm.value === '') {
            emailErr.innerText = 'Email fild cannot be empty!';

        } else if (messageEm.value === '') {
            emailErr.innerText = '';
            messErr.innerText = 'Massege fild cannot be empty!';

        } else {
            emailErr.innerText = '';
            messErr.innerText = '';

            var formData = new FormData(ev.target);

            props.sendEmail('/users/contact/email', formData)
        }

    };
    const showForm = (ev) => {
        setState({
            ...state,
            showForm: !state.showForm
        })
    };

    return (
        <footer>
            <div className="footer_wrapper">
                {
                    state.showForm &&
                    <div className="emessageWrap container-fluid">
                        <EmailForm
                            {...state}
                            ref={refs}
                            sendMessage={sendMessage}
                            showForm={showForm}
                        />
                    </div>
                }

                <div className="disc">
                    <p className="contact">
                        <span>Contact as :</span>
                        <span
                            className="contact_send-icon"
                            onClick={showForm}
                            title="Click to send a message"
                        >
              ✉
            </span>
                    </p>
                    <p className="f_2">
            <span>
              Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties.
            </span>
                    </p>
                </div>
            </div>
        </footer>
    )

}

const mapStateToProps = (state) => {
    return {...state.userReducer}
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendEmail: (path, params) => {
            dispatch(getUser(path, params))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterComp)