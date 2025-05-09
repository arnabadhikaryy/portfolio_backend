import express from 'express'
import education_details_upload from '../controlers/education_related/education_details.js';
import deleteEducationDetails from '../controlers/education_related/delete_education_details.js';
import multer from 'multer'
import getAllEducationDetails from '../controlers/education_related/get_all_education.js';
import are_you_authorized from '../middlewairs/are_you_autharize.js';
const upload = multer({ dest: 'uploads/' })



const education_route = express.Router();




education_route.post('/upload',upload.single('coures_certificate_image'), are_you_authorized ,education_details_upload)
education_route.delete('/delete',  are_you_authorized  ,deleteEducationDetails)

education_route.get('/get',getAllEducationDetails)






export default education_route;