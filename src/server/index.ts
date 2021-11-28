import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { auth, todo, views } from './routes';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import './db';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    credentials: true,
    origin: '*'
}));
app.use(helmet());
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({ secret: process.env.EXPRESS_SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', auth);
app.use('/api', todo);
app.use(views);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));