import * as api from '../api/index.js';

// add a new friend request to the database
export const sendFriendReq = async (formData) => {
   try {
      return await api.sendFriendReq(formData);
   } catch (error) {
      console.log(error);
   }
}

// get a friend request from the database
export const getFriendReqs = async (id) => {
   try {
      const { reqs } = await api.getFriendReqs(id).then(res => res.data);
      return reqs;
   } catch (error) {
      console.log(error);
   }
}

// update the friend request in the database
export const updateFriendReq = async (id, updatedStatus) => {
   try {
      await api.updateFriendReq(id, updatedStatus);
   } catch (error) {
      console.log(error);
   }
}