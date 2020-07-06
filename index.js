import express from 'express';
import dotenv from 'dotenv';
import connect from './dbConnect.js';
import routerAccount from './routes/routerAccount.js';

dotenv.config();

connect();

const app = express();
app.use(express.json());
app.use('/account', routerAccount);

app.listen(process.env.PORT, () => console.log('API MyBank iniciada'));
