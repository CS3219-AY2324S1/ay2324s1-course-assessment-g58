import QuestionModel, { IQuestion } from "../models/question.model";

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

export async function editQuestionByTitle(title: string, updatedQuestion: Partial<IQuestion>): Promise<IQuestion | null> {
    return QuestionModel.findOneAndUpdate({ title: title }, updatedQuestion, { new: true });
}
