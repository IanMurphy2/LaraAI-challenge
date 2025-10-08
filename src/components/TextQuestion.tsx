import { TextField, Typography } from "@mui/material";
import { PageButtons } from "./PageButtons";
import type { IQuestion } from "../types";
import { SendButton } from "./SendButton";
import useDebounce from "../hooks/useDebouncer";
import { useEffect, useState } from "react";
import { useAnswerContextProvider } from "../context";

type IProps = {
    question: IQuestion;
};

export const TextQuestion = ({ question }: IProps) => {
    const { handleSaveAnswer, getAnswerByQuestionId } = useAnswerContextProvider();

    const [inputValue, setInputValue] = useState("");
    const debaunceValue = useDebounce<string>(inputValue, 300);

    useEffect(() => {
        if (debaunceValue.trim() === "") return;
        handleSaveAnswer({ id: question.id, questionType: question.questionType, answer: debaunceValue });
    }, [debaunceValue]);

    return (
        <section className="flex flex-col gap-3 sm:gap-10 w-10/12 sm:w-6/12">
            <Typography variant="h2" component="h2">
                {question.questionText}
            </Typography>
            <TextField
                autoFocus
                fullWidth
                variant="outlined"
                placeholder="Respuesta"
                defaultValue={getAnswerByQuestionId(question.id)?.answer}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <SendButton />
            <PageButtons />
        </section>
    );
};
