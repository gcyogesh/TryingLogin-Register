import express from 'express'
import dotenv from 'dotenv'
import router from './routes/authRoutes.js';
import Connection from './database/Connection.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

Connection();

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))

app.use('/', router)



const port =4000;
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})



