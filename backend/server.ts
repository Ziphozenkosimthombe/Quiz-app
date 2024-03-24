import express from 'express'
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.config';
import authRoute from './routes/auth.routes';
import createRoute from './routes/quiz.routes';
import usersRoute from './routes/users.routes'; 

const app: express.Application = express();


const PORT = process.env.PORT || 8000;


dotenv.config();
app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/quiz', createRoute);
app.use('/api/users', usersRoute);




connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`)
    })
})