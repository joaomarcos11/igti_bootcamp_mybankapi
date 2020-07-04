import express from 'express';
import mongoose from 'mongoose';
import routerAccount from './routes/routerAccount.js';

const connect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:a1b2c3d4@aulaigti.6lq4e.mongodb.net/mybank?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('MongoDB Atlas conectado');
  } catch (error) {
    console.log('Erro ao conectar com MongoDB Atlas');
  }
};

connect();

const app = express();
app.use(express.json());
app.use('/account', routerAccount);

app.listen(3333, () => console.log('API MyBank iniciada'));
