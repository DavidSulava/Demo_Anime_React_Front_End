

function rootReducer( state = { movie: [], filter:[] , article:[]}, action )
    {
        switch (action.type)
            {
                case 'ADD_M_DATA':
                    {
                        state = { ...state, 'movie': action.movie };
                        return state
                    }
                case 'DELL_M_DATA':
                    {
                        state = { ...state, 'movie': [] };
                        return state
                    }
                case 'ADD_M_FILTER':
                    {
                        state = { ...state, 'filter': action.filter };
                        return state
                    }
                case 'ADD_SEARCH':
                    {
                        state = { ...state, 'search': action.search };
                        return state
                    }
                case 'ADD_M_ARTICLE':
                        {
                            state = { ...state, 'article': action.article };
                            return state
                        }

                default:
                    return state
            }
    }


export default rootReducer;
