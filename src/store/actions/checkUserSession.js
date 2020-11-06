export const checkUserSession = (path = '/users/checkUser') => {
    return async (dispatch, getState) => {
        //async stuff

        let corsAPI = `${process.env.REACT_APP_DATA_API}${path}`;

        const myHeaders = {
            method : 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'include',
        };

        const response = await fetch(corsAPI, myHeaders);

        if (response.status === 200  ) {

            var data = await response.json();

            if (data && data.user) {
                dispatch({'type': 'USER_SESS_EXISTS', 'user': data.user})
            } else
                dispatch({'type': 'USER_SESS_NO', 'user': null })

        } else {
            dispatch({ 'type': 'USER_SESS_NO', 'user': null })
        }




    }
}