import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

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
            password: true,
        },
    });

    const res = checkPassword(password, userData.password);
    return res;
}

/**
 * The function `getUserData` retrieves user data from a database based on the provided email.
 * @param {string} email - The `email` parameter is a string that represents the email address of the
 * user whose data you want to retrieve.
 * @returns the user data, which includes the username, email, and admin status.
 */
export async function getUserData(email: string) {
    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: email,
        },
        select: {
            username: true,
            email: true,
            admin: true,
        },
    });

    return userData;
}

/**
 * The function generates a token using the user object and a secret key.
 * @param {object} user - The `user` parameter is an object that represents the user for whom the token
 * is being generated. It typically contains information such as the user's ID, username, and any other
 * relevant data that needs to be included in the token.
 * @returns a JSON Web Token (JWT) generated using the `jwt.sign()` method.
 */
export function generateToken(user: object) {
    return jwt.sign(user, process.env.ACCESS_TOKEN || "", { expiresIn: "1d" });
}
