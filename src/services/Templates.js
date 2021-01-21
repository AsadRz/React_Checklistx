/* eslint-disable no-return-await */
import http from '../http';

export default {
    addTemplates: () => { },
    getTemplates: () =>
    {
        // console.log("in here");
        return http.get('/get-templates');
    },
    getTemplateById: () => { },
    updateTemplates: () => { },
    deleteTemplates: () => { },
};
