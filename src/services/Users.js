/* eslint-disable no-return-await */
import http from '../http';

export default {
  addUsers: (payload) => {
    return http.post('add-user', payload);
  },
  getUsers: () => {
    // console.log("in here");
    return http.get('/get-users');
  },
  getUserById: () => {},
  updateUsers: () => {},
  deleteUsers: () => {},
};
