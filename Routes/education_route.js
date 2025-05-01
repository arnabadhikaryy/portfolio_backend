import express from 'express'
import education_details_upload from '../controlers/education_related/education_details.js';
import deleteEducationDetails from '../controlers/education_related/delete_education_details.js';
import multer from 'multer'
import getAllEducationDetails from '../controlers/education_related/get_all_education.js';
const upload = multer({ dest: 'uploads/' })



const education_route = express.Router();




education_route.post('/upload',upload.single('coures_certificate_image'), education_details_upload)
education_route.delete('/delete',deleteEducationDetails)

education_route.get('/get',getAllEducationDetails)






export default education_route;