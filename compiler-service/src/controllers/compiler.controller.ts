import { Request, Response } from 'express';
import { compileCode } from '../services/compiler.service';

export const compile = async (req: Request, res: Response) => {
    try {
        const { language, source_code, tests, testFunction } = req.body;
        const result = await compileCode(language, source_code, tests, testFunction);
        
        if (result.error) {
            res.status(result.statusCode || 500).json({ message: result.message });
            return;
        }
        
        res.status(200).json(result.data);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
