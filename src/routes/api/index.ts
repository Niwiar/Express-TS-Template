import express, { Router, Request, Response, NextFunction } from 'express';
import { encrypt } from '../../utils/encrypt';
import logger from '../../utils/logger';
import { HttpError } from '../../interface/error.interface';

const router: Router = express.Router();

router.use('/', async (req: Request, res: Response) => {
  res.sendStatus(200);
});

// Catch 404 and forward to error handler
router.use((req: Request, res: Response, next: NextFunction) => {
  const err = new HttpError('Not Found', 404);
  next(err);
});

// Error handlers
router.use(
  (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${err.status || 500} - ${err.message}`);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: process.env.NODE_ENV !== 'production' ? err : {},
    });
  }
);

export default router;
