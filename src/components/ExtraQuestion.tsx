import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebouncer";
import type { IQuestion } from "../types";
import { useAnswerContextProvider } from "../context";

type IProps = {
    question: IQuestion;
};

export const ExtraQuestion = ({ question }: IProps) => {
    const { handleSaveExtraAnswer, getAnswerByQuestionId } = useAnswerContextProvider();

    const [inputValue, setInputValue] = useState("");
    const debaunceValue = useDebounce<string>(inputValue, 300);

    useEffect(() => {
        if (debaunceValue.trim() === "") return;
        handleSaveExtraAnswer(question.id, debaunceValue);
    }, [debaunceValue]);

    return (
        <div className="mt-10 gap-5 flex flex-col max-w-[50rem] w-full">
            <Typography variant="h2" component="h2">
                {question.extraQuestionText}
            </Typography>
            <TextField
                autoFocus
                fullWidth
                variant="outlined"
                placeholder="Respuesta"
                defaultValue={getAnswerByQuestionId(question.id)?.extraAnswer ?? ""}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
    );
};
