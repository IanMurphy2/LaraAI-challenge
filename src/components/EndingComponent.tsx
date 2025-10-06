import { Typography } from "@mui/material";
import type { IEnding } from "../types";

type IProps = {
    ending: IEnding;
};

export const EndingComponent = ({ ending }: IProps) => {
    return (
        <section className="flex flex-col justify-center items-center gap-10 w-6/12">
            <Typography variant="h2" component="h2">
                {ending.title}
            </Typography>
            {ending.title}
            {ending.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </section>
    );
};
