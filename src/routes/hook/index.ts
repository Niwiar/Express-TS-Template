import express, { Router, Request, Response, NextFunction } from 'express';
import { encrypt } from '../../utils/encrypt';
import logger from '../../utils/logger';

const router: Router = express.Router();

router.use('/', async (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default router;
