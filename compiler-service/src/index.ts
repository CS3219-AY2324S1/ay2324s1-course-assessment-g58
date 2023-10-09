import express, { Request, Response } from 'express';

import { compilerRouter } from './routes/compiler.routes';
const app = express();
const PORT = 3005;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.use(compilerRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
