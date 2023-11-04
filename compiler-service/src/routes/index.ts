/*
DEPRECATED- this implementation, using compilerRoute, is no longer used.
Now we use rabbitmq consumer for the compiler service.
*/

import { Router } from 'express';
import { compilerRouter } from './compiler.routes';
import { enqueueRouter } from './enqueue.routes';

const router = Router();

router.use(compilerRouter);

router.use(enqueueRouter);

export default router;
