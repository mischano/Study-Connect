import {
    ADDCLASS, ADDFRIEND, ADDGROUP, AUTH, EDITPROFILE, LEAVEGROUP, REMOVEFRIEND
} from '../constants/actionTypes.js';
import * as api from '../api/index.js'

// get the user from the database, and dispatch it to local storage
export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });
        history.push('/dashboard');
    } catch (error) {
        alert(error.response.data.message);
    }
}

// put the user in the database, and dispatch it to local storage
export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        history.push('/signup2');
    } catch (error) {
        alert(error.response.data.message);
    }
}

// uodate classes in database, and dispatch the action
export const updateClasses = (id, classes, history) => async (dispatch) => {
    try {
        await api.updateClasses(id, classes);
        dispatch({ type: ADDCLASS, data: classes });
        history.push('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

// update the user's groups in the database as well as locally
export const updateGroups = (id, groups) => async (dispatch) => {
    try {
        await api.updateGroups(id, groups);
        dispatch({ type: ADDGROUP, data: groups });
    } catch (error) {
        console.log(error);
    }
}

// remove the group from the user's groups in database and locally
export const leaveGroup = (id, group, history) => async (dispatch) => {
   try {
      const user = await api.leaveGroup(id, group);
      dispatch({ type: LEAVEGROUP, data: group.data });
      history.push('/groups');
   } catch (error) {
      console.log(error);
   }
}

// get the user from database, using their id
export const getUser = async (id) => {
    try {
        const { user } = await api.getUser(id).then(res => res.data);
        return user;
    }
    catch (error) {
        console.log(error)
    }
}

// update the user's friends, DB and local
export const updateFriends = (id, friends) => async (dispatch) => {
   try {
        await api.updateFriends(id, friends);
        dispatch({ type: ADDFRIEND, data: friends });
    } catch (error) {
        console.log(error);
    }
}

// remove the user's friends based on ID, local and DB
export const removeFriend = (id, friends, history) => async (dispatch) => {
   try {
      await api.removeFriend(id, friends);
      dispatch({ type: REMOVEFRIEND, data: friends.data });
      history.push('/profile');
   } catch (error) {
      console.log(error);
   }
}

// update the appropriate fields of the user's profile
export const editProfile = (id, formData) => async (dispatch) => {
    try {
        await api.editProfile(id, formData);
        dispatch({ type: EDITPROFILE, data: formData });
    } catch (error) {
        console.log(error);
    }
}