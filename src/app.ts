import express, { Application } from 'express';
const app: Application = express();
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';

// parser

app.use(express.json());
app.use(cors());

// application routes

app.use('/api/users', UserRoutes);


// console.log(process.cwd());

export default app;
