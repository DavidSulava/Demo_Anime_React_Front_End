export const getSearch = (getParams = '') => {
    return (dispatch, getState) => {
        //async stuff
        (async () => {
            // --- [ reverse regex for edge browser ~~edge supports only  Lookahead ?~~ ] ---
            var pr_str  = getParams.split("").reverse().join("");
            var param   = 'title'.split("").reverse().join("");
            var pattern = new RegExp(`.*(?=\=${param}\?)`, "i");

            let searchLen = pattern.exec(pr_str);


            if (searchLen[0] && searchLen[0].length > 2) {
                let corsAPI = getParams === '' ? `${process.env.REACT_APP_DATA_API}/findAll?` : `${process.env.REACT_APP_DATA_API}/findAll?${getParams}`;

                const myHeaders = {
                    method : 'GET',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    credentials: 'include',
                };

                const response = await fetch(corsAPI, myHeaders);
                let data = await response.json();

                if (data && data.length) {
                    dispatch({ 'type': 'ADD_SEARCH', 'search': {data} });
                }
            } else
                dispatch({ 'type': 'ADD_SEARCH', 'search': {} });


        })().catch(err => console.log(err));


    }
}