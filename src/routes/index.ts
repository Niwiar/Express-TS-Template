import express, { Router, Request, Response, NextFunction } from 'express';
import path from 'path';
const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../frontend/views/index.html'));
});

export default router;
