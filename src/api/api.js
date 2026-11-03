import axios from 'axios';

const API = axios.create({
    baseURL: 'http://10.213.133.96:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default API;