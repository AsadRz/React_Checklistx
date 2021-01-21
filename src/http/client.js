import axios from 'axios';

const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND,
  baseURL: 'https://1pd8etyyc1.execute-api.us-east-2.amazonaws.com/dev',
});

// Add a response interceptor
// axios.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   return Promise.reject(error);
// });

export default instance;
