import "@mui/material/Button";

declare module "@mui/material/Button" {
    interface ButtonPropsVariantOverrides {
        navigation: true;
        secondary: true;
        presentation: true;
    }
}
