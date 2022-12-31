import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth';
import { appDataSource } from './data-source';

const app = express();
const origin = 'http://localhost:3000';

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin }));
app.get('/', (_, res) => res.send('running'));
app.use('/api/auth', authRoutes);

let port = 5000;

app.listen(port, async () => {
   console.log(`Server running at http://localhost:${port}`);
   appDataSource
      .initialize()
      .then(async () => {
         console.log('database initialized');
      })
      .catch((error) => console.log(error));
});
