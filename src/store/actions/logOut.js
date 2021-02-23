export const logOut = (path = '/user/logOut') => {
    return async (dispatch, getState) => {
        //async stuff

        let corsAPI = `${process.env.REACT_APP_LOGIN_SERVER_API}${path}`;

        const myHeaders = {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${getState().userReducer.accessToken}`
            },
            credentials : 'include',
            body        : JSON.stringify( getState().userReducer.user )
        };

        const response = await fetch(corsAPI, myHeaders);

        if (response.status === 200  ) {

            var data = await response.json();

            if (data && data.user) {
                dispatch({'type': 'USER_EXIST', 'user': data.user})
            } else
                dispatch({ 'type': 'DELL_USER' });

        } else {
            dispatch({ 'type': 'DELL_USER' });
        }

    }
}