export const getFilterCategories = ()=>
    {
        return ( dispatch , getState )=>
            {

                let state = getState()
                let filter_len = Object.keys(state.movieReducer.filter).length

                if( !filter_len )
                    {
                        //async stuff
                        (async ()=>
                            {
                                let corsAPI = `${process.env.REACT_APP_DATA_API}/filter`;

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
                                        let el_filter = (data)=>{ return data.filter( el=>{ return el!=='' && el!=='0' && el  } ) }

                                        let country = ()=>{ return { country: data[0].country[0]?  data[0].country[0].country : [] } };
                                        let genre   = ()=>{ return { genre  : data[0].genre[0]  ?  data[0].genre[0].genre     : [] } };
                                        let type    = ()=>{ return { type   : data[0].type[0]   ?  el_filter( data[0].type[0].media_type ) : [] } };
                                        let year    = ()=>{ return { year   : data[0].year[0]   ?  el_filter( data[0].year[0].years )      : [] } };

                                        dispatch({ 'type': 'ADD_M_FILTER', 'filter': {...country(), ...genre(), ...type(), year:  year().year.sort((a,b)=> b-a) } });
                                    }

                            })().catch(err=>console.log(err));
                    }

            }
    }