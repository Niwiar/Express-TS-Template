import express, { Router, Request, Response, NextFunction } from 'express';

const router: Router = express.Router();

router.use('/', async (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default router;
