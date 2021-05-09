import {ADDCLASS, AUTH} from '../constants/actionTypes.js'

import * as api from '../api/index.js'

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data});
        history.push('/')
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data});
        history.push('/signup3')
    } catch (error) {
        console.log(error);
    }
}

export const classAdder = (formData, history) => async (dispatch) => {
    try {
        dispatch({ type: ADDCLASS,  data: formData});
        history.push('/')
    } catch (error) {
        console.log(error);
    }
}
