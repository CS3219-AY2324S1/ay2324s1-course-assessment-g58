import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

type JwtVerifyError = JsonWebTokenError | TokenExpiredError;

/**
 * The `authenticate` function is used to verify the authentication token provided in the request and
 * attach the user information to the request body if the token is valid.
 * Include `authenticate` in routes that require user authentication.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the HTTP
 * response back to the client. It contains methods and properties that allow you to set the response
 * status, headers, and body. In this code, it is used to send JSON responses with appropriate status
 * codes and error messages.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called at the end of the
 * `authenticate` function to indicate that the authentication process is complete and the next
 * middleware function should be executed.
 * @returns In the code snippet provided, the function is returning a response object with a status
 * code and a JSON object containing a message. The specific response being returned depends on the
 * condition being evaluated.
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;

        // no token provided
        if (!token) {
            return res
                .status(401)
                .json({ status: 401, message: "Authentication required" });
        }

        jwt.verify(
            token,
            process.env.JWT_ACCESS_TOKEN ?? "",
            (err: JwtVerifyError | null, user: any) => {
                if (err) {
                    return res.status(403).json({
                        status: 403,
                        message: "Authentication failed",
                    });
                }

                req.body.user = user;
                next();
            }
        );
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: `An unexpected error occurred: ${e}`,
        });
    }
}

/**
 * The `authorize` function checks if a user is authenticated and authorized to access a route, based
 * on a token provided in the request cookies.
 * Include `authorize` in routes that require a user to be an `admin` to access.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the HTTP
 * response back to the client. It contains methods and properties that allow you to set the response
 * status, headers, and body.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called at the end of the
 * `authorize` function to indicate that the current middleware has completed its processing and the
 * next middleware should be called.
 * @returns In the code snippet provided, the function is returning a response object with a status
 * code and a JSON object containing a message. The specific response being returned depends on the
 * condition being evaluated.
 */
export function authorize(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        jwt.verify(
            token,
            process.env.JWT_ACCESS_TOKEN ?? "",
            (err: JwtVerifyError | null, user: any) => {
                // no token provided
                if (err) {
                    return res
                        .status(403)
                        .json({ message: "Authentication failed" });
                }

                const admin: boolean = user.admin;

                if (admin) {
                    req.body.user = user;
                    next();
                    return;
                }

                // if user is not authorized for an authorized route
                return res
                    .status(403)
                    .json({ message: "Authorization failed" });
            }
        );
    } catch (e) {
        return res
            .status(500)
            .json({ message: `An unexpected error occurred: ${e}` });
    }
}
