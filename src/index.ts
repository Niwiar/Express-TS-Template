import express, { Express, NextFunction, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import logger from './utils/logger';
import morganMiddleware from './middlewares/morgan.middleware';

dotenv.config();

const app: Express = express();

app.use('/assets', express.static(path.join(__dirname, 'frontend/assets')));
app.use(
  '/modules',
  express.static(
    path.join(
      __dirname,
      process.env.NODE_ENV !== 'production' ? '../node_modules' : 'node_modules'
    )
  )
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());

app.use(morganMiddleware);

// Router
import indexRoutes from './routes';
import apiRoutes from './routes/api';
import hookRoutes from './routes/hook';

app.use('/', indexRoutes);
app.use('/api', apiRoutes);
app.use('/hook', hookRoutes);

import http from 'http';
import { socketIO, socketServer } from './libs/socket-io';

const server = http.createServer(app);
socketServer(server);
server.listen(process.env.PORT || 3000, () =>
  logger.info(`Server running on port ${process.env.PORT}`)
);

socketIO();
