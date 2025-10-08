import { useQuestionToShowContext } from "../../context/QuestionToShow.Context";
import { EndingComponent } from "../../components/EndingComponent";
import { PresentationComponent } from "../../components/PresentationComponent";
import { getQuestionComponent } from "./utils/getQuestionComponent";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormInfoById } from "../../hooks/useFormQuery";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

const MainForm = () => {
    const { id } = useParams();
    const { i18n, t } = useTranslation();
    const { questionToShow, handleSetQuestionsAmount } = useQuestionToShowContext();

    const formInfo = useFormInfoById(id ? parseInt(id) : 0);

    const presentation = formInfo.data?.presentation || { title: "", paragraphs: [], buttons: [] };
    const questions = formInfo.data?.questions || [];
    const ending = formInfo.data?.ending || { title: "", paragraphs: [] };
    const answered = formInfo.data?.answered || false;

    const questionsLength = formInfo.data?.questions?.length || 0;

    useEffect(() => {
        const { language, amountOfQuestions } = formInfo.data || { language: "es", amountOfQuestions: 0 };
        handleSetQuestionsAmount(amountOfQuestions || 0);
        i18n.changeLanguage(language);
    }, [formInfo.data]);

    if (!formInfo.isSuccess) {
        return (
            <div className="bg-[#F3F0FF] h-screen w-screen flex items-center justify-center">
                <Typography variant="h2" component="h2">
                    {t("presentation.errorMessage", { id: id })}
                </Typography>
            </div>
        );
    }
  
    return (
        <main className="bg-[#F3F0FF] h-screen w-screen flex items-center justify-center py-10">
            {questionToShow == 0 && !answered && <PresentationComponent presentation={presentation} />}
            {questionToShow > 0 && questionToShow < questionsLength + 1 && !answered && getQuestionComponent(questions[questionToShow - 1])}
            {(questionToShow === questionsLength + 1 || answered) && <EndingComponent ending={ending} />}
        </main>
    );
};

export default MainForm;
