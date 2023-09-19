import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JsonObject } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

/**
 * The function `hashPassword` takes a password as input, generates a random salt, and uses the scrypt
 * algorithm to derive a key from the password and salt, returning the salt and derived key as a
 * string.
 * @param {string} password - The `password` parameter is a string that represents the password that
 * needs to be hashed.
 * @returns The function `hashPassword` returns a Promise that resolves to a string.
 */
export async function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        // generate random 16 bytes long salt
        const salt = randomBytes(16).toString("hex");
        scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(`${salt}:${derivedKey.toString("hex")}`);
        });
    });
}

/**
 * The function `checkPassword` is an asynchronous function that compares a given password with a
 * hashed password using the scrypt algorithm.
 * @param {string} password - The `password` parameter is a string that represents the password that
 * needs to be checked against the hash. It is the plain text password that the user provides.
 * @param {string} hash - The `hash` parameter is a string that represents the hashed password. It is
 * in the format of `<salt>:<key>`, where `<salt>` is a randomly generated string used to add
 * complexity to the hashing process, and `<key>` is the actual hashed password.
 * @returns a Promise that resolves to a boolean value.
 */
async function checkPassword(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":");
        const hashKeyBuff = Buffer.from(key, "hex");
        scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(timingSafeEqual(hashKeyBuff, derivedKey));
        });
    });
}

/**
 * The function `verifyUser` takes an email and password as input, retrieves the hashed password from
 * the database, and checks if the provided password matches the hashed password.
 * @param {string} email - A string representing the user's email address.
 * @param {string} password - The `password` parameter is a string that represents the user's password.
 * @returns a Promise that resolves to a boolean value.
 */
export async function verifyUser(
    email: string,
    password: string
): Promise<boolean> {
    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: email,
        },
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            proficiency: true,
            password: true,
            role: true,
        },
    });

    const res = checkPassword(password, userData.password);
    return res;
}

export function generateToken(user: JsonObject) {
    return jwt.sign(user, process.env.ACCESS_TOKEN || "");
}
