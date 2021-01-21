import http from '../http';

export default {
  addBuildings: (payload) =>
  {
    return http.post('add-building', payload);
  },
  getBuildings: () =>
  {
    return http.get('/get-buildings');
  },
  getBuildingById: () => { },
  updateBuildings: () => { },
  deleteBuildings: () => { },
};
