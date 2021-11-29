import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import todo from './routes/todo';
import auth from './routes/auth';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import './db';


const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser());
app.use(auth);
app.use(todo);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));