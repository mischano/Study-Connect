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

export const updatePosts = async (id, post)  => {
   try {
      await api.updatePosts(id, post);

   } catch (error) {
      console.log(error);
   }
}

export const updateMembers = async (id, members)  => {
   try {
      await api.updateMembers(id, members);

   } catch (error) {
      console.log(error);
   }
}

export const removeMember = async (id, members)  => {
   try {
      await api.removeMember(id, members);

   } catch (error) {
      console.log(error);
   }
}
