import "dotenv/config";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './routes/authRouter';
import { appDataSource } from './data-source';

const app = express();
const origin = 'http://localhost:3000';

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin, credentials: true }));
app.get('/', (_, res) => res.send('running'));
app.use('/api/auth', authRouter);


app.listen(process.env.PORT, async () => {
   console.log(`Server running at http://localhost:${process.env.PORT}`);
   appDataSource
      .initialize()
      .then(async () => {
         console.log('database initialized');
      })
      .catch((error) => console.log(error));
});
