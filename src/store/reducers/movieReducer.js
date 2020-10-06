

function appMainReducer( state = { movie: [], filter:[] , article:[]}, action ){
    switch (action.type){
        case 'ADD_M_DATA':{
            return { ...state, 'movie': action.movie }
        }
        case 'DELL_M_DATA':{
            return { ...state, 'movie': [] }
        }
        case 'ADD_M_FILTER':{
            return { ...state, 'filter': action.filter }
        }
        case 'ADD_SEARCH':{
            return { ...state, 'search': action.search }
        }
        case 'ADD_M_ARTICLE':{
            return { ...state, 'article': action.article }
        }

        default:
            return state
    }
}


export default appMainReducer;
