import * as api from '../api/index.js';

export const getGroup = async (id) => {
    try
    {
        const { group } = await api.getGroup(id).then(res => res.data);
        return group;
    }
    catch (error) {
        console.log(error);
    }
}
export const makeGroup = async (formData) => {
    try {
        const data = await api.makeGroup(formData);
        return data;
    } catch (error) {
        console.log(error);
    }
}
