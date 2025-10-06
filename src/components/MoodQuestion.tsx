import { Button, Typography } from "@mui/material";
import { OptionQuestionValues } from "../utils/OptionQuestionValues";
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

export const MoodQuestion = ({ question }: IProps) => {
    const { handleSaveAnswer, doesQuestionHasAnswer, getAnswerByQuestionId } = useAnswerContextProvider();

    const onKeyDownHandler = (key: string) => {
        const option = parseInt(key);
        if (option >= 1 && option <= 5) {
            handleSaveAnswer({ id: question.id, questionType: question.questionType, answer: option, answerId: option });
            setLocalAnswer(OptionQuestionValues.find((o) => o.id === option)?.value ?? "");
        }
    };

    const amountOfOptions = 6;

    const numbers = [...Array(amountOfOptions).keys()];

    useOnKeyDown(numbers.map(String), (e) => onKeyDownHandler(e.key));

    const getSavedAnswer = () => {
        return OptionQuestionValues?.find((q) => q.id == getAnswerByQuestionId(question.id)?.answerId)?.value ?? "";
    };

    const [localAnswer, setLocalAnswer] = useState(getSavedAnswer());

    const isExtraQuestion = () => {
        if (localAnswer === null) return;
        return localAnswer === question.extraQuestionCondition && question.extraQuestion;
    };

    return (
        <section className="flex flex-col gap-5">
            <Typography variant="h2" component="h2">
                {question.questionText} <span className="text-[#D14343]">*</span>
            </Typography>
            <div className="flex gap-2">
                {OptionQuestionValues.map((option, index) => (
                    <Button
                        key={index}
                        variant="outlined"
                        sx={getAnswerByQuestionId(question.id)?.answerId == option.id ? { backgroundColor: "#5048E5" } : {}}
                        color="primary"
                        onClick={() => {
                            handleSaveAnswer({ id: question.id, questionType: question.questionType, answer: option.value, answerId: option.id });
                            setLocalAnswer(option.value);
                        }}
                    >
                        <span className="absolute text-xs bottom-0 left-1 text-stone-500">{index + 1}</span>
                        {option.title}
                    </Button>
                ))}
            </div>
            {isExtraQuestion() && <ExtraQuestion question={question} />}
            <SendButton />
            <PageButtons isForwardDisabled={!doesQuestionHasAnswer(question.id)} />
        </section>
    );
};
