import { AUTH, LOGOUT, ADDCLASS, ADDGROUP } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
   switch (action.type) {
      case AUTH:
         localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
         return { ...state, authData: action?.data };

      case LOGOUT:
         localStorage.clear();
         return { ...state, authData: action?.data };

      case ADDCLASS:
         const user = JSON.parse(localStorage.getItem('profile'));
         user.result.classes = user.result.classes.concat(action?.data);
         localStorage.setItem('profile', JSON.stringify(user));
         return { ...state, authData: action?.data };

      case ADDGROUP:
         const person = JSON.parse(localStorage.getItem('profile'));
         person.result.groups = person.result.groups.concat(action?.data);
         localStorage.setItem('profile', JSON.stringify(person));
         return { ...state, authData: action?.data };

      default:
         return state;
   }
};

export default authReducer;