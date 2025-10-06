import { Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { TextWithBreaks } from "./TextWithBreaks";
import { useOnKeyDown } from "../hooks/useOnKeyDown";

type IProps = {
    modalIsOpen: boolean;
    setModalIsOpen: (isOpen: boolean) => void;
    modalText: string;
};

export const PresentationModal = ({ modalIsOpen, setModalIsOpen, modalText }: IProps) => {
    useOnKeyDown(["Escape"], () => onKeyDownHandler());

    const onKeyDownHandler = () => {
        setModalIsOpen(false);
    };

    return (
        <AnimatePresence>
            {modalIsOpen && (
                <motion.div
                    className="z-20 fixed flex justify-center items-center w-screen h-screen curson-pointer"
                    initial={{ y: "100vh" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100vh" }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-white rounded-xl w-fit max-w-140 h-fit p-5 flex flex-col gap-6 z-30 shadow-2xl border-2 border-[#5048E5]">
                        <TextWithBreaks text={modalText} />
                        <div className="flex justify-end">
                            <Button variant="contained" color="primary" onClick={() => setModalIsOpen(false)}>
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
