import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/auth',
});

export const googleauth = (code) => api.post(`/google?code=${code}`);
