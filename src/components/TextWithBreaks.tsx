import { Typography } from "@mui/material";

export const TextWithBreaks = ({ text }: { text: string }) => {
    const paragraphs = text.split("#");
    return (
        <>
            {paragraphs.map((paragraph, index) => (
                <Typography key={index} variant="body1" component="p" className="!text-start !text-xl">
                    {paragraph.trim()}
                </Typography>
            ))}
        </>
    );
};
