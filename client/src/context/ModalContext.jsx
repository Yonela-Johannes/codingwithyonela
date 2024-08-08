import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) =>
{
    const [openResponse, setOpenResponse] = useState(false);
    const [openComment, setOpenComment] = useState(false);
    const [openSuggestion, setOpenSuggestion] = useState(false);
    const [selectedPost, setSelectedPost] = useState(false);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false)
    const [comment, setComment] = useState("");
    const [response, setResponse] = useState("");
    const [selectedSuggestion, setSelectedSuggestion] = useState({});

    return (
        <ModalContext.Provider value={{
            openComment,
            setOpenComment,
            selectedPost,
            setSelectedPost,
            open,
            setOpen,
            comment,
            setComment,
            openDelete,
            setOpenDelete,
            openResponse,
            setOpenResponse,
            response,
            setResponse,
            openSuggestion,
            setOpenSuggestion,
            selectedSuggestion,
            setSelectedSuggestion
        }}>
            {children}
        </ModalContext.Provider>
    );
};
