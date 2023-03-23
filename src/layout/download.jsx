import React from "react";
import { useParams } from "react-router-dom";
import CreateMangaPage from "../components/pages/createMangaPage";
import DownloadPage from "../components/pages/downloadPage";
import NavBar from "../components/ui/navBar/navBar";

const Download = () => {
    const { createManga } = useParams();
    return (
        <>
            <NavBar />
            {createManga === "createManga" ? (
                <CreateMangaPage />
            ) : (
                <DownloadPage />
            )}
        </>
    );
};

export default Download;
