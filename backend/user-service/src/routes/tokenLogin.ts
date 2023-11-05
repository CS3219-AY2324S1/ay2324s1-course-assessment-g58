import { Request, Response, Router } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const userData = req.body.user;
        if (userData) {
            return res.status(200).json(userData);
        } else {
            return res.status(401).json({ error: "Login has expired" });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ error: `An error has occurred: ${error}` });
    }
});

export default router;
