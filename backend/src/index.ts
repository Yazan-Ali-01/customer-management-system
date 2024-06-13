import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import { AppDataSource } from './infrastructure/database/ormconfig';
import customerRoutes from './infrastructure/http/routes/customerRoutes';
import authRoutes from './infrastructure/http/routes/authRoutes';
import swaggerConfig from './swagger';
import { errorHandler } from './shared/middleware/errorHandler';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());
app.use(limiter);
app.use(compression());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(cookieParser());

swaggerConfig(app);
app.use('/customers', customerRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
