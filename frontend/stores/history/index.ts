import Question from "@/types/Question";
import QuestionResponse from "@/types/QuestionResponse";
import { makeAutoObservable } from "mobx";
/**
 * HistoryStore stores state for question history
 */
class HistoryStore {
    questionMap = new Map<string, Question>();
    sessionResponseMap = new Map<number, QuestionResponse[]>();
    constructor() {
        makeAutoObservable(this);
    }
    addQuestions = (questions: Question[]) => {
        questions.map((question: Question) =>
            this.questionMap.set(question._id, question)
        );
    };
    getQuestionById = (questionId: string): Question => {
        return this.questionMap.get(questionId)!;
    };

    addSessions = (sessionId: number, responses: QuestionResponse[]) => {
        this.sessionResponseMap.set(sessionId, responses);
    };

    getSessionById = (sessionId: number) => {
        return this.sessionResponseMap.get(sessionId);
    };
}

export { HistoryStore };
