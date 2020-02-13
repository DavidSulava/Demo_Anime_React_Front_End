function userReducer( state = {  user:[], msg:[] }, action )
    {
        switch (action.type)
            {

                case ('USER_SESS_EXISTS'):
                case ('REG_SUCCESS' ):
                    {
                        state = { ...state, 'user': action.user };
                        return state
                    }
                case 'USER_SESS_NO':
                    {
                        state = { ...state, 'user': null };
                        return state
                    }
                case 'REG_ERROR':
                    {
                        state = { ...state, 'msg': action.msg };
                        return state
                    }
                case 'SUCCESS_MSG':
                    {
                        state = { ...state, 'msg': action.msg };
                        return state
                    }
                case 'DELL_USER':
                        {
                            state = { ...state, 'user': null };
                            return state
                        }
                case 'DELL_ALL_MSG':
                    {
                        state = { ...state, 'msg': [] };
                        return state
                    }


                default:
                    return state
            }
    }


export default userReducer;