import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../common/contentContainer";
import DownloadChapterForm from "../ui/forms/downloadChapterForm";
import HeadingWrapper from "../common/headingWrapper";

const DownloadPage = () => {
    return (
        <ContentContainer>
            <HeadingWrapper size={1} center={true}>
                Загрузка главы
            </HeadingWrapper>
            <DownloadChapterForm />
            <HeadingWrapper size={4} center={true}>
                Вы можете загрузить главу или{" "}
                <Link to="/download/createManga">создать новую мангу</Link> если
                такой нет на сайте!
            </HeadingWrapper>
        </ContentContainer>
    );
};

export default DownloadPage;
