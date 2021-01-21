/* eslint-disable no-return-await */
import http from '../http';

export default {
  addTasks: () => {},
  getTasks: () => {
    return http.get('/get-checklists');
  },
  getTaskById: () => {},
  updateTasks: () => {},
  delteTasks: () => {},
};
