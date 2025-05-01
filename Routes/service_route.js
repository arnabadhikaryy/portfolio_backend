import express from 'express'
import service_details from '../controlers/service_related/service_details.js';
import getAllServiceDetails from '../controlers/service_related/get_all_service.js';
import updateServiceDetails from '../controlers/service_related/update_service.js';

const service_route = express.Router();


service_route.post('/upload',service_details)
service_route.post('/update',updateServiceDetails)
service_route.get('/get',getAllServiceDetails)



export default service_route;