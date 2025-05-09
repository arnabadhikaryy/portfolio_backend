import express from 'express'
import uploadBasicDetails from '../controlers/basic_related/basic_details_uplode.js';
import addSkillToBasicDetails from '../controlers/basic_related/add_new_skill.js';
import deleteSkillFromBasicDetails from '../controlers/basic_related/delete_skill.js';
import getAllBasicDetails from '../controlers/basic_related/get_all_basic_datails.js';
import create_jwt_token_login from '../middlewairs/create_jwt_Token.js';
import are_you_authorized from '../middlewairs/are_you_autharize.js';

const basic_details = express.Router();

basic_details.post('/login', create_jwt_token_login)
//basic_details.post('/aut', are_you_authorized)

basic_details.post('/upload', are_you_authorized,  uploadBasicDetails)
basic_details.post('/add/skill', are_you_authorized,  addSkillToBasicDetails)
basic_details.post('/delete/skill', are_you_authorized,  deleteSkillFromBasicDetails)
basic_details.get('/get',getAllBasicDetails)












export default basic_details;