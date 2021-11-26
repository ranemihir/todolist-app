import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import auth from './routes/auth';
import todo from './routes/todo';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    credentials: true,
    origin: '*'
}));
app.use(helmet());

app.use(auth);
app.use(todo);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));