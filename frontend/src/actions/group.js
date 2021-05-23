import * as api from '../api/index.js';

export const getGroup = async (id) => {
   try {
      const { group } = await api.getGroup(id).then(res => res.data);
      return group;
   }
   catch (error) {
      console.log(error);
   }
}
export const makeGroup = async (formData) => {
   try {
      return await api.makeGroup(formData);
   } catch (error) {
      console.log(error);
   }
}
