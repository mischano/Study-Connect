import { AUTH, LOGOUT, ADDCLASS } from '../constants/actionTypes';

const initialState = {
    name: '',
    id: '',
    email: '',
    password: '',
    school: '',
    major: '',
    gradDate: '',
    friends: [],
    classes: [],
    token: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data }))
            return { ...state,
                name: action?.data.result.name,
                id: action?.data.result.id,
                email: action?.data.result.email,
                password: action?.data.result.password,
                school: action?.data.result.school,
                major: action?.data.result.major,
                gradDate: action?.data.result.gradDate,
                token: action?.data.token,
            };

        case LOGOUT:
            localStorage.clear();
            return { ...state, state: initialState };

        case ADDCLASS:
            console.log(action.data)

            return { ...state, classes: state.classes.concat(action?.data)};
        default:
            return state;
    }
};

export default authReducer;