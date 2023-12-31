// External dependencies
import { ObjectId } from "mongodb";
import mongoose, { Types } from "mongoose";
import { QuestionSchema, IQuestion } from "./question.model";
import { ResponseSchema, IResponse } from "./response.model";

export interface IQuestionHistoryObj extends mongoose.Document {

    _id: Types.ObjectId;
    question: IQuestion;
    response: IResponse;
    dateTime: Date;
}

export const QuestionHistoryObjSchema = new mongoose.Schema({
    question: {
        type: QuestionSchema,
        required: true,
    },
    response: {
        type: ResponseSchema,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
    },
});

export const QuestionHistoryObjModel = mongoose.model<IQuestionHistoryObj>("QuestionHistoryObj", QuestionHistoryObjSchema);

// export interface IQuestionHistory extends mongoose.Document {
//     _id: Types.ObjectId;
//     user: Types.ObjectId;
//     history: IQuestionHistoryObj[];
//     dateTime: string;
// }

// const QuestionHistorySchema = new mongoose.Schema({
//     user: {
//         type: Types.ObjectId,
//         required: true,
//         unique: true,
//     }, 
//     history: {
//         type: [QuestionHistoryObjSchema],
//         required: true,
//     },
// });

// export const QuestionHistoryModel = mongoose.model<IQuestionHistory>("QuestionHistory", QuestionHistorySchema);