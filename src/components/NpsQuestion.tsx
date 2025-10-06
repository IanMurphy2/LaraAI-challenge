import { Button, Typography } from "@mui/material";
import { PageButtons } from "./PageButtons";
import type { IQuestion } from "../types";
import { SendButton } from "./SendButton";
import { useAnswerContextProvider } from "../context";
import { useTranslation } from "react-i18next";
import { ExtraQuestion } from "./ExtraQuestion";
import { useState } from "react";
import { useOnKeyDown } from "../hooks/useOnKeyDown";

type IProps = {
    question: IQuestion;
};

export const NpsQuestion = ({ question }: IProps) => {
    const { t } = useTranslation();
    const { handleSaveAnswer, doesQuestionHasAnswer, getAnswerByQuestionId } = useAnswerContextProvider();

    const onKeyDownHandler = (key: string) => {
        const option = parseInt(key) - 1;
        if (option === -1) {
            handleSaveAnswer({ id: question.id, questionType: question.questionType, answer: 9, answerId: 9 });
            setLocalAnswer(9);
        } else if (option >= 0 && option <= 9) {
            handleSaveAnswer({ id: question.id, questionType: question.questionType, answer: option, answerId: option });
            setLocalAnswer(option);
        }
    };

    const amountOfOptions = 10;

    const numbers = [...Array(amountOfOptions).keys()];

    useOnKeyDown(numbers.map(String), (e) => onKeyDownHandler(e.key));

    const getSavedAnswer = () => {
        return (getAnswerByQuestionId(question.id)?.answer as number) ?? null;
    };

    const [localAnswer, setLocalAnswer] = useState<number | null>(getSavedAnswer());

    const isExtraQuestion = () => {
        if (localAnswer === null) return;

        let category = "";

        if (localAnswer >= 0 && localAnswer <= 6) category = "negative";
        else if (localAnswer === 7 || localAnswer === 8) category = "neutral";
        else if (localAnswer === 9 || localAnswer === 10) category = "positive";

        return category === question.extraQuestionCondition && question.extraQuestion;
    };

    return (
        <section className="flex flex-col gap-5 w-6/12 items-center">
            <Typography variant="h2" component="h2">
                {question.questionText} <span className="text-[#D14343]">*</span>
            </Typography>
            <div className="flex flex-col gap-2 w-fit max-w-[50rem] items-center justify-center">
                <div className="flex justify-center flex-wrap gap-2">
                    {numbers.map((option, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            color="primary"
                            sx={getAnswerByQuestionId(question.id)?.answerId == option ? { backgroundColor: "#5048E5", color: "white" } : {}}
                            onClick={() => {
                                handleSaveAnswer({ id: question.id, questionType: question.questionType, answer: option, answerId: option });
                                setLocalAnswer(option);
                            }}
                        >
                            <span className="absolute text-xs bottom-0 left-1 text-stone-500">{option == 9 ? 0 : option + 1}</span>
                            {option + 1}
                        </Button>
                    ))}
                </div>
                <div className="flex justify-between w-full">
                    <h6>{t("npsQuestion.negativeLabel")}</h6>
                    <h6>{t("npsQuestion.positiveLabel")}</h6>
                </div>
            </div>
            {isExtraQuestion() && <ExtraQuestion question={question} />}
            <SendButton isDisabled={!doesQuestionHasAnswer(question.id)} />
            <PageButtons isForwardDisabled={!doesQuestionHasAnswer(question.id)} />
        </section>
    );
};