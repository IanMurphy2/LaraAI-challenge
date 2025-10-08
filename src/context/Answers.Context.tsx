import { createContext, useState, useContext, type ReactNode } from "react";
import type { IAnwerType } from "../types";
import { usePostFormInfo } from "../hooks/useFormQuery";

const AnswerContext = createContext<{
    handleSaveAnswer: (answer: IAnwerType) => void;
    handleSaveExtraAnswer: (answerId: number, extraAnswer: string) => void;
    handleSubmitAnswers: () => void;
    doesQuestionHasAnswer: (id: number) => boolean;
    getAnswerByQuestionId: (id: number) => IAnwerType | undefined;
    answers: IAnwerType[];
}>({
    handleSaveAnswer: (_answer: IAnwerType) => {},
    handleSaveExtraAnswer: (_answerId: number, _extraAnswer: string) => {},
    handleSubmitAnswers: () => {},
    doesQuestionHasAnswer: (_id: number) => false,
    getAnswerByQuestionId: (_id: number) => undefined,
    answers: [],
});

type Props = {
    children: ReactNode;
};

export const AnswerContextProvider = ({ children }: Props) => {
    const [answers, setAnswers] = useState<IAnwerType[]>([]);
    console.log("answers", answers);

    const handleSaveAnswer = (answer: IAnwerType) => {
        if (answers.find((a) => a.id === answer.id)) {
            setAnswers((prev) => prev.map((a) => (a.id === answer.id ? answer : a)));
            return;
        }
        setAnswers((prev: IAnwerType[]) => [...prev, answer]);
    };

    const handleSaveExtraAnswer = (answerId: number, extraAnswer: string) => {
        const answerToChange = answers.find((a) => a.id === answerId);
        if (!answerToChange) return;

        const newAnswer: IAnwerType = { ...answerToChange, extraAnswer };

        setAnswers((prev) => prev.map((a) => (a.id === answerId ? newAnswer : a)));
    };

    const handleSubmitAnswers = () => {
        console.log("Submitting answers:", answers);
    };

    const doesQuestionHasAnswer = (id: number) => {
        return answers.some((a) => a.id === id);
    };

    const getAnswerByQuestionId = (id: number) => {
        return answers.find((a) => a.id === id);
    };

    return (
        <AnswerContext.Provider value={{ handleSaveAnswer, doesQuestionHasAnswer, getAnswerByQuestionId, handleSaveExtraAnswer, handleSubmitAnswers, answers }}>
            {children}
        </AnswerContext.Provider>
    );
};

export const useAnswerContextProvider = () => {
    return useContext(AnswerContext);
};
