import { Button, Typography } from "@mui/material";
import { PageButtons } from "./PageButtons";
import { SendButton } from "./SendButton";
import type { IQuestion } from "../types";
import { useAnswerContextProvider } from "../context";
import { ExtraQuestion } from "./ExtraQuestion";
import { useState } from "react";
import { useOnKeyDown } from "../hooks/useOnKeyDown";

type IProps = {
    question: IQuestion;
};

export const OptionsQuestion = ({ question }: IProps) => {
    const { handleSaveAnswer, doesQuestionHasAnswer, getAnswerByQuestionId } = useAnswerContextProvider();

    const questionsOptions = question.questionOptions?.sort((a, b) => a.order - b.order);

    const onKeyDownHandler = (key: string) => {
        const option = parseInt(key);
        if (option >= 1 && option <= 5) {
            handleSaveAnswer({ id: question.id, questionType: question.questionType, answer: option, answerId: option });
            setLocalAnswer(questionsOptions?.find((o) => o.order === option)?.order ?? null);
        }
    };

    const amountOfOptions = 6;

    const numbers = [...Array(amountOfOptions).keys()];

    useOnKeyDown(numbers.map(String), (e) => onKeyDownHandler(e.key));

    const getSavedAnswer = () => {
        return questionsOptions?.find((q) => q.id == getAnswerByQuestionId(question.id)?.answerId)?.order ?? null;
    };

    const [localAnswer, setLocalAnswer] = useState<number | null>(getSavedAnswer());

    const isExtraQuestion = () => {
        if (localAnswer === null) return;
        const totalOptions = questionsOptions?.length ?? 0;

        let category;

        if (totalOptions % 2 === 1) {
            const neutral = Math.ceil(totalOptions / 2);
            if (localAnswer < neutral) category = "negative";
            else if (localAnswer === neutral) category = "neutral";
            else category = "positive";
        } else {
            const half = totalOptions / 2;
            if (localAnswer <= half) category = "negative";
            else category = "positive";
        }

        return category === question.extraQuestionCondition && question.extraQuestion;
    };

    return (
        <section className="flex flex-col gap-5 w-10/12 sm:w-6/12 h-full">
            <Typography variant="h2" component="h2">
                {question.questionText} <span className="text-[#D14343]">*</span>
            </Typography>
            <div className="flex flex-col gap-2">
                {questionsOptions?.map((option) => (
                    <Button
                        key={option.id}
                        variant="outlined"
                        color="primary"
                        sx={getAnswerByQuestionId(question.id)?.answerId == option.id ? { backgroundColor: "#5048E5", color: "white" } : {}}
                        onClick={() => {
                            handleSaveAnswer({ id: question.id, questionType: question.questionType, answer: option.title, answerId: option.id });
                            setLocalAnswer(option.order);
                        }}
                    >
                        <span className="absolute text-xs bottom-0 left-1 text-stone-500">{option.order}</span>
                        {option.title}
                    </Button>
                ))}
            </div>
            {isExtraQuestion() && <ExtraQuestion question={question} />}
            <SendButton isDisabled={!doesQuestionHasAnswer(question.id)} />
            <PageButtons isForwardDisabled={!doesQuestionHasAnswer(question.id)} />
        </section>
    );
};