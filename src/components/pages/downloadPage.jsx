import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../common/contentContainer";
import DownloadChapterForm from "../ui/downloadChapterForm";

const DownloadPage = () => {
    return (
        <ContentContainer>
            <h1 className="text-light text-center">Загрузка главы</h1>
            <DownloadChapterForm />
            <h4 className="text-light text-center">
                Вы можете загрузить главу или{" "}
                <Link to="/download/createManga">создать новую мангу</Link> если
                такой нет на сайте!
            </h4>
        </ContentContainer>
    );
};

export default DownloadPage;
