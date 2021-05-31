import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
   if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
   }
   return req;
});

export const signIn = (formData) => API.post('/user/signin', formData);

export const signUp = (formData) => API.post('/user/signup', formData);

export const updateClasses = (id, updatedUser) => API.patch(`/user/${id}`, updatedUser);

export const updateGroups = (id, updatedUser) => API.patch(`/user/groups/${id}`, updatedUser);

export const leaveGroup = (id, updatedUser) => API.patch(`/user/groups/leave/${id}`, updatedUser);

export const getUser = (id) => API.get(`/user/users/${id}`);

export const getProfiles = () => API.get('/user/users');

export const getGroup = (id) => API.get(`/group/${id}`);

export const makeGroup = (formData) => API.post('/group/groups', formData);

export const updatePosts = (id, updatedGroup) => API.patch(`group/posts/${id}`, updatedGroup);

export const updateMembers = (id, updatedGroup) => API.patch(`group/members/${id}`, updatedGroup);

export const removeMember = (id, updatedGroup) => API.patch(`group/members/leave/${id}`, updatedGroup);

export const updateFriends = (id, updatedUser) => API.patch(`user/friends/${id}`, updatedUser);

export const getFriendReqs = (id) => API.get(`/friends/reqs/${id}`);

export const getPost = (id) => API.get(`/post/${id}`);

export const makePost = (formData) => API.post('/post/posts', formData);

export const updateComments = (id, updatedPost) => API.patch(`post/comments/${id}`, updatedPost);

export const sendFriendReq = (formData) => API.post('/friends/reqs', formData);

export const editProfile = (id, updatedProfile) => API.patch(`/user/user/${id}`, updatedProfile);

export const getAllGroups = () => API.get('group/groups/all');
