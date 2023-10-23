import QuestionModel, { IQuestion } from "../models/question.model";
import {QuestionHistoryObjModel, QuestionHistoryModel, IQuestionHistory, IQuestionHistoryObj } from "../models/question-history.model";
import { IResponse } from "../models/response.model";

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
export async function addQuestionToHistory(question: IQuestion, response: IResponse, user: string): Promise<IQuestionHistory | null> {
    try {
        const newHistory: IQuestionHistoryObj = new QuestionHistoryObjModel({ question, response, dateTime: response.dateTime });
        const questionHistory = await QuestionHistoryModel.findOne({ user });
        if (questionHistory) {
            questionHistory.history.push(newHistory);
            return questionHistory.save();
        } else {
            const newQuestionHistory = new QuestionHistoryModel({ user, history: [newHistory] });
            return newQuestionHistory.save();
        }
    } catch (error) {
        console.error("Error adding question to history:", error);
        throw error;
    }
};
