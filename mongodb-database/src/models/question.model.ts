// External dependencies
import { ObjectId } from "mongodb";
import mongoose, { Types } from "mongoose";

// Class Implementation
export interface IQuestion extends mongoose.Document {
    _id: Types.ObjectId;
    title: string;
    description: string;
    difficulty: string;
    category: string;
}

// Mongoose Schema and Model
const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    difficulty: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

const QuestionModel = mongoose.model<IQuestion>("Question", QuestionSchema);

export default QuestionModel;
