export const updateUserData = (path = '', formData ) => {
    return async (dispatch, getState) => {
        //async stuff

        let corsAPI = `${process.env.REACT_APP_LOGIN_SERVER_API}${path}`;

        let r_body = formData;
            r_body.append('currentEmail', getState().userReducer.user.email )

        let authToken = getState().userReducer.accessToken?
                            `Bearer ${getState().userReducer.accessToken}`
                            : '';

        const myHeaders = {
            method : 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': authToken
            },
            credentials : 'include',
            body        : r_body
        };

        const response = await fetch(corsAPI, myHeaders);

        if (response.status >= 200 && response.status <= 299) {

            var data = await response.json();

            if ( data.user ) {
                dispatch({'type': 'REG_SUCCESS', 'user': data.user});
                dispatch({'type': 'SUCCESS_MSG', 'msg' : data.msg });
            } else if ( data.msg && (!data.user || !data.msg.userDeleted ) ) {
                dispatch({ 'type': 'SUCCESS_MSG', 'msg': data.msg })
            } else if (data.msg && data.msg.userDeleted) {
                dispatch({ 'type': 'DELL_USER' });
            };
        } else if (response.status === 401) {
            let regErrors = await response.json();
            dispatch({ 'type': 'REG_ERROR', 'msg': regErrors });
            dispatch({ 'type': 'DELL_USER' });
        }
    }
}