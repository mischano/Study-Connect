import { AUTH, LOGOUT, ADDCLASS } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data }))
            return { ...state, authData: action?.data};

        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: action?.data};

        case ADDCLASS:
            const user = JSON.parse(localStorage.getItem('profile'));
            user.result.classes = user.result.classes.concat(action?.data);
            localStorage.setItem('profile', JSON.stringify(user));
            return { ...state, authData: action?.data};
            
        default:
            return state;
    }
};

export default authReducer;