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
      return reqs;
   } catch (error) {
      console.log(error);
   }
}

export const updateFriendReq = async (id, updatedStatus) => {
   try {
      await api.updateFriendReq(id, updatedStatus);
   } catch (error) {
      console.log(error);
   }
}