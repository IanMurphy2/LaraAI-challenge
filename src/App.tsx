import "./App.css";
import { QuestionToShowContextProvider } from "./context/QuestionToShow.Context";
import MainForm from "./pages/mainForm/MainForm";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/Theme.Styles";
import { AnswerContextProvider } from "./context/Answers.Context";
import "../i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <QuestionToShowContextProvider>
                        <AnswerContextProvider>
                            <Routes>
                                <Route path="/:id" element={<MainForm />} />
                            </Routes>
                        </AnswerContextProvider>
                    </QuestionToShowContextProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
