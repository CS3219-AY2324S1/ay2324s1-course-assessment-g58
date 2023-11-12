import express from 'express';
import { json } from 'body-parser';
import { compile } from '../controllers/compiler.controller';

const router = express.Router();
router.use(json());

router.post('/compile', compile);

export { router as compilerRouter }