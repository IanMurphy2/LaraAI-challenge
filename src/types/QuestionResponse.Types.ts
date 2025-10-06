import type { IQuestion } from "./QuestionType";

export type IPresentationButton = {
    buttonTitle: string;
    modalParagraphs: string;
};

export type IPresentation = {
    title?: string;
    paragraphs?: string[];
    buttons: IPresentationButton[];
};

export type IEnding = {
    title: string;
    paragraphs: string[];
};

export type IquestionResponse = {
    id: number;
    language: "es" | "en";
    answered: boolean;
    amountOfQuestions?: number;
    presentation?: IPresentation;
    questions?: IQuestion[];
    ending: IEnding;
};
