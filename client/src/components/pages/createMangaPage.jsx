import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../common/contentContainer";
import CreateMangaForm from "../ui/forms/createMangaForm";

const CreateMangaPage = () => {
    return (
        <ContentContainer>
            <h1 className="text-light text-center">Создание манги</h1>
            <CreateMangaForm />
            <h4 className="text-light text-center">
                После создания вы можете{" "}
                <Link to="/download">загрузить главу.</Link>
            </h4>
        </ContentContainer>
    );
};

export default CreateMangaPage;
