import {
    ADDCLASS, ADDFRIEND, ADDGROUP, AUTH, EDITNAME,
    EDITMAJOR, EDITEMAIL, LEAVEGROUP
} from '../constants/actionTypes.js';
import * as api from '../api/index.js'

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });
        history.push('/dashboard');
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        history.push('/signup2');
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const updateClasses = (id, classes, history) => async (dispatch) => {
    try {
        await api.updateClasses(id, classes);
        dispatch({ type: ADDCLASS, data: classes });
        history.push('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

export const updateGroups = (id, groups) => async (dispatch) => {
    try {
        await api.updateGroups(id, groups);
        dispatch({ type: ADDGROUP, data: groups });
    } catch (error) {
        console.log(error);
    }
}

export const leaveGroup = (id, group, history) => async (dispatch) => {
   try {
      const user = await api.leaveGroup(id, group);
      console.log(user.data);
      dispatch({ type: LEAVEGROUP, data: group.data });
      history.push('/groups');
   } catch (error) {
      console.log(error);
   }
}

export const getUser = async (id) => {
    try {
        const { user } = await api.getUser(id).then(res => res.data);
        return user;
    }
    catch (error) {
        console.log(error)
    }
}
export const updateFriends = (id, friends) => async (dispatch) => {
    try {
        await api.updateFriends(id, friends);
        dispatch({ type: ADDFRIEND, data: friends });
    } catch (error) {
        console.log(error);
    }
}

export const editName = (id, name) => async (dispatch) => {
    try {
        await api.editName(id, name);
        dispatch({ type: EDITNAME, data: name.data });
    } catch (error) {
        console.log("Error: frontend -> src -> actions -> auth.js: line 64");
    }
}

export const editMajor = (id, major) => async (dispatch) => {
    try {
        await api.editMajor(id, major);
        dispatch({ type: EDITMAJOR, data: major.data });
    } catch (error) {
        console.log("Error: frontend -> src -> actions -> auth.js: line 73");
    }
}
