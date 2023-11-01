import mongoose, { Types } from "mongoose";
import { IQuestionHistoryObj, QuestionHistoryObjSchema } from "./question-history.model";

export interface IUser extends mongoose.Document {
    _id: Types.ObjectId;
    username: string;
    history: IQuestionHistoryObj[];
}

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    history: {
        type: [QuestionHistoryObjSchema],
        required: true,
    },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;