import { Button } from "@mui/material";
import { useQuestionToShowContext } from "../context/QuestionToShow.Context";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from "react-i18next";
import { useOnKeyDown } from "../hooks/useOnKeyDown";

type IProps = {
    isBackDisabled?: boolean;
    isForwardDisabled?: boolean;
};

export const PageButtons = ({ isBackDisabled = false, isForwardDisabled = false }: IProps) => {
    const { t } = useTranslation();
    const { handleNextQuestion, handlePreviousQuestion, questionToShow, questionsAmount } = useQuestionToShowContext();

    useOnKeyDown(["enter"], (e) => onKeyDownHandler(e.key));

    const onKeyDownHandler = (key: string) => {
        if (key === "Enter" && !isForwardDisabled && questionToShow != questionsAmount) {
            handleNextQuestion();
        }
    };

    return (
        <div className="absolute bottom-10 flex gap-4 right-10">
            {questionToShow != 1 && (
                <Button disabled={isBackDisabled} onClick={handlePreviousQuestion} variant="contained" color="primary">
                    <ArrowBackIosIcon />
                    {t("global.backButton")}
                </Button>
            )}
            {questionToShow != questionsAmount && (
                <Button disabled={isForwardDisabled} onClick={handleNextQuestion} variant="contained" color="primary">
                    {t("global.nextButton")}
                    <ArrowForwardIosIcon />
                </Button>
            )}
        </div>
    );
};
