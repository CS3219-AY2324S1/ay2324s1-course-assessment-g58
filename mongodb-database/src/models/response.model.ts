import mongoose, { Types } from "mongoose";

export interface IResponse extends mongoose.Document {
    _id: Types.ObjectId;
    questionId: Types.ObjectId;
    userId: Types.ObjectId;
    response: string;
    status: string;
    dateTime: Date;
    language: string;
}

export const ResponseSchema = new mongoose.Schema({
    questionId: {
        type: Types.ObjectId,
        required: true,
    },
    userId: {
        type: Types.ObjectId,
        // required: true,
    },
    response: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
});