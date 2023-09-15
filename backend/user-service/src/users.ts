import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

router.post('/', async (req: Request, res: Response) => {
    const { username, email } = req.body

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (existingUser) {
        console.error(`Email: ${email}is already being used`);
        res.sendStatus(403);
    }

    const newUser = await prisma.user.create({
        data: {
            username: username,
            email: email,
            proficiency: "Beginner"
        }
    });


    res.json(newUser);
});

export default router;