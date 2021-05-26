import * as api from '../api/index.js';

export const sendFriendReq = async (formData) => {
   try {
      return await api.sendFriendReq(formData);
   } catch (error) {
      console.log(error);
   }
}