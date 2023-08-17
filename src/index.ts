import express, { Express, NextFunction, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import logger from './utils/logger';
import morganMiddleware from './middlewares/morgan.middleware';
import corsOptions from './config/corsOptions.json';
dotenv.config();

const app: Express = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));
app.use(helmet());

app.use(morganMiddleware);

// Router
import apiRoutes from './routes/api';
import hookRoutes from './routes/hook';

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
