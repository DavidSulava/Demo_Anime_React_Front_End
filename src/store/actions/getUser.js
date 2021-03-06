export const getUser = (path = '/user/login', getParams = '') => {
    return async (dispatch, getState) => {
        //async stuff

        let corsAPI = `${process.env.REACT_APP_LOGIN_SERVER_API}${path}`;
        let r_body  = getParams;

        let authToken = getState().userReducer.accessToken?
                            `Bearer ${getState().userReducer.accessToken}`
                            : '';

        const myHeaders = {
            method : 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization'   : authToken
            },
            credentials : 'include',
            body        : r_body
        };

        const response = await fetch(corsAPI, myHeaders);

        if ( response.status >= 200 && response.status <= 299 ) {

            var data = await response.json();

            if ( data.success ) {
                dispatch({'type': 'REG_SUCCESS', 'user': data.user});
                dispatch({'type': 'SET_ACCESS_TOKEN', 'accessToken': data.user.accessToken});
                dispatch({'type': 'SET_ACCESS_EXPIRES_AT', 'accessTokenExpiresAt' : data.user.accessTokenExpiresAt});
                dispatch({'type': 'SUCCESS_MSG', 'msg': data.success });
            } else if (data.msg && data.msg.contact) {
                dispatch({ 'type': 'SUCCESS_MSG', 'msg': data.msg })
            } else if ( data.msg && data.msg.userDeleted ) {
                dispatch({ 'type': 'DELL_USER' });
            };
        } else if ( response.status === 401 ) {
            let regErrors = await response.json();
            dispatch({ 'type': 'REG_ERROR', 'msg': regErrors });
            dispatch({ 'type': 'DELL_USER' });
        }
    }
}