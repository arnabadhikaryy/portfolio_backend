import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import basic_details from './Routes/basic_details_route.js'
import education_route from './Routes/education_route.js'
import Projects_route from './Routes/projects_route.js'
import service_route from './Routes/service_route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

app.use(cors())
//help to pass request.bady
app.use(express.json());
app.use(cookieParser());


const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/basic',basic_details );
app.use('/edu', education_route);
app.use('/project', Projects_route);
app.use('/service', service_route);

app.listen(port, async () => {
    try {
        const db = await mongoose.connect(process.env.DATABASE_PROFATIONAL).then

        if (db) {
            console.log('Database connected');
            console.log(`Example app listening on port ${port}`);
        } else {
            console.error('Database connection failed');
        }
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}); 
