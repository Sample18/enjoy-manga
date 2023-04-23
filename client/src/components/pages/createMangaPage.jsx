import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../common/contentContainer";
import CreateMangaForm from "../ui/forms/createMangaForm";
import HeadingWrapper from "../common/headingWrapper";

const CreateMangaPage = () => {
    return (
        <ContentContainer>
            <HeadingWrapper size={1} center={true}>
                Создание манги
            </HeadingWrapper>
            <CreateMangaForm />
            <HeadingWrapper size={4} center={true}>
                После создания и проверки администрацией вы можете{" "}
                <Link to="/download">загрузить главу.</Link>
            </HeadingWrapper>
        </ContentContainer>
    );
};

export default CreateMangaPage;
