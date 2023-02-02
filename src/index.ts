import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import { authRoutes } from './routes/auth';
import { collectionsRouter } from './routes/collections';
import { itemsRouter } from './routes/items';

dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.use('/', authRoutes);
app.use('/collections', collectionsRouter);
app.use('/items', itemsRouter);

mongoose.set('strictQuery', false);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    server.listen(process.env.PORT || 4000, function () {
      console.log('connected to DB');
    });
  } catch (error) {
    console.log(error);
  }
})();
