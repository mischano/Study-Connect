import * as api from '../api/index.js';

export const sendFriendReq = async (formData) => {
   try {
      return await api.sendFriendReq(formData);
   } catch (error) {
      console.log(error);
   }
}

export const getFriendReqs = async (id) => {
   try {
      const { reqs } = await api.getFriendReqs(id).then(res => res.data);
   } catch (error) {
      console.log(error);
   }
}