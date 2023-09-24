import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

type JwtVerifyError = JsonWebTokenError | TokenExpiredError;

/**
 * The `authenticate` function is used to verify the authentication token in a request and attach the
 * user information to the request body.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to manipulate the response,
 * such as setting the status code, sending JSON data, or redirecting the client to a different URL.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called at the end of the
 * `authenticate` function to indicate that the authentication process is complete and the next
 * middleware function should be executed.
 * @returns In the code snippet, there are multiple return statements. Here is a breakdown of what is
 * being returned in each case:
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN ?? "",
            (err: JwtVerifyError | null, user: any) => {
                if (err) {
                    return res
                        .status(403)
                        .json({ message: "Authentication failed" });
                }

                req.body.user = user;
                next();
            }
        );
    } catch (e) {
        return res.status(403).json({ message: "Authentication failed" });
    }
}

/**
 * The `authorize` function is used to check if a user is authenticated and authorized as an admin
 * before allowing access to a protected route.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties for manipulating the response, such as
 * setting the status code, sending JSON data, or redirecting the client to a different URL.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called at the end of the
 * `authorize` function to indicate that the authorization process is complete and the next middleware
 * function should be executed.
 * @returns In this code, if there is no token in the request cookies, a response with status code 401
 * and a JSON object containing the message "Authentication required" is returned.
 */
export function authorize(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN ?? "",
            (err: JwtVerifyError | null, user: any) => {
                if (err) {
                    return res
                        .status(403)
                        .json({ message: "Authentication failed" });
                }

                const admin: boolean = user.admin;

                if (admin) {
                    req.body.user = user;
                    next();
                }

                return res
                    .status(403)
                    .json({ message: "Authorization failed" });
            }
        );
    } catch (e) {
        return res.status(403).json({ message: "Authorization failed" });
    }
}
