export const getMovie = (getParams = '') => {
    return async (dispatch, getState) => {
        //async stuff

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
                dispatch({ 'type': 'ADD_M_DATA', 'movie': data });
            }
            else{
                dispatch({ 'type': 'ADD_M_DATA', 'movie':[] });
            };

        } catch (error) {
            console.log('----', error);
        }

    }
}