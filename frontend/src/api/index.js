import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const signIn = (formData) => API.post('/user/signin', formData);

export const signUp = (formData) => API.post('/user/signup', formData);

export const updateUser = (id, updatedUser) => API.patch(`/user/${id}`, updatedUser);

export const getUser = (id) => API.get(`/user/users/${id}`);

export const getProfiles = () => API.get('/user/users');

export const getGroup = (id) => API.get(`/group/${id}`);
