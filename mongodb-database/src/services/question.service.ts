import { Types } from "mongoose";
import QuestionModel, { IQuestion } from "../models/question.model";
import {QuestionHistoryObjModel, IQuestionHistoryObj } from "../models/question-history.model";
import { IResponse } from "../models/response.model";
import UserModel, { IUser } from "../models/user.model";

export async function createQuestion(question: Partial<IQuestion>): Promise<IQuestion> {
    const newQuestion = new QuestionModel(question);
    return newQuestion.save();
}

export async function getQuestions(): Promise<IQuestion[]> {
    return QuestionModel.find();
}

export async function deleteQuestionByObjectId(_id: string): Promise<IQuestion | null> {
    // Delete by title instead of index as the frontend does not store index
    return QuestionModel.findByIdAndDelete(_id);
}

export async function editQuestionById(id: string, updatedQuestion: Partial<IQuestion>): Promise<IQuestion | null> {
    return QuestionModel.findByIdAndUpdate(id, updatedQuestion);
}

// Function to add a question to history
export async function addQuestionToHistory(question: Partial<IQuestion>, response: IResponse, user: Partial<IUser>): Promise<IUser | null> {
        const dateTime = new Date();
        // Create a new QuestionHistoryObj
        const newQuestionHistoryObj = new QuestionHistoryObjModel({
            question: question,
            response: response,
            dateTime: dateTime,
        });
        const newUser = await UserModel.findOneAndUpdate({ _id: user._id }, { $push: { history: newQuestionHistoryObj } }, { new: true });
        return newUser;
};

export async function findHistory(user: IUser): Promise<IQuestionHistoryObj[] | null> {
    return QuestionHistoryObjModel.find({ user: user._id });
}

export async function clearHistory(user: IUser): Promise<IUser | null> {
    return UserModel.findOneAndUpdate({ _id: user._id }, { $set: { history: [] } }, { new: true });
}

export async function getHistory(user: IUser): Promise<IQuestionHistoryObj[] | null> {
    const userData = await UserModel.findOne({ _id: user._id });
    if (!userData) {
        return null;
    }
    return userData.history;
 }
 