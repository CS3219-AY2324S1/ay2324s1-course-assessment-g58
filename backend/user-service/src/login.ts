import { Request, Response, Router } from "express";
import { verifyUser, generateToken } from "./auth/auth";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const isVerified = await verifyUser(email, password);

        if (isVerified) {
            const user = { email: email };
            const accessToken = generateToken(user);
            res.status(200).json({ accessToken });
        } else {
            res.status(500).send("Login failed");
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Incorrect email or password");
    }
});

export default router;
