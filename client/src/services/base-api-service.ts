import axios from 'axios';

export const currentUserStorageKey = 'current-user';

const http = axios.create({
  withCredentials: true,
  baseURL: 'https://justlaunched.xyz/api/v0'
});

http.interceptors.response.use(
  (response) => response.data,

  (error) => {
    const status = error?.response?.status;
    switch (status) {
      case 401:
        // 401 from API means unauthorized! redirect to login page
        localStorage.removeItem(currentUserStorageKey);
        window.location.replace('/login');
        break;
      case 404:
        // 404 resource not found
        window.location.replace('/404');
        break;
      case 403:
        // 403 forbidden!!
        window.location.replace('/403');
        break;
      default:
        break;
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default http;