import * as api from '../api/index.js';

export const getPost = async (id) => {
   try {
      const { post } = await api.getPost(id).then(res => res.data);
      return post;
   }
   catch (error) {
      console.log(error);
   }
}

export const makePost = async (formData) => {
   try {
      return await api.makePost(formData);
   } catch (error) {
      console.log(error);
   }
}

export const updateComments = async (id, post)  => {
   try {
      await api.updateComments(id, post);

   } catch (error) {
      console.log(error);
   }
}
