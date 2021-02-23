
let attempts = 0;

export const getTokensSilently  = ( path = '/user/get_new_tokens' ) => {


    return async (dispatch, getState) => {
        //async stuff

        let corsAPI  = `${process.env.REACT_APP_LOGIN_SERVER_API}${path}`;

        let authToken = getState().userReducer.accessToken?
                            `Bearer ${getState().userReducer.accessToken}`:
                            '';

        const myHeaders = {
            method : 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization'   : authToken
            },
            credentials: 'include',
        };

        const response = await fetch(corsAPI, myHeaders);

        if ( response.status === 200  ) {
            attempts = 0;
            let data = await response.json();

            if ( !data || !data.accessToken || !data.accessTokenExpiresAt) {
                dispatch({'type': 'USER_NO', 'user': null });
            }

            dispatch({'type': 'SET_ACCESS_TOKEN', 'accessToken': data.accessToken});
            dispatch({'type': 'SET_ACCESS_EXPIRES_AT', 'accessTokenExpiresAt' : data.accessTokenExpiresAt});

        } else if(response.status === 401){

            attempts += 1;

            if( attempts >= 2 )
                dispatch({ 'type': 'DELL_USER' });
            else
                dispatch( getTokensSilently());

        } else {
            dispatch({ 'type': 'DELL_USER' });
        }

    }
}