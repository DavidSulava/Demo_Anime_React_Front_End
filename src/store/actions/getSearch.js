export const getSearch = ( getParams='' )=>
    {
        return ( dispatch , getState )=>
            {
                //async stuff
                (async ()=>
                    {
                        let searchLen = /(?<=title=).*/i.exec(getParams);

                        if(searchLen[0] && searchLen[0].length>2 )
                            {
                                let corsAPI = getParams ===''? `${process.env.REACT_APP_DATA_API}/findAll?`: `${process.env.REACT_APP_DATA_API}/findAll?${getParams}` ;

                                const myHeaders = {
                                                        method: 'GET',
                                                        headers:
                                                            {
                                                                'X-Requested-With': 'XMLHttpRequest',
                                                            },
                                                        credentials: 'include',
                                                };

                                const response  = await fetch( corsAPI, myHeaders );
                                let data        = await response.json();

                                if ( data && data.length )
                                    {
                                        dispatch({ 'type': 'ADD_SEARCH', 'search': { data } });
                                    }
                            }
                        else
                            dispatch({ 'type': 'ADD_SEARCH', 'search': { } });


                    })().catch(err=>console.log(err));


            }
    }