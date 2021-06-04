import * as api from '../api/index.js';


// get the group from the database
export const getGroup = async (id) => {
   try {
      const { group } = await api.getGroup(id).then(res => res.data);
      return group;
   }
   catch (error) {
      console.log(error);
   }
}

// add the group to the database and return its ID
export const makeGroup = async (formData) => {
   try {
      return await api.makeGroup(formData);
   } catch (error) {
      console.log(error);
   }
}

// update the groups posts in the DB
export const updatePosts = async (id, post) => {
   try {
      await api.updatePosts(id, post);

   } catch (error) {
      console.log(error);
   }
}

// update a group's members in the DB
export const updateMembers = async (id, members) => {
   try {
      await api.updateMembers(id, members);

   } catch (error) {
      console.log(error);
   }
}

// remove a member from the Group in the DB
export const removeMember = async (id, members) => {
   try {
      await api.removeMember(id, members);

   } catch (error) {
      console.log(error);
   }
}
