import React from "react";
import ReaderPage from "../components/pages/readerPage/readerPage";
import ReaderProvider from "../hooks/useReader";

const Reader = () => {
    return (
        <ReaderProvider>
            <ReaderPage />
        </ReaderProvider>
    );
};

export default Reader;
