import express from 'express'
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import path from 'path';

import connectDB from './config/database.config';
import authRoute from './routes/auth.routes';
import createRoute from './routes/quiz.routes';
import usersRoute from './routes/users.routes';
import homeRoute from './routes/home.routes'; 

const app: express.Application = express();


const PORT = process.env.PORT || 8000;


dotenv.config();

app.set('view engine', 'ejs');
// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.use(cors({
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));                                                                            

app.use(compression());
app.use(morgan('dev'))
app.use(methodOverride('_method'));
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/quiz', createRoute);
app.use('/api/users', usersRoute);
app.use('/', homeRoute);




connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`)
    })
})