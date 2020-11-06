
export const getArticle = (id)=> {

    return ( dispatch , getState )=>{

        //async stuff
        (async ()=>{

            let corsAPI = `${process.env.REACT_APP_DATA_API}/find/${id}`;

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

            if ( data._id ){
                dispatch({ 'type': 'ADD_M_ARTICLE', 'article': data });
            } else {
                dispatch({ 'type': 'ADD_M_ARTICLE', 'article':[] });
            };

        })().catch(err=>console.log(err));


    }
}