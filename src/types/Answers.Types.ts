import type { IQuestionType } from "./QuestionType";

export type IAnwerType = {
    id: number;
    questionType: IQuestionType;
    answer: string | number;
    answerId?: number;
    extraAnswer?: string;
};
