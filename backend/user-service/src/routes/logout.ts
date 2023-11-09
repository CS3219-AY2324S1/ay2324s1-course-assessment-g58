import { Request, Response, Router } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "Logout successful" });
    } catch (e) {
        res.status(500).json({ message: `An error has occurred: ${e}` });
    }
});

export default router;
