import API from "../api/api";

export const GetUserDetail = async () => {
  try {
    const response = await API.get('/userinfo/GetUserDetail');

    return response.data;
  } catch (error) {
    console.error(
      'GetUserDetail API Error:',
      error.response?.data || error.message
    );

    throw error;
  }
};