import { Button, Typography } from "@mui/material";
import { useQuestionToShowContext } from "../context/QuestionToShow.Context";
import type { IPresentation } from "../types/QuestionResponse.Types";
import { PresentationModal } from "./PresentationModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useOnKeyDown } from "../hooks/useOnKeyDown";

type IProps = {
    presentation: IPresentation;
};

export const PresentationComponent = ({ presentation }: IProps) => {
    const { t } = useTranslation();
    const { handleNextQuestion } = useQuestionToShowContext();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState<string>("");

    const amountOfOptions = presentation.buttons.length + 1;

    const numbers = [...Array(amountOfOptions).keys()];

    const keysWithAction = [...numbers.map(String), "enter"];

    useOnKeyDown(keysWithAction, (e) => onKeyDownHandler(e.key));

    const onKeyDownHandler = (key: string) => {
        const option = parseInt(key);
        if (key === "Enter") {
            handleNextQuestion();
        }
        if (option >= 1 && option <= amountOfOptions) {
            setModalText(presentation.buttons[option - 1].modalParagraphs);
            setIsModalOpen(true);
        }
    };

    const handlerOpenModal = (newModalText: string) => {
        setModalText(newModalText);
        setIsModalOpen(true);
    };

    return (
        <>
            <PresentationModal modalIsOpen={isModalOpen} setModalIsOpen={setIsModalOpen} modalText={modalText} />
            <div className="flex flex-col justify-center items-center gap-10 w-10/12 sm:w-6/12">
                <Typography variant="h2" component="h2">
                    {presentation.title}
                </Typography>
                {presentation.paragraphs?.map((paragraph, index) => (
                    <Typography key={index} variant="body1" component="p">
                        {paragraph}
                    </Typography>
                ))}
                <Button variant="contained" color="primary" onClick={handleNextQuestion}>
                    {t("presentation.startButton")}
                </Button>
                <div className="flex flex-wrap justify-center gap-10">
                    {presentation.buttons?.map((button, index) => (
                        <Button key={index} variant="presentation" className="m-2" onClick={() => handlerOpenModal(button.modalParagraphs)}>
                            <span className="absolute text-xs bottom-0 left-1 text-stone-500">{index + 1}</span>
                            {button.buttonTitle}
                        </Button>
                    ))}
                </div>
            </div>
        </>
    );
};
