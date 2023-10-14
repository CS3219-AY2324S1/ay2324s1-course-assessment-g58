import { Router } from 'express';
import { compilerRouter } from './compiler.routes';

const router = Router();

router.use(compilerRouter);

export default router;
