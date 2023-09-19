import express, { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.send("Authentication required");

    const user = jwt.verify(token, process.env.ACCESS_TOKEN ?? "");
}
