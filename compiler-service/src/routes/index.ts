import { Router } from 'express';
import { compilerRouter } from './compiler.routes';
import { enqueueRouter } from './enqueue.routes';

const router = Router();

router.use(compilerRouter);

router.use(enqueueRouter);

export default router;
