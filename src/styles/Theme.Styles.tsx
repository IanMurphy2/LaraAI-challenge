import { createTheme } from "@mui/material";

const mainColor = "#5048E5";

export const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "5px",
                    backgroundColor: mainColor + "14",
                    color: "#000",
                    textTransform: "none",
                    fontSize: "24px",
                    fontWeight: 500,
                    justifyContent: "flex-center",
                    gap: "8px",
                    boxShadow: "none",
                    padding: "6px 12px",
                    "&:hover": {
                        backgroundColor: "#6b5bff54",
                        boxShadow: "none",
                    },
                },
            },
            variants: [
                {
                    props: { variant: "contained", color: "primary" },
                    style: {
                        backgroundColor: mainColor,
                        color: "#fff",
                        fontSize: "16px",
                        padding: "8px 20px",
                        "&:hover": {
                            backgroundColor: "#3f3acb",
                        },
                        "&.Mui-disabled": {
                            backgroundColor: "#E0E0E0",
                            color: "#9E9E9E",
                        },
                    },
                },
                {
                    props: { variant: "outlined", color: "primary" },
                    style: {
                        borderRadius: "5px",
                        border: "1px solid #5048E5",
                        backgroundColor: "#5048E514",
                        color: "#000",
                        textTransform: "none",
                        fontSize: "24px",
                        fontWeight: 500,
                        justifyContent: "flex-center",
                        gap: "8px",
                        width: "fit-content",
                        boxShadow: "none",
                        padding: "6px 12px",
                        "&:hover": {
                            backgroundColor: "#6b5bff54",
                            boxShadow: "none",
                        },
                    },
                },
                {
                    props: { variant: "presentation" },
                    style: {
                        borderRadius: "5px",
                        border: "1px solid #5048E5",
                        backgroundColor: "transparent",
                        textTransform: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: mainColor,
                        justifyContent: "flex-center",
                        gap: "8px",
                        boxShadow: "none",
                        padding: "8px 20px",
                        "&:hover": {
                            boxShadow: "none",
                        },
                    },
                },
            ],
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: 2,
                        borderColor: mainColor,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#3f3acb",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: mainColor,
                    },
                    height: 56,
                },
                input: {
                    padding: "0 12px",
                },
            },
        },
    },
    typography: {
        fontFamily: "Inter, Arial, sans-serif",
        h2: {
            fontSize: "32px",
            fontWeight: 400,
            lineHeight: "138%",
            letterSpacing: "0px",
        },
        body1: {
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: "138%",
            letterSpacing: "0px",
            textAlign: "center",
        },
    },
});
