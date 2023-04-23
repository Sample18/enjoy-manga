import React from "react";
import { useParams } from "react-router-dom";
import CreateMangaPage from "../components/pages/createMangaPage";
import DownloadPage from "../components/pages/downloadPage";

const Download = () => {
    const { createManga } = useParams();
    return createManga === "createManga" ? (
        <CreateMangaPage />
    ) : (
        <DownloadPage />
    );
};

export default Download;
