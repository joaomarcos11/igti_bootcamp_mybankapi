import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(
      // 'mongodb+srv://admin:a1b2c3d4@aulaigti.6lq4e.mongodb.net/mybank?retryWrites=true&w=majority',
      `mongodb+srv://${process.env.USERDB}:${process.env.PWDDB}@aulaigti.6lq4e.mongodb.net/mybank?retryWrites=true&w=majority`,
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

export default connect;
