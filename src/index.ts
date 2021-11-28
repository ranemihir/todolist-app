import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import { auth, todo } from './routes';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    credentials: true,
    origin: '*'
}));
app.use(helmet());
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', auth);
app.use('/api', todo);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));