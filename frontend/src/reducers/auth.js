import { AUTH, LOGOUT, ADDCLASS, ADDGROUP, ADDFRIEND, LEAVEGROUP } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
   const user = JSON.parse(localStorage.getItem('profile'));
   switch (action.type) {
      case AUTH:
         localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
         return { ...state, authData: action?.data };

      case LOGOUT:
         localStorage.clear();
         return { ...state, authData: action?.data };

      case ADDCLASS:
         user.result.classes = user.result.classes.concat(action?.data);
         localStorage.setItem('profile', JSON.stringify(user));
         return { ...state, authData: action?.data };

      case ADDGROUP:
         user.result.groups = user.result.groups.concat(action?.data);
         localStorage.setItem('profile', JSON.stringify(user));
         return { ...state, authData: action?.data };

      case ADDFRIEND:
         user.result.friends = user.result.friends.concat(action?.data);
         localStorage.setItem('profile', JSON.stringify(user));
         return { ...state, authData: action?.data };

      case LEAVEGROUP:
         user.result.groups = user.result.groups.filter(group => group !== action?.data)
         localStorage.setItem('profile', JSON.stringify(user));
         return { ...state, authData: action?.data };

      default:
         return state;
   }
};

export default authReducer;