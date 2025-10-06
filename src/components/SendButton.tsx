import { Button } from "@mui/material";
import { useQuestionToShowContext } from "../context/QuestionToShow.Context";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useOnKeyDown } from "../hooks/useOnKeyDown";
import { useAnswerContextProvider } from "../context";

type IProps = {
    isDisabled?: boolean;
};

export const SendButton = ({ isDisabled = false }: IProps) => {
    const { t } = useTranslation();
    const { questionToShow, questionsAmount, handleNextQuestion } = useQuestionToShowContext();
    const { handleSubmitAnswers } = useAnswerContextProvider();

    const [buttonPulse, setButtonPulse] = useState(false);

    useOnKeyDown(["enter"], () => onKeyDownHandler());

    const handleSend = () => {
        handleSubmitAnswers();
        handleNextQuestion();
    };

    const onKeyDownHandler = () => {
        if (questionToShow === questionsAmount && !isDisabled) {
            setButtonPulse(true);
            setTimeout(() => {
                setButtonPulse(false);
            }, 2000);
        }
    };

    return (
        <>
            {questionToShow === questionsAmount && (
                <div className="flex justify-end mt-10">
                    <Button variant="contained" color="primary" className={buttonPulse ? "animate-pulse" : ""} disabled={isDisabled} onClick={handleSend}>
                        {t("global.submitButton")}
                    </Button>
                </div>
            )}
        </>
    );
};
