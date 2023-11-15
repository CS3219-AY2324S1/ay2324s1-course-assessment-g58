import UserModel, { IUser, UserSchema } from "../models/user.model";

export async function createUser(user: Partial<IUser>): Promise<IUser> {
    const newUser = new UserModel(user);
    return await newUser.save();
}