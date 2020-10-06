function userReducer( state = {  user:[], msg:[] }, action ){
    switch (action.type){

        case ('USER_SESS_EXISTS'):
        case ('REG_SUCCESS' ):{
            return  { ...state, 'user': action.user }
        }
        case 'USER_SESS_NO':{
            return { ...state, 'user': null }
        }
        case 'REG_ERROR':{
            return  { ...state, 'msg': action.msg }
        }
        case 'SUCCESS_MSG':{
            return { ...state, 'msg': action.msg }
        }
        case 'DELL_USER':{
            return { ...state, 'user': null }
        }
        case 'DELL_ALL_MSG':{
            return { ...state, 'msg': [] }
        }

        default:
            return state
    }
 }


export default userReducer;