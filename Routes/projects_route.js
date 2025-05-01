import express from 'express'
import project_upload from '../controlers/project_related/project_uplodeing.js';
import delete_project from '../controlers/project_related/project_deleting.js';
import multer from 'multer'
import getAllProjects from '../controlers/project_related/get_all_project.js';
const upload = multer({ dest: 'uploads/' })

const Projects_route = express.Router();

Projects_route.post('/upload/project',upload.single('projectImage'),project_upload)
Projects_route.delete('/delete/project',delete_project)


Projects_route.get('/get',getAllProjects)











export default Projects_route;