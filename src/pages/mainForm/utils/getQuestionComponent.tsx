import { MoodQuestion, NpsQuestion, OptionsQuestion, TextQuestion } from "../../../components";
import type { IQuestion } from "../../../types";

export const getQuestionComponent = (question: IQuestion) => {
    switch (question.questionType) {
        case "text":
            return <TextQuestion question={question} />;

        case "mood":
            return <MoodQuestion question={question} />;

        case "nps":
            return <NpsQuestion question={question} />;

        case "options":
            return <OptionsQuestion question={question} />;

        default:
            return <></>;
    }
};
