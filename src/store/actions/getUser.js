export const getUser = ( path='', getParams='' )=>
    {
        return ( dispatch , getState )=>
            {
                //async stuff
                let m_data = (async ()=>
                    {
                        let corsAPI = `${process.env.REACT_APP_DATA_API}${path}` ;
                        // let r_body  = JSON.stringify(getParams)
                        let r_body  = getParams;

                        const myHeaders = {
                                                method : 'POST',
                                                headers: {
                                                    // 'Content-Type': 'application/x-www-form-urlencoded',
                                                    'X-Requested-With': 'XMLHttpRequest',
                                                },
                                                credentials: 'include',
                                                body   : r_body
                                          };

                        const response  = await fetch( corsAPI, myHeaders );

                        var data = '';
                        if ( response.status >= 200 && response.status <= 299 )
                            {
                                data    = await response.json();

                                if (data.msg && (data.msg.userUpdated || data.msg.regSuccess || data.msg.loginSuccess || data.msg.imgChanged ) )
                                    {
                                        dispatch( { 'type': 'REG_SUCCESS', 'user': data.user } );
                                        dispatch( { 'type': 'SUCCESS_MSG', 'msg' : data.msg  } )
                                    }
                                else if ( data.msg && data.msg.contact )
                                    {
                                        dispatch( { 'type': 'SUCCESS_MSG', 'msg' : data.msg  } )
                                    }
                                else if ( data.msg && data.msg.userDeleted )
                                    {
                                        dispatch( { 'type': 'DELL_USER' } );
                                    };
                            }
                        else if ( response.status === 401 )
                            {
                                let regErrors = await response.json();
                                dispatch( { 'type': 'REG_ERROR', 'msg': regErrors.msg } )
                            }



                    })();


            }
    }