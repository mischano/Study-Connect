import {
    AUTH, LOGOUT, ADDCLASS, ADDGROUP,
    ADDFRIEND, REMOVEFRIEND, EDITPROFILE, LEAVEGROUP
} from '../constants/actionTypes';


// reducer used for the user

const authReducer = (state = { authData: null }, action) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };

        // clear local storage on logout
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: action?.data };

        // add class to local storage
        case ADDCLASS:
            user.result.classes = user.result.classes.concat(action?.data);
            localStorage.setItem('profile', JSON.stringify(user));
            return { ...state, authData: action?.data };

        // add a group to the local storage
        case ADDGROUP:
            user.result.groups = user.result.groups.concat(action?.data);
            localStorage.setItem('profile', JSON.stringify(user));
            return { ...state, authData: action?.data };

        // add a friend to the user's friend's list
        case ADDFRIEND:
            user.result.friends = user.result.friends.concat(action?.data);
            localStorage.setItem('profile', JSON.stringify(user));
            return { ...state, authData: action?.data };

        // removed a friend from the friend's list
        case REMOVEFRIEND:
            user.result.friends = user.result.friends.filter(friend => friend !== action?.data);
            localStorage.setItem('profile', JSON.stringify(user));
            return { ...state, authData: action?.data };

        // update user profile information
        case EDITPROFILE:
            user.result.name = action?.data.name;
            user.result.email = action?.data.email;
            user.result.major = action?.data.major;
            user.result.gradDate = action?.data.gradDate;
            user.result.bio = action?.data.bio;
            user.result.avatar = action?.data.avatar;

            localStorage.setItem('profile', JSON.stringify(user));
            return { ...state, authData: action?.data };

        // removes a group frm the user's list of groups
        case LEAVEGROUP:
            user.result.groups = user.result.groups.filter(group => group !== action?.data)
            localStorage.setItem('profile', JSON.stringify(user));
            return { ...state, authData: action?.data };

        default:
            return state;
    }
};

export default authReducer;
