export type IQuestionType = "text" | "nps" | "mood" | "options";

export type IQuestion = {
    id: number;
    questionType: IQuestionType;
    questionText: string;
    questionOptions?: { id: number; order: number; title: string }[];
    extraQuestion?: boolean;
    extraQuestionText?: string;
    extraQuestionCondition?: "negative" | "neutral" | "positive";
};
