
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save string directly, objects as JSON
export const saveData = async (key, value) => {
    try {
        const data =
            typeof value === 'string'
                ? value
                : JSON.stringify(value);

        await AsyncStorage.setItem(key, data);
        return true;

    } catch (error) {
        console.log('Storage Save Error:', error);
        return false;
    }
};

// Get data and automatically parse JSON objects
export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);

        if (value === null) return null;

        try {
            return JSON.parse(value);
        } catch {
            return value;
        }

    } catch (error) {
        console.log('Storage Get Error:', error);
        return null;
    }
};

// Remove specific data
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;

    } catch (error) {
        console.log('Storage Remove Error:', error);
        return false;
    }
};

// Clear all storage
export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
        return true;

    } catch (error) {
        console.log('Storage Clear Error:', error);
        return false;
    }
};

// JWT-specific helper functions
export const saveToken = async (token) => {
    return await saveData('token', token);
};

export const getToken = async () => {
    return await AsyncStorage.getItem('token');
};

export const removeToken = async () => {
    return await AsyncStorage.removeItem('token');
};
