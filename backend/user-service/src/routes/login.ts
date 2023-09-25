import { Request, Response, Router } from "express";
import { verifyUser, generateToken, getUserData } from "../auth/helpers";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const isVerified = await verifyUser(email, password);

        if (isVerified) {
            const userData = await getUserData(email);
            const accessToken = generateToken(userData);
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
            })
                .status(200)
                .json({ message: "Login successful" });
        } else {
            res.status(401).send({ message: "Incorrect email or password" });
        }
    } catch (e) {
        res.status(500).json({ message: `An error has occurred: ${e}` });
    }
});

export default router;
