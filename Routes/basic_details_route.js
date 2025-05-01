import express from 'express'
import uploadBasicDetails from '../controlers/basic_related/basic_details_uplode.js';
import addSkillToBasicDetails from '../controlers/basic_related/add_new_skill.js';
import deleteSkillFromBasicDetails from '../controlers/basic_related/delete_skill.js';
import getAllBasicDetails from '../controlers/basic_related/get_all_basic_datails.js';

const basic_details = express.Router();

basic_details.post('/upload',uploadBasicDetails)
basic_details.post('/add/skill',addSkillToBasicDetails)
basic_details.post('/delete/skill',deleteSkillFromBasicDetails)
basic_details.get('/get',getAllBasicDetails)












export default basic_details;