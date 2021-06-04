import * as api from '../api/index.js';

// get a post from the DB based on ID
export const getPost = async (id) => {
   try {
      const { post } = await api.getPost(id).then(res => res.data);
      return post;
   }
   catch (error) {
      console.log(error);
   }
}

// add a post to the post collection
export const makePost = async (formData) => {
   try {
      return await api.makePost(formData);
   } catch (error) {
      console.log(error);
   }
}

// update the comments of a post in the DB
export const updateComments = async (id, post) => {
   try {
      await api.updateComments(id, post);

   } catch (error) {
      console.log(error);
   }
}
