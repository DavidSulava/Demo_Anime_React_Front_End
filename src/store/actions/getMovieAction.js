export const getMovie = (getParams = '') => {
    return (dispatch, getState) => {
        //async stuff
       (async () => {
            let corsAPI = (getParams === '') ? `${process.env.REACT_APP_DATA_API}/media` : `${process.env.REACT_APP_DATA_API}/media?${getParams}`;


            const myHeaders = {
                method : 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'include',
            };

            const response  = await fetch( corsAPI, myHeaders )
            let data        = await response.json();

            if ( data ){
                dispatch({ 'type': 'ADD_M_DATA', 'movie': data });
            }
            else{
                dispatch({ 'type': 'ADD_M_DATA', 'movie':[] });
            };

        })().catch(err=>console.log('----', err));


    }
}