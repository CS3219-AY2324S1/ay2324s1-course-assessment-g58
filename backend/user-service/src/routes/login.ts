import { Request, Response, Router } from "express";
import { verifyUser, generateToken, getUserData } from "../utils/authHelpers";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        console.log("login request received");

        const email = req.body.email;
        const password = req.body.password;
        const isVerified = await verifyUser(email, password);

        if (isVerified) {
            console.log("login verified");
            const userData = await getUserData(email);
            const accessToken = generateToken(userData);
            res.status(200).json({
                status: 200,
                email: email,
                username: userData.username,
                admin: userData.admin,
                token: accessToken,
            });
        } else {
            res.status(401).json({ message: "Incorrect email or password" });
        }
    } catch (e) {
        res.status(500).json({ message: `An error has occurred: ${e}` });
    }
});

export default router;
