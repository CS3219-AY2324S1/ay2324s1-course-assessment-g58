import QuestionModel, { IQuestion } from "../models/question.model";

export async function createQuestion(question: Partial<IQuestion>): Promise<IQuestion> {
    const newQuestion = new QuestionModel(question);
    return newQuestion.save();
}

