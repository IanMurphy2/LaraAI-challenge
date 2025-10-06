import { createContext, useState, useContext, type ReactNode } from "react";

const QuestionToShowContext = createContext({
    questionToShow: 0,
    handleNextQuestion: () => {},
    handlePreviousQuestion: () => {},
    handleSetQuestionsAmount: (_amount: number) => {},
    questionsAmount: 0,
});

type Props = {
    children: ReactNode;
};

export const QuestionToShowContextProvider = ({ children }: Props) => {
    const [questionToShow, setQuestionToShow] = useState<number>(0);
    const [questionsAmount, setQuestionsAmount] = useState<number>(0);

    const handleSetQuestionsAmount = (amount: number) => {
        setQuestionsAmount(amount);
    };

    const handleNextQuestion = () => {
        questionToShow != questionsAmount + 1 && setQuestionToShow((prev) => prev + 1);
    };

    const handlePreviousQuestion = () => {
        questionToShow > 0 && setQuestionToShow((prev) => prev - 1);
    };

    return (
        <QuestionToShowContext.Provider value={{ questionToShow, handleNextQuestion, handlePreviousQuestion, handleSetQuestionsAmount, questionsAmount }}>
            {children}
        </QuestionToShowContext.Provider>
    );
};

export const useQuestionToShowContext = () => {
    return useContext(QuestionToShowContext);
};
