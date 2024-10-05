import{FETCH_USER_SUCCESS,FETCH_USER_LOGIN,FETCH_USER_ERROR, USER_LOGOUT, USER_REFRESH} from '../actions/userAction'

const INITIAL_STATE = {

    account: {
        email: localStorage.getItem('email') || '',
        token: localStorage.getItem('authToken') || '',
        role: localStorage.getItem('role') || '',
        auth: localStorage.getItem('authToken') ? true : null 
    },
    isLoading: false,
    isError:false
};

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_USER_LOGIN:

           return {

             ...state,
             isLoading: true,
            isError:false

           };

        case FETCH_USER_ERROR:

           return {
              ...state, 
              account: {
                auth: false
              },
              isLoading: false,
              isError:true

           };
        case FETCH_USER_SUCCESS:
            // console.log("Check action: ",action);

        return {
            ...state,
            account: {
                email: action.data.email,
                token: action.data.token,
                role: action.data.role, 
                auth: true
            },
            isLoading: false,
            isError:false

        };
        case USER_LOGOUT:
            localStorage.removeItem('email')
            localStorage.removeItem('authToken')
            localStorage.removeItem('role')
            localStorage.removeItem('loginSuccessShown')
            return {
                ...state,
                account: {
                    email:'',
                    token:'',
                    role:'',
                    auth:false,
                },
            };
        case USER_REFRESH:    
            return {
                ...state,
                account: {
                    email:localStorage.getItem('email'),
                    token:localStorage.getItem('authToken'),
                    role:localStorage.getItem('role'),
                    auth: !!localStorage.getItem('authToken'),
                },
            };

         default: return state;

    }

};

export default userReducer;