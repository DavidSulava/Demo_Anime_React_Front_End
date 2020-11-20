export const getMovie = (getParams = '') => {
    return async (dispatch, getState) => {

        if(getParams.hasOwnProperty('page'||'Type'))
            getParams = Object.keys(getParams).map( oKey=> oKey+'='+getParams[oKey] ).join('&')

        let corsAPI = (getParams === '') ? `${process.env.REACT_APP_DATA_API}/media` : `${process.env.REACT_APP_DATA_API}/media?${getParams}`;

        const myHeaders = {
            method : 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'include',
        };


        try {
            const response  = await fetch( corsAPI, myHeaders );
            let data        = await response.json();

            if ( data.data ){
                dispatch({ 'type': 'SET_M_GET_PARAM', 'getParam': data.params });
                dispatch({ 'type': 'ADD_M_DATA', 'movie': data });
            }
            else{
                dispatch({ 'type': 'SET_M_GET_PARAM', 'getParam': null });
                dispatch({ 'type': 'ADD_M_DATA', 'movie':[] });
            };

        } catch (error) {
            console.log('----', error);
        }

    }
}