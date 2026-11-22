// import axios from 'axios';

// const API = axios.create({
//     baseURL: 'http://10.213.133.96:5000/api',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// export default API;

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
    baseURL: 'http://172.18.140.96:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Automatically attach token to every request
API.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        } catch (error) {
            console.log('Token retrieval error:', error);
            return config;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;
