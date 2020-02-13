export const checkUserSession = ( path ='/users/checkUser' )=>
    {
        return ( dispatch , getState )=>
            {
                //async stuff
                (async ()=>
                    {
                        let corsAPI = `${process.env.REACT_APP_DATA_API}${path}` ;
                        // let r_body  = getParams

                        const myHeaders = {
                                                method : 'GET',
                                                headers: {
                                                    // 'Content-Type': 'application/x-www-form-urlencoded',
                                                    'X-Requested-With': 'XMLHttpRequest',
                                                },
                                                credentials: 'include',
                                                // body   : r_body
                                          };

                        const response  = await fetch( corsAPI, myHeaders );

                        var data = '';
                        if ( response.status >= 200 && response.status <= 299 )
                            {
                                data    = await response.json();

                                if ( data && data.user )
                                    {
                                        dispatch( { 'type': 'USER_SESS_EXISTS', 'user': data.user } )
                                    }
                                else
                                    dispatch( { 'type': 'USER_SESS_NO', 'user': null } )

                            }
                        else
                            {
                                // let regErrors = await response.json();

                                dispatch( { 'type': 'USER_SESS_NO', 'user': null } )
                            }



                    })();


            }
    }